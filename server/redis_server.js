const { getAccessToken } = require("./apiComponents/getAccessToken");
require("dotenv").config();
const DEFAULT_EXPIRATION = 3590;

const redis = require("redis");
const client = redis.createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

//async
async function redisCheckKey() {
  return new Promise((resolve, reject) => {
    client.get("access_token", async (err, value) => {
      if (err) {
        console.error("Error retrieving value from Redis:", err);
        reject(err);
      } else {
        if (value === null) {
          const client_id = process.env.SPOTIFY_CLIENT_ID;
          const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

          const access_token = (
            await getAccessToken(client_id, client_secret)
          ).toString();
          // JSON.stringify(access_token)
          client.setex("access_token", DEFAULT_EXPIRATION, access_token);
          resolve(access_token);
        } else {
          resolve(value);
        }
      }
    });
  });
}

module.exports = { redisCheckKey };
