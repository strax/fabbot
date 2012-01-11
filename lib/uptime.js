var moment = require('moment'),
    t0 = moment()

module.exports = function uptime(bot, from, to, message) {
  if(message == '!uptime') {
    bot.notice(from, "Uptime is " + t0.fromNow(true))
  }
}