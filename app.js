var express = require('express')
  , routes  = require('./routes')
  , helpers = require('./lib/helpers')

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

setTimeout(function() {
  var sendMails = function() {
    if(!helpers.isItWeekend()) {
      helpers.sendMails()
    }
  }

  setInterval(sendMails, 1000 * 60 * 60 * 24)
  sendMails()
}, helpers.getTimeDiff(helpers.getSendTime()))

