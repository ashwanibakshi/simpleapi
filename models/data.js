var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');


var userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
});

var userModel = module.exports = mongoose.model('user',userSchema);


module.exports.register = (user,cb)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err,hash)=>{
            user.password=hash;
            user.save((err,result)=>{
                if(err){
                    cb(err,null);
                }else{
                    cb(null,result);
                }
            });
        });
    });
}

module.exports.compare = (password,hash,cb)=>{
    bcrypt.compare(password,hash,(err,result)=>{
        if(err){
            cb(err,null);
        }else{
            cb(null,result);
        }
    });
}

module.exports.getUserByEmail = (email,cb)=>{
    userModel.find({'email':email},(err,result)=>{
        if(err){
            cb(err,null);
        }else{
            cb(null,result);
        }
    });
}