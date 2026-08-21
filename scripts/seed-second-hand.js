/*
 * Seeds the Second Hand Market with demo users and listings.
 *
 *   MONGODB_URI="<your connection string>" node scripts/seed-second-hand.js
 *   MONGODB_URI="<your connection string>" node scripts/seed-second-hand.js --undo
 *
 * Every document written carries `_demoSeed: SEED_TAG`, which the app ignores
 * (it is not in the mongoose schema) but --undo uses to remove exactly what
 * this script created. Nothing else is ever touched.
 */

const { MongoClient, ObjectId } = require('mongodb')

const SEED_TAG = 'second-hand-demo-v1'
const DEMO_PASSWORD = 'NuHippiesDemo1'

// bcrypt is a native module; bcryptjs is the pure-JS fallback for machines
// where the native build does not match the CPU architecture.
let hashSync
try {
  const bcrypt = require('bcrypt')
  hashSync = pw => bcrypt.hashSync(pw, bcrypt.genSaltSync(8))
} catch (e) {
  try {
    const bcryptjs = require('bcryptjs')
    hashSync = pw => bcryptjs.hashSync(pw, bcryptjs.genSaltSync(8))
  } catch (e2) {
    console.error('Need bcrypt or bcryptjs. Run:  npm i bcryptjs   (or: npm rebuild bcrypt)')
    process.exit(1)
  }
}

const img = id => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

const USERS = [
  { name: 'willowbarnes',  email: 'willow.barnes@example.com',  bio: 'Slow fashion since 2011. Everything washed and ready to wear.', place: 'Camden Town, London, England, United Kingdom',   coords: [-0.1426, 51.5390] },
  { name: 'omarhaddad',    email: 'omar.haddad@example.com',    bio: 'Clearing out the wardrobe. Happy to post or meet in person.',  place: 'Shoreditch, London, England, United Kingdom',    coords: [-0.0778, 51.5262] },
  { name: 'ceridwenprice', email: 'ceridwen.price@example.com', bio: 'Vintage hunter. Ask me for extra photos, always happy to send.', place: 'Brixton, London, England, United Kingdom',      coords: [-0.1145, 51.4613] },
  { name: 'tomaszwilk',    email: 'tomasz.wilk@example.com',    bio: 'Outdoor gear mostly. Used but looked after.',                  place: 'Walthamstow, London, England, United Kingdom',  coords: [-0.0203, 51.5860] },
  { name: 'nadiaokonkwo',  email: 'nadia.okonkwo@example.com',  bio: 'Reworking and reselling. No fast fashion here.',               place: 'Peckham, London, England, United Kingdom',      coords: [-0.0694, 51.4739] },
  { name: 'esmefontaine',  email: 'esme.fontaine@example.com',  bio: 'Small wardrobe, good pieces. Everything honestly described.',  place: 'Notting Hill, London, England, United Kingdom', coords: [-0.2050, 51.5090] }
]

