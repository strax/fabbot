var irc = require('irc')

var config = JSON.parse(require('fs').readFileSync('./config.json'))

var users = { }

var bot = new irc.Client(config.host, config.nick, {
  port: config.port,
  debug: true,
  channels: config.channels
})

bot.on('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(', '));
})

bot.on('message#vana', function(from, message) {
  if(/^\!counts/.test(message)) {
    var counts = []
    for(i in users)
      counts.push(i + ": " + users[i])
    
    bot.say("#vana", "Counts: " + counts.join(", "))
  } else {
    var count = message.split(' ').length || 1
    if(!users[from]) users[from] = 0
    users[from] += count
    console.log("%s: %d", from, users[from])
  }
})