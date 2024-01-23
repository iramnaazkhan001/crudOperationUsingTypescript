// const express = require('express')
import * as express from 'express';
import { Request, Response } from 'express';
import * as mysqlQuery from 'mysql';
const app = express()
app.use(express.json())

const database = mysqlQuery.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    port: 3306,
    database: "typescript"
})

database.connect((error: string) => {
    if (error) {
        console.log("Error found....")
    } else {
        console.log("Connection SuccessFully..")
    }
})


app.post('/postuserdata', (req: Request, res: Response) => {

    const data = req.body;
    const sqlQuery = `INSERT INTO users SET ?`
    database.query(sqlQuery, data, (err, result) => {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            res.json(result); 
        }
    })

})

app.get('/getuserdata', (req: Request, res: Response) => { 
    const sqlQuery = `SELECT * FROM users`
    database.query(sqlQuery, (err, result) => {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            res.json(result); 
        }
    })
})


app.put('/updateuser/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body
    const sqlQuery = `UPDATE users SET ? WHERE id =${id}`

    database.query(sqlQuery, data, (err, result) => {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            res.json(result); 
        }
    })
})
app.delete('/deleteuser/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const sqlQuery= `DELETE FROM users WHERE id =${id}`

    database.query(sqlQuery ,(err, result) => {
        if (err) {
            console.log("Error", err.sqlMessage);
            res.status(500).json({ error: err.sqlMessage });
        } else {
            res.json(result); 
        }
    })
})

const PORT: Number = 7000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})