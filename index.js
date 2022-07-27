const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

app.get("/api/movies",(req,res)=>{
    db.query("SELECT * FROM movies",(err,data)=>{
        if(err){
            throw err
        }
        res.json(data);
    })
})

app.post("/api/movies/add-movie",(req,res)=>{
    db.query("INSERT INTO movies (movie_name) VALUES (?)",[req.body.title],(err,data)=>{
        if(err){
            throw err
        }
        res.json(data);
    })
})

app.delete("/api/movies/:id",(req,res)=>{
    db.query("DELETE FROM movies WHERE id=?",[req.params.id],(err,data)=>{
        if(err){
            throw err
        }
        res.json(data);
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
