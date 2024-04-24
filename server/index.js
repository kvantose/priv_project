const express = require("express");
const cors = require("cors");
const app = express();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:1478@localhost:5432/users_priv_proj");

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log("server running on port 8000");
});

app.get("/main/get", (req, res) => {
  db.any("SELECT * FROM users")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.post("/delete", (req, res) => {
  db.query("DELETE FROM users WHERE id = $1", req.body.id)
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
});

app.post("/add", (req, res) => {
  db.query("INSERT INTO users (login, password) VALUES ($1, $2)", [
    req.body.login,
    req.body.password,
  ])
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
});

app.post("/addnews", (req, res) => {
  db.query("INSERT INTO news (title, img, message) VALUES ($1, $2, $3)", [
    req.body.title,
    req.body.image,
    req.body.text,
  ])
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
})


app.get("/getnews", (req, res) => {
  db.any("SELECT * FROM news")
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
})

app.post("/deletenews:id", (req, res) => {
  db.query("DELETE FROM news WHERE id = $1", req.body.id)
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
})


app.get("/getnews/:id", (req, res) => {
  db.any("SELECT * FROM news WHERE id = $1", req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
})

app.post("/savenews/:id", (req, res) => {
  db.query("UPDATE news SET title = $1, img = $2, message = $3 WHERE id = $4", [
    req.body.title,
    req.body.image,
    req.body.text,
    req.params.id
  ])
    .then((d) => console.log(d))
    .catch((e) => console.log(e));
})