const User= require('../models/user')
const Order= require('../models/order')

exports.getUserById= (req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                err: "no user is found in DB"
            })
        }
        req.profile=user
        next()
    })
}

exports.getUser= (req,res)=>{
    req.profile.salt= undefined
    req.profile.encry_password=undefined
    res.json(req.profile)
}

exports.updateUser= (req,res)=>{
    console.log('this is update function')
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
          if (err) {
            return res.status(400).json({
              error: "You are not authorized to update this user"
            });
          }
          user.salt = undefined;
          user.encry_password = undefined;
          res.json(user);
        }
      );
}

exports.userPurchaseList=(req,res)=>{
  Order.find({user:req.profile._id})
  .populate('user', 'id name')
  .exec((err,order)=>{
    if(err){
      return res.status(400).json({
        err: "no orders found "
      })
    }
    res.json(order)
  })
}

exports.pushOrderInPurchaseList= (req,res,next)=>{
  let purchases=[]
  req.body.order.products.forEach(product=>{
    purchases.push({
      _id: product._id,
       name: product.name,
       description: product.description,
       category: product.category,
       quantity: product.quantity,
       amount: req.body.order.amount,
       transaction_id: req.body.order.transaction_id

    })
  })

  User.findOneAndUpdate(
    {_id: res.profile._id},
    {$push: {purchases:purchases}},
    {new: true},
    (err,purchases)=>{
      if(err){
        res.status(400).json({
          err: "unable to save purchase list"
        })
      }
      next()
    }
  )
}