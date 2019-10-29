const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const {
      Ad,
      content
    } = job.data
    await Mail.sendMail({
      from: '"Wilton Silva" <willtonnsilva@gmail.com>',
      to: Ad.author.email,
      subject: `Solicitação de compra: ${Ad.title}`,
      html: `<p>teste: ${content} </p>`
    })
    return done()
  }
}

module.exports = new PurchaseMail()
