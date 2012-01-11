var irc = require('irc'),
    stats = require('./lib/stats')

var config = JSON.parse(require('fs').readFileSync('./config.json'))

var bot = new irc.Client(config.host, config.nick, {
  port: config.port,
  debug: false,
  channels: config.channels,
  realName: 'Fabbot',
  userName: 'fabbot'
})

bot.on('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(', '))
})

bot.plugins = [
  require('./lib/stats'),
  require('./lib/uptime'),
  require('./lib/help')
]

bot.on('message', function(from, to, message) {
  if(message.charAt(0) == '!') {
    bot.plugins.forEach(function(plugin) {
      plugin(bot, from, to, message)
    })
  }
})

console.log("> Fabbot started")