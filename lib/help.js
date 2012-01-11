module.exports = function help(bot, from, to, message) {
  if(message == "!help") {
    var names = bot.plugins.map(function(plugin) {
      return plugin.name
    }).filter(function(name) {
      return name != ''
    }).map(function(name) {
      return "!" + name
    })
    
    bot.notice(from, "Available commands: " + names.join(", "))
  }
}