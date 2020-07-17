const express = require('express')
const router = express.Router()

const { make_payment}= require('../controllers/Stripepayment')

router.post('/stripepayment',make_payment )



module.exports= router