const User= require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

var expressJwt = require('express-jwt');
const cookieParser= require('cookie-parser')

exports.SignOut= (req,res)=>{
    res.clearcookie("token")
    res.json({
        msg: "signed out successfully"
    })
    
}

exports.SignUp= (req,res)=>{
    
    const user= new User(req.body);
    console.log(user)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].param })
        // return res.status(422).json(errors);
      }

    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
            err: "Not able to save user in DB"
            })
            
        }
        res.json({
            name: user.name,
            email: user.email
            
        })
           
    })
}
 
exports.SignIn= (req,res)=>{
    const {email, password}= req.body
    // console.log(password)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // res.status(422).json({ errors: errors.array()[0].param })
        return res.status(422).json(errors);
    }

    User.findOne({email}, (err, user)=> {
        if(err || !user){
            return res.status(400).json({
                err: "email not present in DB"
            })
        }
        if(!user.Authenticate(password)){
            return res.status(401).json({
                err: "email and password does not match"
            })
        }

        const token= jwt.sign({_id: user._id}, process.env.SECRET)
        
        res.cookie("token", token, {expire: new Date()+9999})

        const {_id, name, email, role,encry_password}= user
        // console.log(typeof(email))
        return res.json({
            token,
            user:{
                _id, name, email, role,encry_password
            }
        })


    })
}
// protected routes   
exports.isSignedIn= expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
    
})

// custom middlewares

exports.isAuthenticated= (req,res,next)=>{
    let checker= req.profile && req.auth && req.profile._id==req.auth._id
    console.log('this is isAuthenticated')
    if(!checker){
        return res.status(403).json({
            err: "ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin= (req,res,next)=>{
    if(req.profile.role===0){
        return res.status(403).json({
            err: "Not an Admin"
        })
    }
    next()
}
   
    
