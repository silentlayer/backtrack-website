const axios = require('axios')

async function getAccessToken(client_id, client_secret) {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('client_id', client_id);
    data.append('client_secret', client_secret);

    const response = await axios.post('https://accounts.spotify.com/api/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === 200) {
      const accessToken = await response.data.access_token
      return accessToken
    } else {
      throw new Error(`Failed to obtain access token. Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}
  
  module.exports = { getAccessToken };
