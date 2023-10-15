const { getAccessToken } = require('./getAccessToken')
const redis = require('redis')
const redisClient = redis.createClient() 
const DEFAULT_EXPIRATION = 3590
const FALSE = 0
require('dotenv').config()


async function redisCheckKey(){
    if(redisClient.exists('access_token') != FALSE){
        return  
    }
    const client_id = process.env.SPOTIFY_CLIENT_ID
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET 

    console.log(client_id) 
    const access_token = getAccessToken(client_id, client_secret)
    if (access_token) redisClient.setEx('access_token', DEFAULT_EXPIRATION, access_token)
}

module.exports = { redisCheckKey }