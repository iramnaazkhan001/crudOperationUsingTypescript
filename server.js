"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express = require("express");
var mysqlQuery = require("mysql");
var app = express();
app.use(express.json());
var database = mysqlQuery.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: 3306,
    database: "typescript"
});
database.connect(function (error) {
    if (error) {
        console.log("Error found....");
    }
    else {
        console.log("Connection SuccessFully..");
    }
});
app.post('/postuserdata', function (req, res) {
    var data = req.body;
    var sqlQuery = "INSERT INTO users SET ?";
    database.query(sqlQuery, data, function (err, result) {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        }
        else {
            res.json(result);
        }
    });
});
app.get('/getuserdata', function (req, res) {
    var sqlQuery = "SELECT * FROM users";
    database.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        }
        else {
            res.json(result);
        }
    });
});
app.put('/updateuser/:id', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    var sqlQuery = "UPDATE users SET ? WHERE id =".concat(id);
    database.query(sqlQuery, data, function (err, result) {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        }
        else {
            res.json(result);
        }
    });
});
app.delete('/deleteuser/:id', function (req, res) {
    var id = req.params.id;
    var sqlQuery = "DELETE FROM users WHERE id =".concat(id);
    database.query(sqlQuery, function (err, result) {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        }
        else {
            res.json(result);
        }
    });
});
var PORT = 7000;
app.listen(PORT, function () {
    console.log("Server is running on ".concat(PORT));
});
