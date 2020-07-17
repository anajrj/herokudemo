var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');

const {SignOut, SignUp, SignIn}= require('../controllers/auth')
router.get('/signout', SignOut)
router.post('/signup', [
    // username must be an email
    check('name').isLength({ min: 3 }),
    // password must be at least 5 chars long
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
  ], SignUp)

router.post('/signin',[
    check('email', "email is required").isEmail(),
    check('password'," password shouls be 3 char long").isLength({ min: 3 })
], SignIn)

// router.get('/testroute', isSignedIn, (req,res)=>{
//     res.send('this is protected route')
// })


module.exports=  router;