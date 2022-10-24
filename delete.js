//this is to run sesisons
MongoClient = require('mongodb').MongoClient;
const express = require('express');
// const url = 'mongodb://localhost:27017/';
const url = 'mongodb+srv://shahbazjahan9:shahbazjahan9@cluster0.vb8fvg4.mongodb.net/?retryWrites=true&w=majority';
const databasename = 'shahbazjahan9';
const app = express();
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('attendance_management');
    var query={username:"160120733050"};
    dbo.collection("login").find(query).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        db.close;
    });
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
});



app.listen(5000, function () {
    console.log('app listening on port 5000!');
});