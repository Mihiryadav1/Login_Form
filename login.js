const mysql = require('mysql');
const express = require('express');
const path = require('path')
const app = express();
//body parser is used to get the form data fields
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



//HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
//CSS
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname + "/style.css"));
});




// SQL  connection 
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: "newdbs"
});

/*Post Request for form data collection*/
app.post('/', (req, res) => {
    var userName = req.body.username;
    const pass = req.body.password;
    // console.log(userName, pass);
   
    con.connect((err) => {
        if (err) throw err;
        const sql="INSERT INTO user(FirstName,UserPassword) VALUES('"+userName+"','"+pass+"')";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.send('User Registered Successfully');
            console.log('User Registered')
            return;
        })
        return;
    })
})




app.listen(8000);
