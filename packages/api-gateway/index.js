const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
const jwt = require('jsonwebtoken');
console.log('Generated Secret Key:', secretKey);

const app = express();
const port = 5000;

app.use(cors({
  origin: ['http://localhost:5174','*.vercel.app','https://garagesystem.netlify.app'],
  credentials: true,
}));

const con = mysql.createConnection({
  host: "34.143.179.46",
  user: "root",
  password: "1234",
  port: 3306
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

try {
	app.listen(port, () => {
		console.log(`Connected successfully on port ${port}`);
	});
} catch (error) {
	console.error(`Error occurred: ${error.message}`);
}

app.get("/", (req, res) => {
  res.send('Hello')
});

app.get("/world", (req, res) => {
  res.send('Hello World')
});

app.get("/vercel", (req, res) => {
  res.send('Hello Vercel')
});

app.post('/register', (req, res) => {
  const {fname, lname, email, password} = req.body;
  const query = `INSERT INTO garage.user (fname,lname,email,password,userType) 
  VALUES (?, ?, ?, ?, 1)`;
  con.query(query,[fname, lname, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json(result);
    }
  });
});

app.get('/fetchreserve', (req, res) => {
  const query = 'SELECT * FROM garage.reserve';
  con.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.send(results);
    }
  });
});

app.post('/bookqueue', (req, res) => {
  const { 
          customer_id,  
          vechicle_reg, 
          reserve_date,
          detail
        } = req.body;
  const query = `INSERT INTO garage.reserve (customer_id,vechicle_reg,reserve_date,detail) 
  VALUES (?, ?, ?, ?)`;
  con.query(query,[ customer_id, vechicle_reg, reserve_date, detail], (err, result) => {
    if(err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if(result.affectedRows > 0){
        console.log("Insert successful")
        res.json({message: 'Insert successful'});
        console.log(result)
        return result
      }else{
        console.log("Insert failed");
        res.status(500).json({ error: 'Insert failed' });
      }
    }
  });
});

app.post('/logedIn', (req, res) => {
  const {email, password} = req.body;
  const query = "SELECT * FROM garage.user WHERE `email` = ? AND `password` = ?";
  con.query(query,[ email, password], (err, result) => {
    if(err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if(result.length > 0){
        const user = result[0];
        console.log("res: ",result)
        const dataUser = {
          uid: user.uid,
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          phone: user.phone,
          imgProfile: user.imgProfile,
          userType: user.userType
        }
        res.json(dataUser);
        return result
      }else{
        res.json("Failed");
      }
    }
  });
});

module.exports = app;