const Ad = require('../models/Ad')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const {
      ad,
      content
    } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')

    Queue.create(PurchaseMail.key, {
      Ad: purchaseAd,
      content
    }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()
