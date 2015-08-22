var http = require('http'),
	lessMiddleware = require('less-middleware'),
	express = require('express'),
	bodyParser = require('body-parser'),
	childProcess = require('child_process');

const PORT = 8080;

var app = express();

var VALID_VOLUME_COMMANDS = ['vol-up', 'vol-down', 'vol-mute'];
var VALID_SPOTIFY_COMMANDS = ['music-play', 'music-pause', 'music-skip'];

// For HTML and Front-End
app.use('/', express.static(__dirname + '/static'));

// For Receiving Commands via AJAX
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/action', urlencodedParser, function (req, res) {

	if (!req.body) { res.sendStatus(400); }

	var type = req.body.type;
	var command = req.body.command;

	if (!type) { res.sendStatus(400); }
	if (!command) { res.sendStatus(400); }

	if (type == "action") {
		if (VALID_VOLUME_COMMANDS.indexOf(command) !== -1) {
			systemVolumeAdjust(command);
		} else if (VALID_SPOTIFY_COMMANDS.indexOf(command) !== -1) {
			spotifyAdjust(command);
		} else {
			res.sendStatus(400);
		}
	} else if (type == "preset") {
		if (Object.keys(PRESETS).indexOf(command) !== -1) {
			doPreset(command);
		} else {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}

	res.sendStatus(200);
});

var systemVolumeAdjust = function(cmd) {
	switch(cmd) {
		case 'vol-up':
			childProcess.exec("pactl set-sink-volume 0 +10%");
			break;
		case 'vol-down':
			childProcess.exec("pactl set-sink-volume 0 -- -10%");
			break;
		case 'vol-mute':
			childProcess.exec("pactl set-sink-mute 0 toggle");
			break;
	}
}

var spotifyAdjust = function(cmd) {
	switch(cmd) {
		case 'music-play':
			childProcess.exec("dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.PlayPause");
			break;
		case 'music-pause':
			childProcess.exec("dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Pause");
			break;
		case 'music-skip':
			childProcess.exec("dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Next");
			break;
	}
}

var doPreset = function(cmd) {

}

app.listen(PORT, function() { console.log('listening'); });