function parseData(data, SONG_LIMIT) {
  const song_arr = [];
  const min_loops = Math.min(SONG_LIMIT, data.tracks.items.length);
  for (let i = 0; i < min_loops; i++) {
    try {
      let song_id = data.tracks.items[i].id;
      let song_name = data.tracks.items[i].name;
      let song_artist = data.tracks.items[i].artists[0].name;
      let song_img_url = data.tracks.items[i].album.images[1].url;
      let song_link = data.tracks.items[i].external_urls.spotify;
      song_arr.push([song_id, song_name, song_artist, song_img_url, song_link]);
    } catch (err) {
      throw new Error(`${err} with parseData: song ${i}`);
    }
  }
  return song_arr;
}

module.exports = { parseData };
