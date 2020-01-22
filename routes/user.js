var express = require('express');
var userModel = require('../models/data');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var router = express.Router();

router.post('/register',(req,res)=>{
    var userr = new userModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    userModel.register(userr,(err,result)=>{
        if(err){
            res.json({msg:'user already registered'});
        }else{
            res.json({msg:'user got registerd'});
        }
    });
})

router.post('/login',(req,res)=>{
    userModel.getUserByEmail(req.body.email,(err,data)=>{
        userModel.compare(req.body.password,data[0].password,(err,result)=>{
            if(result){
                var x = jwt.sign({
                    email:data[0].email
                  }, 'MYsecretkey123', { expiresIn: '1h' });
                  res.json({token:x});
            }
        });
    });
});

router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
      res.json({msg:'we r on profile',userInfo:req.user});
});

module.exports = router;
