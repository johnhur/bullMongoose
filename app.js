var express = require("express"),
		app = express(),
		methodOverride = require('method-override'),
		bodyParser = require("body-parser"),
		morgan = require("morgan")
		
		db = require("./models")

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(morgan('tiny'));

// requiring all node_modules. 
// use all node_modules
// assign (view engine ejs)
//***** MUSICIAN ROUTES ******

//ROOT ROUTE INDEX
app.get("/", function(req, res){
		res.redirect("musicians");
});

app.get("/musicians",function(req, res){
	db.Musician.find({}, function(err, musicians){
		res.render("musicians/index", {musicians:musicians});
	})
});

// //NEW
app.get("/musicians/new", function(req, res){
	res.render("musicians/new");
});

//CREATE
app.post("/musicians", function(req, res){
	var musician = new db.Musician(req.body.musician)
	musician.save(function(err){
		if(err) throw err;
		res.redirect('/musicians')
	});
});

//SHOW
app.get("/musicians/:id", function(req, res){
	db.Musician.findById(req.params.id, function(err, musician){
		res.render("musicians/show", {musician:musician});
	})
});
// })

//EDIT
app.get("/musician/:id/edit", function(req,res){
	db.Musician.findById(req.params.id, function(err, musician){
		res.render("musicians/edit", {musician:musician})
	})
	
})
//UPDATE
app.put('/musicians/:id', function(req,res){
  db.Musician.findByIdAndUpdate(req.params.id, req.body.musician, function(err,musician){
    if(err){
    res.render("404");
  }else{
    res.redirect('/musicians');
  }
 })
});
// app.put("/musician/:id", function(req,res){
// 	db.Musician.findByIdAndUpdate(req.params.id, function(err, musician){
// 		//loop over all keys in the object
// 		for(var prop in req.body.musician){
// 			musician.prop = req.body.musician[prop];
// 		}
// 		res.redirect("/musicians")
// 	})
// })
//DESTROY
app.delete('/musicians/:id', function(req,res){
	db.Musician.findByIdAndRemove(req.params.id, function(err, book){
		  if (err) throw err;
      res.redirect('/');
	})
})


app.listen(4000, function (){
	"Server is listening on port 4000"
});