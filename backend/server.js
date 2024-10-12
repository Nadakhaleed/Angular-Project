const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
server.use(cors());


//Establish the database connection

const db = mysql.createConnection({

    host: "sql5.freesqldatabase.com",
    user: "sql5736502",
    password: "dztwevLzYK",
    database: "sql5736502",

});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });

//Establish the Port

  server.listen(8085,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 8085");

    }
});

//Create the Records

server.post("/api/sessions/add", (req, res) => {
    let details = {
      title: req.body.title,
      description: req.body.description,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
    };
    let sql = "INSERT INTO sessions SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Session created Failed" });
      } else {
        res.send({ status: true, message: "Session created successfully" });
      }
    });
  });



//view the Records

server.get("/api/sessions", (req, res) => {
    var sql = "SELECT * FROM sessions";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });


//Search the Records

server.get("/api/sessions/:id", (req, res) => {
    var sessionid = req.params.id;
    var sql = "SELECT * FROM sessions WHERE id=" + sessionid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });



//Update the Records

server.put("/api/sessions/update/:id", (req, res) => {
  let sql =
    "UPDATE sessions SET title='" + 
    req.body.title +
    "', description='" +
    req.body.description +
    "',start_time='" +
    req.body.start_time +
    "',end_time='" +
    req.body.end_time +
    "'  WHERE id=" +
    req.params.id;

  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Session Updated Failed" });
    } else {
      res.send({ status: true, message: "Session Updated successfully" });
    }
  });
});




  //Delete the Records

  server.delete("/api/sessions/delete/:id", (req, res) => {
    let sql = "DELETE FROM sessions WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Session Deleted Failed" });
      } else {
        res.send({ status: true, message: "Session Deleted successfully" });
      }
    });
  });