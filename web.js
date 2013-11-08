var express = require("express");
var app = express();

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/telezoner';

app.configure(function(){
  app.use(express.bodyParser());
});

app.use(express.logger());

app.use("/", express.static("content"));

app.post('/api/locations', function(request, response) {
	console.log(request.body);
	MongoClient.connect(mongoUri, function(err, db) {
		db.collection("locations").save(request.body, function(err, result) {
			if(err) {
				response.send(err.toString());
			} else {
				response.send(result);
			}
			db.close();
		});
	});
});

app.get('/api/locations', function(request, response) {
	MongoClient.connect(mongoUri, function(err, db) {
		db.collection("locations").find({}, function(err, cursor) {
			cursor.toArray(function(err, items) {
		        if(err) {
					response.send(err.toString());
				} else {
					response.setHeader("Content-Type", "application/json");
					response.end(JSON.stringify(items));
				}
				db.close();
			});
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});