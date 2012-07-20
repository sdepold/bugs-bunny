var fs            = require('fs')
  , config        = JSON.parse(process.env.CONFIG || fs.readFileSync(__dirname + '/../config/config.json').toString())
  , moment        = require('moment')
  , nodemailer    = require('nodemailer')
  , smtpTransport = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: config.gmail
    })
  , _       = require('lodash')

var Helpers = module.exports = {
  getMailAddresses: function() {
    return config.mails || {}
  },

  getNotificationAddresses: function() {
    return config.notifications || {}
  },

  getCurrentMailData: function() {
    var dayOfTheYear     = parseInt(moment().format('DDD'))
      , addresses        = _.keys(this.getMailAddresses())
      , names            = _.values(this.getMailAddresses())
      , currentMailIndex = dayOfTheYear % addresses.length

      return {
        name:    names[currentMailIndex],
        address: addresses[currentMailIndex]
      }
  },

  getBugsBunnyMailAddress: function() {
    return getCurrentMailData().address
  },

  getBugsBunnyName: function() {
    return getCurrentMailData().name
  },

  getTimeDiff: function(time) {
    var momentTime = moment.isMoment(time) ? time : moment(time)
    return momentTime.valueOf() - moment().valueOf()
  },

  getSendTime: function() {
    var time = moment().hours(7).minutes(0).seconds(0)

    if(this.getTimeDiff(time) < 0) {
      return time.add('days', 1)
    } else {
      return time
    }
  },

  sendMail: function(address, subject, message) {
    var mailOptions = {
      from:     "sascha@dawanda.com",
      to:       address,
      subject:  subject,
      text:     message
    }

    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
      } else {
        console.log("Message sent: " + address);
      }
    })
  },

  sendMails: function() {
    var bugsBunny = this.getCurrentMailData()
      , self      = this

      var sendMailTo = function(username, address) {
        var subject = null
          , message = null

        if(bugsBunny.address === address) {
          message = [
            "Hi " + username + ",",
            "you are today's Bugs Bunny!",
            "Happy bug hunting."
          ].join("\n\n")

          subject = "You have to fix bugs today!"
        } else {
          message = [
            "Hi " + username + ",",
            "today's Bugs Bunny is '" + bugsBunny.name + "'.",
            "Have a nice day!"
          ].join("\n\n")

          subject = "Bugs Bunny: " + bugsBunny.name
        }

        self.sendMail(address, subject, message)
      }

    _.forEach(this.getMailAddresses(), sendMailTo)
    _.forEach(this.getNotificationAddresses(), sendMailTo)
  },

  isItWeekend: function() {
    var weekendDays = [6, 0]
      , currentDay  = moment().day()

    return (weekendDays.indexOf(currentDay) > -1)
  }
}
