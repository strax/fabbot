var irc = require('irc'),
    redis = require('redis'),
    util = require('util'),
    db = redis.createClient()

var config = JSON.parse(require('fs').readFileSync('./config.json'))

var bot = new irc.Client(config.host, config.nick, {
  port: config.port,
  debug: true,
  channels: config.channels,
  realName: 'Fabbot',
  userName: 'fabbot'
})

bot.on('error', function(message) {
  console.error('ERROR: %s: %s', message.command, message.args.join(', '));
})

bot.on('message', function(from, to, message) {
  if(/^\!counts/i.test(message)) {
    db.hgetall("stats:" + to, function(err, stats) { 
      var counts = []
      for(user in stats) counts.push(user + ": " + stats[user])
           
      bot.notice(from, to + " word counts: " + counts.join(", "))
    })
  } else {
    var count = message.split(' ').length || 1
    
    db.hincrby("stats:" + to, from, count, redis.print);
  }
})