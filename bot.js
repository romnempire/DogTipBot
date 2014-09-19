var config = {
	channels: ["##uncla"],
	server: "irc.freenode.net",
	botName: "DogTipBot"
};

var options = {
	host: 'hatch02.cs.unc.edu';
	path: '/hatch/run.php?v=';
}

var irc = require('irc');
var http = require('http');

var bot = new irc.Client(config.server, config.botName, {channels: config.channels });

callback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    bot.say(str);
  });
}

bot.addListener("message", function(from,to,text,msg) {
	if (text.indexOf("pls") > -1) {
		bot.say(config.channels[0], "Congrats you get +1 dog.  Calling the ASPCA now!");
	}

	if (text.indexOf("topic") > -1) {
		bot.say(config.channels[0], "The _real_ topic is Dogecoin");
	}

	if (text.indexOf("playaudio: " > -1)) {
		bot.say(config.channels[0], "Playing Audio");
		options.path = '/hatch/run.php?v=' + text.substring(11);
		http.request(options, callback).end();
	}

	if (text.indexOf("killaudio" > -1)) {
		options.path = '/hatch/kill.php';
		http.request(options, callback).end();
	}
});