const ITEMS = [
  { owner: 0, title: 'Vintage Levi’s denim jacket', category: 'Jackets', gender: 'uni', size: 'M', price: 38,
    description: 'Proper 80s Levi’s trucker jacket, boxy fit through the shoulders. The indigo has faded exactly the way you want it to — lighter at the seams and cuffs. All buttons original, no rips, one small repair inside the left pocket that you cannot see when worn.',
    images: ['1611312449408-fcece27cdbb7', '1537465978529-d23b17165b3b', '1543076447-215ad9ba6923'] },
  { owner: 0, title: 'Cream cable knit jumper', category: 'Sweaters', gender: 'women', size: 'S', price: 16,
    description: 'Heavy cable knit in an off-white cream, lambswool blend. Warm enough for a proper winter. Worn one season, no bobbling, no stretch at the cuffs. Slightly cropped so it sits well over high-waisted jeans.',
    images: ['1574201635302-388dd92a4c3f', '1601379327928-bedfaf9da2d0', '1615310748170-29d7088865ad'] },

  { owner: 1, title: 'Tan leather Chelsea boots', category: 'Shoes', gender: 'men', size: '43', price: 45,
    description: 'Real leather Chelsea boots in a warm tan. Resoled last year so there is plenty of life left. Elastic panels still tight, no splitting. Small scuff on the right toe, shown in the last photo, which polishes out most of the way.',
    images: ['1605733160314-4fc7dac4bb16', '1608256246200-53e635b5b65f', '1550998358-08b4f83dc345'] },
  { owner: 1, title: 'Faded black band t-shirt', category: 'T-Shirts', gender: 'uni', size: 'L', price: 12,
    description: 'Soft cotton tee that has faded to a proper washed-out charcoal rather than a flat black. Print is cracked in places which is exactly the look. No holes, no stains, hems all intact.',
    images: ['1615420733091-6b320329987b', '1619161519929-befcb28d6384', '1570641303692-9616321d4629'] },

  { owner: 2, title: 'Floral tea dress', category: 'Dresses', gender: 'women', size: '10', price: 24,
    description: 'Proper 70s tea dress, small ditsy floral on a dusty blue ground. Buttons down the front, ties at the waist. Lined skirt so it is not see-through. One spare button sewn inside the hem.',
    images: ['1496747611176-843222e1e57c', '1542295669297-4d352b042bca', '1532675432006-329c6fed7045'] },
  { owner: 2, title: 'Corduroy overshirt, rust', category: 'Shirts', gender: 'uni', size: 'M', price: 28,
    description: 'Fine-wale corduroy in a deep rust orange. Cut as an overshirt so it works over a jumper as a light jacket. Chest pockets both intact, no fraying at the collar. Bought new, worn maybe ten times.',
    images: ['1678049349271-d916dd1b0a33', '1585188968708-540006b4cd51', '1572797988761-19ef379d5091'] },

  { owner: 3, title: 'Waxed walking boots', category: 'Shoes', gender: 'men', size: '44', price: 55,
    description: 'Waxed leather walking boots, done maybe 200 miles of footpaths and still completely watertight. Vibram soles with plenty of tread left. Laces replaced recently. Honest wear on the toe box, otherwise solid.',
    images: ['1605812860427-4024433a70fd', '1605732440685-d0654d81aa30', '1511283402428-355853756676'] },
  { owner: 3, title: 'Wool fisherman jumper', category: 'Sweaters', gender: 'men', size: 'L', price: 32,
    description: 'Chunky undyed wool in a traditional fisherman pattern. Genuinely windproof. It has softened a lot with washing so it is no longer scratchy. No moth holes, kept in a cedar box.',
    images: ['1580331451062-99ff652288d7', '1600369672890-ac00f1907858', '1602706294170-1fed8eecd9f9'] },

  { owner: 4, title: 'Reworked patchwork hoodie', category: 'Hoodies', gender: 'uni', size: 'M', price: 42,
    description: 'One of mine — built from three old sweatshirts into a patchwork panel design, so there is not another one like it. All seams overlocked properly on a machine, not glued. Washes fine at 30.',
    images: ['1615420733289-d8d75ca63946', '1717201395289-03e4700ca8b6', '1611911813383-67769b37a149'] },
  { owner: 4, title: 'High-waisted mom jeans', category: 'Pants', gender: 'women', size: '27', price: 20,
    description: 'Rigid non-stretch denim, sits right on the waist, tapers just above the ankle. Mid-blue wash with light whiskering at the hips. Hemmed by hand so the original selvedge edge is kept.',
    images: ['1495105787522-5334e3ffa0ef', '1555583743-991174c11425', '1527016021513-b09758b777bd'] },

  { owner: 5, title: 'Linen summer dress, sage', category: 'Dresses', gender: 'women', size: '12', price: 30,
    description: 'Pure linen in a soft sage green, cut long with deep side pockets. Creases the way good linen should. Worn for one holiday and washed twice. No marks anywhere.',
    images: ['1613966570650-add3cf83aa83', '1496217590455-aa63a8350eea', '1609695813802-3c443be34359'] },
  { owner: 5, title: 'Cropped denim jacket, bleached', category: 'Jackets', gender: 'women', size: 'S', price: 26,
    description: 'Cropped and bleached to a pale, almost dusty blue. Sits right at the waist. Cuffs turned back once as shown. No stretch in the collar, hardware all clean and working.',
    images: ['1608147152875-b0eb0c53d491', '1614693348454-1e0710d21c60', '1602303894456-398ce544d90b'] }
]

