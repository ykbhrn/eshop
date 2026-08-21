const Discount = require("../models/popupDiscount");
const User = require("../models/user");
const cron = require("node-cron");
const calculate = require("./shoppingBasket");

async function createDiscount(req, res) {
  try {
    const now = new Date();
    const randomNumber = Math.floor(Math.random() * 60);
    if (req.currentUser.name !== "admin") throw new Error("Not Found");
    const createdDiscount = await Discount.create({ time: randomNumber });
    res.status(201).json(createdDiscount);
  } catch (err) {
    res.status(422).json(err);
  }
}

cron.schedule("* * * * *", async function () {
  try {
    const discounts = await Discount.find();
    discounts[0].time = new Date().getMinutes();
    await discounts[0].save();
  } catch (err) {
    console.log("Discount cron error", err);
  }
});

async function allDiscounts(req, res) {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (err) {
    res.status(422).json(err);
  }
}

async function changeUserDiscount(req, res) {
  try {
    const user = req.currentUser;
    if (user.discount < req.body.discount) {
      user.discount = req.body.discount;
    }
    if (req.body.discount >= 25) {
      user.discount = 25;
    }
    await user.save();
    await calculate.calculatePrice(user);
    res.status(202).json(user);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  createDiscount,
  allDiscounts,
  changeUserDiscount,
};
