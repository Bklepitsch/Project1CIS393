var express = require('express');

var app = express();
app.set("view engine", "ejs");//template engine

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));//parses URL-encoded data 

var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'gameCompletion' 
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Data Base is Connected!");
});

app.get("/", function(req, res){
    res.render("index");
});

app.post("/register", function(req, res) {
    let user_name = req.body.name;
    let user_game = req.body.videogame;
    var user_rating = req.body.rating;
    var user_completion = req.body.completion;
    let user_review = req.body.review;
    var user_info = { Name: user_name, Game: user_game, Rating: user_rating, Completion: user_completion, Review: user_review }; //std info 
    var q = "insert into User set ?";
    con.query(q, user_info, function(error, results) {
    if (error) throw error;
    res.redirect("/insert"); //redirect to root page 
    });
});

app.get("/insert", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM User';
    con.query(q, function (error, results) {
    if (error) throw error;
    res.render("addreview",{count: results[0].count});
    });//query 
});//get

app.get("/display", function(req, res) {
    var q = "select * From user";
    con.query(q, function(error, results) {
    if (error) throw error;
    res.render("displayall", { data: results });
    });
});

app.post("/updatereview", function(req, res) {
    var review_id = req.body.review_id;
    var user_rating = req.body.rating;
    var user_completion = req.body.completion;
    let user_review = req.body.review;
    var q = "update user set rating = " + user_rating + ", completion = " + user_completion + ", review = \"" + user_review + "\" where ID = " + review_id;
    con.query(q, function(error, results) {
    if (error) throw error;
    res.redirect("/update"); //redirect to root page 
    });
}); 

app.get("/update", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM User';
    con.query(q, function (error, results) {
    if (error) throw error;
    res.render("updatereview",{count: results[0].count});
    }); 
});

app.post("/findreview", function(req, res) {
    var review_id = req.body.review_id;
    var q = "select * from user where ID = ?";
    con.query(q, [parseInt(review_id)], function(err, results, fields) {
        if (err) throw err;
        else {
        if (results.length == 0) //search failed
            res.render("nofound");
        else {
            results.forEach(function(user) {
            res.render("foundreview", { data: results });
                });
            }
        }
    });
}); 

app.get("/search", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM User';
    con.query(q, function (error, results) {
    if (error) throw error;
    res.render("findreview",{count: results[0].count});
    }); 
});

app.post("/deletereview", function(req, res) {
    var review_id = req.body.review_id;
    var q = "delete from user where ID = " + review_id;
    con.query(q, function(error, results) {
    if (error) throw error;
    res.redirect("/delete"); //redirect to root page 
    });
}); 

app.get("/delete", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM User';
    con.query(q, function (error, results) {
    if (error) throw error;
    res.render("deletereview",{count: results[0].count});
    }); 
});


app.listen(8080, function () {
    console.log('App listening on port 8080!');
});