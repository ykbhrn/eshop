/*
 * Re-creates Stripe products/prices for the existing catalogue under whatever
 * STRIPE_SECRET_KEY is supplied, and writes the new ids back onto each product.
 *
 * Needed because the stored stripePriceId values were created with a live-mode
 * key, so a test-mode key reports:
 *   No such price: 'price_...'; a similar object exists in live mode
 *
 *   MONGODB_URI="..." STRIPE_SECRET_KEY="sk_test_..." node scripts/restripe-products.js --dry-run
 *   MONGODB_URI="..." STRIPE_SECRET_KEY="sk_test_..." node scripts/restripe-products.js
 *
 * Safe to re-run: any product whose price already resolves under the current
 * key is skipped, so it only touches what is actually broken. Nothing is
 * deleted - the previous ids are kept on the document as stripeIdLegacy /
 * stripePriceIdLegacy in case you switch back to the live key.
 */

const { MongoClient } = require('mongodb')

const DRY_RUN = process.argv.includes('--dry-run')

const SHIPPING = [
  // Amounts must match the radio values in components/common/Shipping.js,
  // because payments.js matches order.shipping against the price unit_amount.
  { label: 'Classic shipping', envVar: 'STRIPE_CLASSIC_SHIPPING_PRICE_ID', amount: 399 },
  { label: 'Express shipping', envVar: 'STRIPE_EXPRESS_SHIPPING_PRICE_ID', amount: 699 }
]

async function main () {
  const uri = process.env.MONGODB_URI
  const key = process.env.STRIPE_SECRET_KEY

  if (!uri || !key) {
    console.error('Set both MONGODB_URI and STRIPE_SECRET_KEY, e.g.\n' +
      '  MONGODB_URI="mongodb+srv://..." STRIPE_SECRET_KEY="sk_test_..." node scripts/restripe-products.js --dry-run')
    process.exit(1)
  }

  console.log(`Stripe key mode: ${key.startsWith('sk_test') ? 'TEST' : 'LIVE'}${DRY_RUN ? '   (dry run - nothing will be written)' : ''}\n`)

  const stripe = require('stripe')(key)
  const client = new MongoClient(uri)
  await client.connect()
  const products = client.db().collection('products')

  const all = await products.find({}).toArray()
  console.log(`${all.length} products in the catalogue\n`)

  let ok = 0, remade = 0, failed = 0

  for (const product of all) {
    // Already usable with this key? Leave it alone.
    if (product.stripePriceId) {
      try {
        await stripe.prices.retrieve(product.stripePriceId)
        ok++
        continue
      } catch (err) {
        if (err.code !== 'resource_missing') {
          console.error(`  ! ${product.name}: ${err.message}`)
          failed++
          continue
        }
      }
    }

    // Mirror controllers/products.js productCreate, including the price units.
    const image = product.images && product.images[0] && product.images[0].images && product.images[0].images[0]

    try {
      if (DRY_RUN) {
        console.log(`  would re-create: ${product.name}  (£${(product.price / 100).toFixed(2)})`)
        remade++
        continue
      }

      const stripeProduct = await stripe.products.create(Object.assign(
        { name: product.name, type: 'good' },
        image ? { images: [image] } : {}
      ))

      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price,
        currency: 'gbp'
      })

      await products.updateOne(
        { _id: product._id },
        {
          $set: {
            stripeId: stripeProduct.id,
            stripePriceId: stripePrice.id,
            stripeIdLegacy: product.stripeId || null,
            stripePriceIdLegacy: product.stripePriceId || null
          }
        }
      )

      console.log(`  re-created: ${product.name} -> ${stripePrice.id}`)
      remade++
    } catch (err) {
      console.error(`  ! ${product.name}: ${err.message}`)
      failed++
    }
  }

  console.log(`\nalready valid: ${ok}   re-created: ${remade}   failed: ${failed}`)

  // Shipping prices are hardcoded in controllers/payments.js rather than stored
  // per-product, so they need re-creating too.
  console.log('\nShipping prices:')
  for (const option of SHIPPING) {
    if (DRY_RUN) {
      console.log(`  would create: ${option.label} (£${(option.amount / 100).toFixed(2)})`)
      continue
    }
    try {
      const shippingProduct = await stripe.products.create({ name: option.label, type: 'good' })
      const shippingPrice = await stripe.prices.create({
        product: shippingProduct.id,
        unit_amount: option.amount,
        currency: 'gbp'
      })
      console.log(`  ${option.envVar}=${shippingPrice.id}`)
    } catch (err) {
      console.error(`  ! ${option.label}: ${err.message}`)
    }
  }

  console.log('\nSet the two shipping values above as environment variables on Render, then redeploy.')

  await client.close()
}

main().catch(err => { console.error(err); process.exit(1) })
