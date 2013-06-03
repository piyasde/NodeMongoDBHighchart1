var application_root = __dirname,
    express = require("express"),
	path = require("path");
	var databaseUrl = "faodb"; // "username:password@example.com/mydb"
var collections = ["seeds"]
var db = require("mongojs").connect(databaseUrl, collections);

var app = express();



// Config

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


app.get('/api', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Ecomm API is running');
});


app.get('/getseeddata/:seedname', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    seed = req.params.seedname;
	db.seeds.find({seedname:seed}, function(err, seeds) {
	if( err || !seeds) console.log("No seeds found");
	  else 
	{
		res.writeHead(200, {'Content-Type': 'text/json'});
		seedscollection = seeds[0].seedprice;
		str = '[';
		//console.log(seedscollection);
		
		seedscollection.forEach( function(seed) {
		   str = str + '{"month":"'+ seed.mmonth + '","price":"'+ seed.price +'"},';
		});
		str = str.substring(0,str.length-1)
		str = str + ']';
		res.end(JSON.stringify(str));
	}
  });
});



app.listen(1212);