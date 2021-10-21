const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const path = require('path');
const nodemailer = require('nodemailer');
const db = require('../models').user;
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.USER,
    pass: process.env.PASS
    }
});
let token = 0;

router.post('/register' , async(req , res , next)=>{
    let {name , phoneno , email , variant}  = req.body;
    token += 1;
    let customerid = uniqid('Oneplus-');
    let user = {
        name , phoneno , email , variant , token , customerid
    };
    try{
        let users = await db.findOne({email : email})
        if(users === null)
        {
            let final = await db.create(user);
            await sendmail(final);
        }
        else if(users)
        {
            users.token = token;
            users.variant = variant;
            let final = await users.save();
            await sendmail(final);
        }
        
        res.send('You have successfully registered for OnePlus 7T pre booking');
    }
    catch(err){
        token--;
        res.send('Error in booking');
    }
});

module.exports = router;

async function sendmail(user)
{
    let n = user.variant.split(" ")
    let img = n[n.length - 1]
    img += '.jpg'
    let mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: 'OnePlus 7T',
        attachments: [{
            filename: 'all_models.jpeg',
            path: path.join(__dirname , '../public/Images/all_models.jpeg'), 
            cid: 'all_models'
        }],
        html : `
        <h1 style="text-align : center;">Thankyou!! for registering <span style="color:red;">OnePlus</span> 7t</h1>
        <ul> Your registered id : ${user.customerid}</ul>
        <ul>Token no. : ${user.token}</ul>
        <ul>Variant : ${user.variant}</ul>  
        <img src = "cid:all_models" style = "width:300px;height:400px;"/>
        `
    };

    
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
