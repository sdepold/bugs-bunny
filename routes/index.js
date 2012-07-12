var helpers = require(__dirname + '/../lib/helpers')

exports.index = function(req, res) {
  res.render('index', {
    title:            'Express',
    mailAddresses:    helpers.getMailAddresses(),
    currentBugsBunny: helpers.getCurrentMailData()
  })
}
