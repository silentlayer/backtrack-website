const { getAccessToken } = require('./apiComponents/getAccessToken')
require('dotenv').config()
const DEFAULT_EXPIRATION = 3590

const redis = require('redis')
const client = redis.createClient()
client.on('error', err => console.log('Redis Client Error', err));



async function redisCheckKey(){
    
        const token = await client.get('hello')
        return token 
        
        // else{
        //     const client_id = process.env.SPOTIFY_CLIENT_ID
        //     const client_secret = process.env.SPOTIFY_CLIENT_SECRET 
        
        //     const access_token = await getAccessToken(client_id, client_secret)
        //     if (access_token) client.setEx('access_token', DEFAULT_EXPIRATION, JSON.stringify(access_token))
        //     return access_token
        // }
    
}

module.exports = {redisCheckKey}