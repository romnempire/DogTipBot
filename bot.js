var config = {
	channels: ["##uncla"],
	server: "irc.freenode.net",
	botName: "DogTipBot"
};

var irc = require('irc');

var bot = new irc.Client(config.server, config.botName, {channels: config.channels });

bot.addListener("message", function(from,to,text,msg) {
	if (text.indexOf("pls") > -1) {
		bot.say(config.channels[0], "Congrats you get +1 dog.  Calling the ASPCA now!");
	}
});


