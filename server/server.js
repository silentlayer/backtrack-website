const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express() 
const PORT = 5000
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "backtrack"
})

app.get('/', (req, res)=>{
    return res.json('main')
})

app.post('/signup', (req, res)=>{
    const values = [
        req.body.email, 
        req.body.password
    ]
    const promp = "SELECT COUNT(*) AS count FROM users WHERE username=(?)"
    db.query(promp, [values[0]], (err, res)=>{
        if(err) return res.json(err)
        const username_count = res[0].count
        console.log(username_count)
        if(username_count > 0){
            return res.json({error: "Username already in use"})
        }
        else{
            const sql = "INSERT INTO users (username, password) VALUES (?)"
            db.query(sql, [values], (err, data)=>{
            if(err) return res.json(err)
            else return res.json(data)
    })
        }
    })
})

app.get('/users', (req, res)=>{
    const sql = "SELECT * FROM users"
    db.query(sql, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post('/login', (req, res)=>{
    const values = [
        req.body.username, 
        req.body.password
    ]
    const sql = "SELECT * FROM users WHERE username=(?)"
    db.query(sql, [values[0]], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
    
})
app.listen(5000, ()=>{
    console.log("Server started on port 5000.")
})