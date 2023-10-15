const axios = require('axios')

async function getAccessToken(client_id, client_secret) {
    const authString = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    try {
      const response = await axios.post('https://accounts.spotify.com/api/token', `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error(`Failed (getAccessToken): ${error}`);
    }
  }
  
  module.exports = { getAccessToken };
