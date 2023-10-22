const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()
const {redisCheckKey} = require('./redis_server.js')
const {getAccessToken} = require('./apiComponents/getAccessToken.js')
const axios = require('axios')

const app = express() 
const PORT = 5000
app.use(cors())
app.use(express.json())

const SONG_LIMIT = 3

const jwt = require('jsonwebtoken')

const db = mysql.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "backtrack"
})

//HOME PAGE
app.get('/', (req, res)=>{
    return res.json('main')
})

//SIGN UP 
app.post('/signup', (req, res)=>{
    const promp = "SELECT COUNT(*) AS count FROM users WHERE username=(?)"
    db.query(promp, req.body.username, (err, res)=>{
        if(err) return res.json(err)
        const username_count = res[0].count
        if(username_count > 0){
            return res.json({error: "Username already in use"})
        }
        const sql = "INSERT INTO users (username, password) VALUES (?)"
        db.query(sql, [values], (err, data)=>{
        if(err) return res.json(err)
        else return res.json(data)
        })
        
    })
})

//TEST ROUTE
app.get('/users', verifyJWT, (req, res)=>{
    return res.json({user: req.user})
})

//JWT TOKEN VERIFICATION STUFF
function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
    
}
function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m'
    })
}

//Can implement with redis or db
let refreshTokens = []
app.post('/token', (req, res)=>{
    const refreshToken = req.body.token
    if(!refreshToken) res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
    if(err) return res.json(err) //res.sendStatus(403)
    const accessToken = generateAccessToken({username: user.username, password: user.password})
    return res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req, res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})


//LOG IN 
app.post('/login', (req, res)=>{
    const sql = "SELECT * FROM users WHERE username= ?"
    db.query(sql, req.body.username, (err,data)=>{
        if(err) return res.json(err)
        if(data.length == 0){
            return res.json({error: `No username found for ${req.body.username}`})
        }
        if(req.body.password == data[0].password){
            const token = generateAccessToken(req.body)
            const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            return res.json({auth: true, accessToken: token, 
            refreshToken: refreshToken, result: data})

        }
        else return res.json({auth: false, error: "Incorrect Username/Password"})
        
    })
    
})

/**
 * TESTING <==================================================================
 */
const {parseData} = require('./parseData.js')

//SEARCH SONG -- SPOTIFY API 
app.post('/api/search', async(req, res)=>{

    const access_token = await redisCheckKey()
    //return res.json({token: access_token})
    let query = req.body.query
    for(let i = 0; i < query.length; i++){
        if(query[i] == " ") query[i] = "%20"
    }
    try{
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=${SONG_LIMIT}`, {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          })

        const newMap = parseData(response.data, SONG_LIMIT) 
        return res.json(newMap)

    } catch(error){
        throw new Error(`getSongInfo failed: ${error}`)
    }
})


app.listen(PORT, ()=>{
    console.log("Server started on port 5000.")
})