const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const app = express() 
const PORT = 5000
app.use(cors())
app.use(express.json())

const jwt = require('jsonwebtoken')

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

//Verification Middleware: 
const verifyJWT = (req, res, next)=>{
    const token = localStorage.getItem('accessToken')
    if(!token){
        res.send("Err: No Token")
    }
    else{
        jwt.verify(token, "JWTSecret", (err, decoded)=>{
            if(err) res.json({auth: false, message: "Authorization Failed"})
            else{
                return decoded
            }
        })
    }
}

app.get('/authorize', verifyJWT,(req, res)=>{
    res.send("You are authenticated!")
    

})

app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM users WHERE username=(?)"
    db.query(sql, req.body.username, (err,data)=>{
        if(err) return res.json(err)
        if(data.length == 0){
            return res.json({error: `No username found for ${req.body.username}`})
        }
        if(req.body.password == data[0].password){

            //Successful login: Create JWT Token
            const id = data[0].id 
            const token = jwt.sign({id}, "JWTSecret", {
                expiresIn: 300, 
            })

            //TODO 
            return res.json({auth: true, token: token, result: data})

        }
        else{
            res.send('Incorrect Username/Password')
        }
    })
    
})
app.listen(5000, ()=>{
    console.log("Server started on port 5000.")
})