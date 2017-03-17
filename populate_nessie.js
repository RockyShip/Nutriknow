var mysql = require('mysql')
var request = require('request')
var http = require('http')
var nessie = require('nessie-nodejs-sdk')

const key = "dff27692d4dcb2d56f13b05907e947a3"
nessie.setApiKey = key

var connection = mysql.createConnection({
	host:'localhost',
	user:'doc',
	database:'nutrition'
})

connection.connect()
var size = 8789
/*
var post = {
  "objectCreated" : {
    "_id": "58a837a01756fc834d904aa6",
    "type": "merchant",
    "merchant_id": "58a842391756fc834d904aa8",
    "purchase_date": "2017-01-17",
    "amount": 0.01,
    "status": "pending",
    "medium": "balance",
    "description": "Fish, tilapia, raw"
 }
}
posts = []
for(var i=0;i<50;i++){
	var random = Math.round(Math.random() * (8789) + 1);
	var query = "select name from nutrition where id =" + random;

	var date = "2017-"
	var month = Math.round(Math.random()*(2-1)+1)
	var day = Math.round(Math.random()*(28-1)+1)
	date += month + "-" + day
	
	post.objectCreated.purchase_date = date
	//console.log(query)
	connection.query(query, function(err, results, fields){
		//console.log(results[0].name)
		post.objectCreated.description = results[0].name
		console.log(results[0].name)	
		console.log(nessie.purchase)
		//posts.push(post)
		//request.post("http://api.reimaginebanking.com/accounts/58a837a01756fc834d904aa6/purchases?key=" + key, post, function(err, res, body){		
		//	console.log(post)
		//	console.log(body)
		//})
	})
}

/*var post_options = {
	host:'http://api.reimaginebanking.com',
	path:'/accounts/58a837a01756fc834d904aa6/purchases?key=' + key,
	method : 'POST',
	headers : {
		'Content-Type': 'application/json'
	}
}

var post_req = http.request(post_options, function(res){
	res.setEncoding('utf8')
	res.on('data', function(chunk){
		console.log(chunk)
	})
})


post_req.write(JSON.stringify(posts[0]))
post_req.end()
/*request.post("http://api.reimaginebanking.com/accounts/58a837a01756fc834d904aa6/purchases?key=" + key, posts[0] , function(err, res, body){		
	console.log(posts[0])
	console.log(body)
})*/
