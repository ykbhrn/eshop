const UsedItem = require('../models/usedItem')

async function allUsedItems(req, res) {
  try {
    const products = await UsedItem.find()
    res.status(200).json(products)
  } catch (err) {
    res.json(err)
  }
}

async function usedItemCreate(req, res) {
  try {
    req.body.user = req.currentUser
    req.body.userStuff = req.currentUser._id

    const createUsedItem = await UsedItem.create(req.body)

    res.status(201).json(createUsedItem)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function usedItemShow(req, res) {
  const usedItemId = req.params.id 
  try {
    const usedItem = await UsedItem.findById(usedItemId)
    if (!usedItem) throw new Error('notFound')
    res.status(200).json(usedItem)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function usedItemShowToUpdate(req, res) {
  const usedItemId = req.params.id 
  try {
    const usedItem = await UsedItem.findById(usedItemId)
    if (usedItem.user._id.toString() !== req.currentUser._id.toString()) throw new Error('Not Authorized')
    if (!usedItem) throw new Error('notFound')
    res.status(200).json(usedItem)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function usedItemUpdate(req, res) {
  const usedItemId = req.params.id
  try {
    const usedItem = await UsedItem.findByIdAndUpdate(usedItemId)
    if (!usedItem) throw new Error('Not Found')
    if (usedItem.user._id.toString() !== req.currentUser._id.toString()) throw new Error('Not Authorized')
    Object.assign(usedItem, req.body)
    await usedItem.save()
    res.status(202).json(usedItem)
  } catch (err) {
    res.status(422).json(err)
  }
}

async function usedItemDelete(req, res) {
  const usedItemId = req.params.id
  try {
    const usedItemToDelete = await UsedItem.findById(usedItemId)
    if (!usedItemToDelete) throw new Error('Not Found')
    if (!usedItemToDelete.user._id.equals(req.currentUser._id)) throw new Error('Not Found')
    await usedItemToDelete.remove()
    res.sendStatus(204)
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = {
  allUsedItems,
  usedItemCreate,
  usedItemShow,
  usedItemUpdate,
  usedItemShowToUpdate,
  usedItemDelete
}