async function main () {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('Set MONGODB_URI first, e.g.\n  MONGODB_URI="mongodb+srv://..." node scripts/seed-second-hand.js')
    process.exit(1)
  }
  const undo = process.argv.includes('--undo')

  const client = new MongoClient(uri)
  await client.connect()

  // The connection string may omit the database name; the driver would then
  // fall back to "test", which is not where this project's data lives.
  const impliedDb = client.db().databaseName
  const dbName = process.env.MONGODB_DB || (impliedDb && impliedDb !== 'test' ? impliedDb : 'myFirstDatabase')
  const db = client.db(dbName)
  const users = db.collection('users')
  const items = db.collection('useditems')

  if (undo) {
    const i = await items.deleteMany({ _demoSeed: SEED_TAG })
    const u = await users.deleteMany({ _demoSeed: SEED_TAG })
    console.log(`Removed ${i.deletedCount} seeded listings and ${u.deletedCount} seeded users.`)
    await client.close()
    return
  }

  const already = await users.countDocuments({ _demoSeed: SEED_TAG })
  if (already > 0) {
    console.log(`Already seeded (${already} demo users present). Run with --undo first to reseed.`)
    await client.close()
    return
  }

  const password = hashSync(DEMO_PASSWORD)
  const now = new Date()

  const userDocs = USERS.map(u => ({
    _id: new ObjectId(),
    name: u.name,
    email: u.email,
    password,
    bio: u.bio,
    profileImage: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
    basket: [],
    sumPrice: 0,
    discount: 0,
    discountAmount: 0,
    totalPrice: 0,
    notifications: [],
    userChats: [],
    newNotification: false,
    userType: 2,
    resetToken: { data: '' },
    stripeId: 'cus_demo_' + Math.random().toString(36).slice(2, 12),
    preferenceCoordinates: u.coords,
    preferencePlaceName: u.place,
    preferenceDistance: 25,
    __v: 0,
    _demoSeed: SEED_TAG
  }))
  await users.insertMany(userDocs)

  const itemDocs = ITEMS.map((it, n) => {
    const owner = userDocs[it.owner]
    const meta = USERS[it.owner]
    // Snapshot of the owner, matching what the app embeds - minus the password.
    const { password: _pw, _demoSeed: _t, ...snapshot } = owner
    const created = new Date(now.getTime() - (ITEMS.length - n) * 36e5)
    return {
      _id: new ObjectId(),
      title: it.title,
      images: it.images.map(img),
      description: it.description,
      price: it.price,
      category: it.category,
      size: it.size,
      gender: it.gender,
      coordinates: meta.coords,
      placeName: meta.place,
      email: meta.email,
      tags: [],
      user: snapshot,
      userStuff: owner._id,
      comments: [],
      createdAt: created,
      updatedAt: created,
      __v: 0,
      _demoSeed: SEED_TAG
    }
  })
  await items.insertMany(itemDocs)

  console.log(`Seeded ${userDocs.length} demo users and ${itemDocs.length} listings.`)
  console.log(`Demo account password: ${DEMO_PASSWORD}`)
  console.log('Undo any time with:  node scripts/seed-second-hand.js --undo')
  await client.close()
}

main().catch(err => { console.error(err); process.exit(1) })
