var helpers = require(__dirname + '/../lib/helpers')

exports.index = function(req, res) {
  res.render('index', {
    title:            'Bugs Bunny',
    mailAddresses:    helpers.getMailAddresses(),
    notifications:    helpers.getNotificationAddresses(),
    currentBugsBunny: helpers.getCurrentMailData()
  })
}
