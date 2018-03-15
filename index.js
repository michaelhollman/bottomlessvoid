if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

var fs = require('fs');
var rl = require('readline-specific');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/logs'));
app.use(bodyParser.text({ type: 'text/*', limit: '20mb' }));
app.use(bodyParser.json({ strict: false, type: '*/json', limit: '20mb' }));

app.get('/', function(request, response) {
  fs.readFile('index.html', encoding='utf8', function (err, data) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.send(data);
    }
  });
});

app.post('/log', function(req, res) {

  var timestamp = new Date().toISOString();
  var logbody =  JSON.stringify(req.body).replace(/(\r\n|\n|\r)/gm,'\\n');

  var textlog = '{0} {1}'.format(timestamp, logbody);
  fs.appendFile('logs/log.txt', '{0}\r\n'.format(textlog), encoding = 'utf8');

  fs.readFile('logs/log.json', encoding = 'utf8', function(err, data) {
    if (!data) data = "{}";
    json = JSON.parse(data);
    json[timestamp] = JSON.parse(logbody);
    jsonStr = JSON.stringify(json);
    fs.writeFile('logs/log.json', jsonStr, encoding = 'utf8');
  });

  res.status(201).send();
});

app.post('/line', function(req, res){
	//This function will return a specific line from the log file.
	//Data should be sent in a JSON array.
	
	var line = 1;
	
	try{
		line = JSON.parse(req.body)[0];
	} catch(e) {
		res.status(500).send();
		return;
	}
	
	rl.oneline('logs/log.txt', line, function(err, response){
	    res.send(response);
		res.status(200).send();
	});
});

app.delete('/log', function(req, res) {
  fs.writeFile('logs/log.txt', '', encoding = 'utf8');
  fs.writeFile('logs/log.json', '', encoding = 'utf8');
  res.status(200).send();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
