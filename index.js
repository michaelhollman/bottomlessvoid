if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/logs'));

app.get('/', function(request, response) {
  fs.readFile('index.html', encoding='utf8', function (err, data) {
    if (err) {
      response.status(500).send(err);
    } else {
      response.send(data);
    }
  });
});

app.post('/log', bodyParser.text(), function(req, res) {
  var log = '{0} {1}'.format(new Date().toISOString(), req.body.replace(/(\r\n|\n|\r)/gm,'\\n'));
  fs.appendFile('logs/log.txt', '{0}\r\n'.format(log), encoding = 'utf8', function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send();
    }
  });
});

app.delete('/log', function(req, res) {
  fs.writeFile('logs/log.txt', '', encoding = 'utf8', function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send();
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running at localhost:' + app.get('port'));
});
