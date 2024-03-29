//this is to run sesisons
MongoClient = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const { devNull } = require('os');
const { GridFSBucket } = require('mongodb');
const { redirect } = require('express/lib/response');
const url = 'mongodb://localhost:27017/';
const databasename = 'firstdb';
const session = require('express-session');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db('firstdb');
    // var query={username:"160120733050"};
    // dbo.collection("login").find(query).toArray(function(err,result){
    //     if (err) throw err;
    //     console.log(result);
    //     console.log(result[0].username);
    //     console.log(result[0].password);
    //     db.close;
    // });
    // to create a collection
    // dbo.createCollection("login",function(err,res){
    //     if(err)throw err;
    //     console.log('collection created');
    //     db.close();
    // });
    //to insert 
    // var myobj = {  tid: "1001",sid:"160120733003",hour:"1",date:"08-06-2022", present:"1"};
    // dbo.collection("attendance").insertOne(myobj,function(err,res){
    //         if (err) throw err;
    //         console.log("1 document inserted");
    //         db.close;
    //     });

    //to delete
    // var myquery={date:"10-06-2022"};
    // dbo.collection("student").deleteMany(myquery,function(err,obj){
    //         if (err) throw err;
    //         console.log('values deleted');
    //         db.close();
    //     });
// });

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.post('/check', function (req, res) {
    let uname = req.body.username;
    let pword = req.body.password;
    // console.log(uname);
    // console.log(pword);
    if (uname && pword) {

        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            dbo = db.db("shahbazjahan9");
            var query = { username: uname };
            dbo.collection("login").find(query).toArray(function (err, result) {
                if (result.length == 0) {
                    res.sendFile(__dirname + '/login1.html');
                }
                else {
                    if (err) throw err;
                    // console.log(result[0].username);
                    // console.log(result[0].password);
                    else {
                        if (result[0].password == pword && result[0].type == "student") {
                            req.session.loggedin = true;
                            req.session.username = uname;
                            req.session.type = "student";
                            res.redirect("/student-home");
                        }
                        if (result[0].password == pword && result[0].type == "teacher") {
                            req.session.loggedin = true;
                            req.session.username = uname;
                            req.session.type = "teacher";
                            res.redirect("/teacher-home");
                        }
                    }
                }
                db.close;
            });
        });
    }
    else {
        res.sendFile(__dirname + '/login1.html');
    }
});

app.get('/student-home', function (req, res) {
    if (req.session.loggedin && req.session.type == "student") {
        uname = req.session.username;
        var percentage = 0;
        var length1 = 0
        var percentage1 = 0;
        var length2 = 0;
        // var percentage2 = 0;
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            dbo = db.db("shahbazjahan9");
            var query = { sid: uname, course: "iwt" };
            dbo.collection("attendance").find(query).toArray(function (err, result1) {
                if (err) throw err;
                var total_classes_attended = 0;
                length1 = result1.length;
                console.log("length 1",length1);
                for (let i = 0; i < length1; i++) {
                    if (result1[i].present == "1") {
                        total_classes_attended += 1;
                    }
                }
                percentage1 = total_classes_attended * 100 / length1;
                console.log("p1 : ",percentage1);
                for(var i=0;i<result1.length;i++)
                {
                    console.log(result1[i]);
                }
            });

            var query = { sid: uname, course: "daa" };
            dbo.collection("attendance").find(query).toArray(function (err, result2) {
                if (err) throw err;
                var total_classes_attended = 0;
                length2 = result2.length;
                for (let i = 0; i < length2; i++) {
                    if (result2[i].present == "1") {
                        total_classes_attended += 1;
                    }
                }
                var percentage2 = total_classes_attended * 100 / length2;
                percentage = ((percentage1 * length1 + percentage2 * length2) / (length1 + length2)).toFixed(2);
                console.log("p2 : ",percentage2);
                for(var i=0;i<result2.length;i++)
                {
                    console.log(result2[i]);
                }
                res.render(__dirname + "/student_home.ejs",
                    { percentage: percentage, uname: uname, percentage1: percentage1, percentage2: percentage2, length1: length1, length2: length2 });
            });
            db.close;
        });
    } else {
        res.sendFile(__dirname + "/notloggedin.html");
    }
});

app.get('/teacher-home', function (req, res) {
    if (req.session.loggedin && req.session.type == "teacher") {
        uname = req.session.username;
        res.render(__dirname + "/teacher_home.ejs", { uname: uname });
    } else {
        res.sendFile(__dirname + "/notloggedin.html");
    }
});

app.listen(5000, function () {
    console.log('app listening on port 5000!');
});