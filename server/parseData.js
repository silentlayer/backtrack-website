
function parseData(data, SONG_LIMIT){
    const song_map = {} 
    for(let i = 0; i < SONG_LIMIT; i++){
        try{
            
            let song_id = data.tracks.items[i].id 
            let song_name = data.tracks.items[i].name 
            let song_artist = data.tracks.items[i].artists[0].name 
            let song_img_url = data.tracks.items[i].album.images[1].url 
            let song_preview_url = data.tracks.items[i].preview_url 
            song_map[i] = [song_id, song_name, song_artist, song_img_url, song_preview_url]
        }
        catch(err){
            throw new Error(`${err} with parseData: song ${i}`)
        }
    }
    return song_map
}

module.exports = {parseData}