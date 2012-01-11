var redis = require('redis'),
    client = redis.createClient(),
    _ = require('underscore')

module.exports = function stats(bot, from, to, message) {
  if(message == '!stats') {
    getStats(to, function(err, stats) {
      var stack = []
      for(user in stats)
        stack.push(user + ": " + stats[user])
      
      bot.notice(from, to + " statistics (nicknames with word count): " + stack.join(", "))
    })
  }
}

var getStats = function(channel, cb) {
  client.hgetall("stats:" + channel, cb)
}

var incrementWordCountForUser = function(channel, user, count) {
  client.hincr("stats:" + channel, user, count, null)
}