var http = require('http'),
	express = require('express');

const PORT=8080;

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/static'));

app.get('/hello', function (req, res) {
	res.send('Hello World!');
});

app.listen(PORT, function() { console.log('listening'); });