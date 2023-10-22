const axios = require("axios");

async function searchSong(accessToken, query) {
  for (let i = 0; i < query.length; i++) {
    if (query[i] == " ") query[i] = "%20";
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const trackInfo = response.data;
    return trackInfo;
  } catch (error) {
    throw new Error(`getSongInfo failed: ${error}`);
  }
}

module.exports = { searchSong };
