const {Order,ProductCard}= require('../models/order')

exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate('products.product', 'name price')
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                err: 'order not found in DB'
            })
        }
        req.order= order
        next()
    })

}


exports.createOrder= (req,res)=>{
    req.body.order.user= req.profile
    const order= new Order(req.body.order)

    order.save((err, order)=>{
        if(err){
            return res.status(400).json({
                err: 'failed to save order in DB'
            })

        }
        res.json(order)
    })

}


exports.getAllOrders= (req,res)=>{
    Order.find()
    .populate('user', '_id name')
    .exec((err,orders)=>{
        if(err){
            res.status(400).json({
                err: 'No orders found in DB'
            })
        }
        res.json(orders)
    })
}

exports.getOrderStatus=(req,res)=>{
    return res.json(Order.schema.path('status').enumValues)
}

exports.updateStatus=(req,res)=>{
    Order.update(
        {_id: res.body.orderId},
        {$set: {status: req.body.status}},
        (err,order)=>{
            if(err){
                return res.status(400).json({
                    err: 'cannot update status'
                })
            }
            res.json(order)
        }
    )

}