const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const { redisCheckKey } = require("./redis_server.js");
const { getAccessToken } = require("./apiComponents/getAccessToken.js");
const axios = require("axios");

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const SONG_LIMIT = 12;

const jwt = require("jsonwebtoken");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "backtrack",
});

//HOME PAGE
app.get("/", (req, res) => {
  return res.json("main");
});

//SIGN UP
app.post("/signup", (req, res) => {
  const promp = "SELECT COUNT(*) AS count FROM users WHERE username=(?)";
  db.query(promp, req.body.username, (err, res) => {
    if (err) return res.json(err);
    const username_count = res[0].count;
    if (username_count > 0) {
      return res.json({ error: "Username already in use" });
    }
    const sql = "INSERT INTO users (username, password) VALUES (?)";
    db.query(sql, [values], (err, data) => {
      if (err) return res.json(err);
      else return res.json(data);
    });
  });
});

//TEST ROUTE
app.get("/users", verifyJWT, (req, res) => {
  return res.json({ user: req.user });
});

//JWT TOKEN VERIFICATION STUFF
function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "10m",
  });
}

//Can implement with redis or db
let refreshTokens = [];
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.json(err); //res.sendStatus(403)
    const accessToken = generateAccessToken({
      username: user.username,
      password: user.password,
    });
    return res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

//LOG IN
app.post("/login", (req, res) => {
  const sql = "SELECT * FROM users WHERE username= ?";
  db.query(sql, req.body.username, (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) {
      return res.json({ error: `No username found for ${req.body.username}` });
    }
    if (req.body.password == data[0].password) {
      const token = generateAccessToken(req.body);
      const refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      return res.json({
        auth: true,
        accessToken: token,
        refreshToken: refreshToken,
        result: data,
      });
    } else
      return res.json({ auth: false, error: "Incorrect Username/Password" });
  });
});

//RANKINGS SONG-DB
app.post("/rankings", (req, res) => {
  const sql_1 = "SELECT * FROM songs WHERE song_id = ?";
  db.query(sql_1, req.body.song_id, (err, data) => {
    if (err) return res.json(err);
    if (data.length == 0) {
      //add a new entry
      const sql_2 =
        "INSERT INTO songs (song_id, song_name, song_total_rating, song_num_rates) VALUES (?, ?, ?, ?)";
      const values_1 = [
        req.body.song_id,
        req.body.song_name,
        req.body.song_rating,
        1,
      ];
      db.query(sql_2, values_1, (err, data) => {
        if (err) return res.json(err);
        return res.json("Inserted");
      });
    }
    //song already in db
    else {
      if (data.length > 1) {
        return res.json("Err: many song entries for that ID");
      }
      const top_song = data[0];
      const song_id = top_song.song_id;
      const song_num_rates = parseInt(top_song.song_num_rates, 10) + 1;
      const song_rating =
        parseInt(top_song.song_total_rating, 10) +
        parseInt(req.body.song_rating, 10);
      const sql_3 =
        "UPDATE songs SET song_total_rating = ?, song_num_rates = ? WHERE song_id = ?";
      const values_2 = [song_rating, song_num_rates, song_id];
      db.query(sql_3, values_2, (err, data) => {
        if (err) return res.json(err);
        return res.json("updated!");
      });
    }
  });
});

/**
 * TESTING <==================================================================
 */
const { parseData } = require("./parseData.js");

//SEARCH SONG -- SPOTIFY API
app.post("/api/search", async (req, res) => {
  const access_token = await redisCheckKey();
  //return res.json({token: access_token})
  let query = req.body.query;
  for (let i = 0; i < query.length; i++) {
    if (query[i] == " ") query[i] = "%20";
  }
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=${SONG_LIMIT}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const newArr = parseData(response.data, SONG_LIMIT);
    return res.json(newArr);
  } catch (error) {
    throw new Error(`getSongInfo failed: ${error}`);
  }
});

app.listen(PORT, () => {
  console.log("Server started on port 5000.");
});
