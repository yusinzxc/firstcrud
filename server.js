var express = require("express");
var bodyParser  = require("body-parser");
var mysql = require("mysql");

const app = express();

/* MiddleWare */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  { extended: true }
));

/* Database */
const dbTable = "userdata"
const connection = mysql.createConnection({
  host    : "localhost",
  user    : "root",
  password: "",
  database: "employee"
})
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected to database!");
})

//CRUD

//create
app.post("/create", function(req, res){
  const {
    first_name, last_name, email,
    gender, ip_address
  } = req.body
  const query = `INSERT INTO ${dbTable} VALUES`+
    `(null, '${first_name}', '${last_name}','${email}','${gender}', '${ip_address}')`

  connection.query(query, function(err, result){
      console.log(req.body);
    }
  )
})

//read
app.get("/members/:id", function(req, res){
  const { id } = req.params
  const query = `SELECT first_name FROM ${dbTable} where id = '${id}'`
  connection.query(query, function(err, result){
      if(err) throw err;
      if (result.length){
        res.send(result)
      }else{
        res.status(400).send("400")
      }
    }
  )
})

//update
app.put("/update", function(req, res){
  const {
    first_name, last_name, email, id
  } = req.body
  const query = `UPDATE userdata SET first_name = "${first_name}", last_name = "${last_name}", email = "${email}" WHERE id = ${id}`
  connection.query(query, function(err, res){
    if (err) throw err;
    console.log(req.body);
  })
})

//delete
app.delete("/delete", function(req, res){
  const { id } = req.body
  const query = `DELETE FROM ${dbTable} WHERE id = ${id}`
  connection.query(query, function(err, result){
    if (err) throw err;
  })
})


/* Server */
const PORT = 3600;
app.listen(PORT, function(){
  console.log(`server is running on: http://localhost:${PORT}`);
});
