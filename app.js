require('dotenv').config()

const mongoose = require('mongoose');

const express= require('express')
const bodyParser= require('body-parser')
const cookieParser= require('cookie-parser')
const cors=require('cors')
const app=express();

const authRoutes= require('./routes/auth')
const userRoutes= require('./routes/user')
const categoryRoutes= require('./routes/category')
const productRoutes= require('./routes/product')
const orderRoutes= require('./routes/order')
const stripeRoutes= require('./routes/Stripepayment')




// DATABASE CONNECTION 

// require('./database');

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

// mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
// .then(()=>{
//     console.log("DB RUNNING")
// }).catch(()=>{
//     console.log("DB NOT RUNNING")
// })
const port =process.env.PORT||8000
// MIDDLEWARE
app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('projfrontend/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'projfrontend', 'build', 'index.html'))
    })
  
  }

app.use(cookieParser())

// ROUTES
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);





//SERVER
app.listen(port, ()=>{
    console.log(`app is running on ${port}`)
})
