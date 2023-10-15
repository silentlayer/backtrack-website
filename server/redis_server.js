//const { getAccessToken } = require('./apiComponents/getAccessToken')
require('dotenv').config()
const DEFAULT_EXPIRATION = 3590
const TRUE = 1

const Redis = require('redis')
const redis = Redis.createClient({
    host: 'my-redis-server',
    port: 6379,
  }); 

async function testRedis() {
    try {
      // Set a key-value pair
      await redis.set('testKey', 'Hello, Redis!');
  
      // Retrieve the value by key
      const result = await redis.get('testKey');
  
      console.log('Retrieved from Redis:', result);
    } catch (error) {
      console.error('Redis Error:', error);
    } finally {
      // Close the Redis connection
      redis.quit();
    }
  }
testRedis() 
// async function redisCheckKey(){
//     try{
          
//         if(redisClient.exists('access_token') == TRUE){
//             return  redisClient.get('access_token')
//         }
//         const client_id = process.env.SPOTIFY_CLIENT_ID
//         const client_secret = process.env.SPOTIFY_CLIENT_SECRET 
    
//         console.log(client_id) 
//         const access_token = await getAccessToken(client_id, client_secret)
//         if (access_token) redisClient.setEx('access_token', DEFAULT_EXPIRATION, JSON.stringify(access_token))
//         return access_token
//     } catch(error){
//         console.log(error)
//     }
// }

// module.exports = {redisCheckKey}