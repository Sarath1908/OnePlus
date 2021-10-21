const express = require('express');
const bodyparser = require('body-parser');
const api = require('./routes/api');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine' , 'ejs');
app.use(express.static(__dirname + '/public'));

// console.log(uniqid('OnePlus-'));


app.get('/' , async(req , res , next)=>{
    res.render('index');
})

app.use('/' , api);

app.listen(port , (err)=>{
    if(err)
    console.log(err);
    else
    console.log(`server listening on port ${port}`);
})
