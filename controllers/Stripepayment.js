const stripe= require('stripe')('sk_test_51Gzg9lAe9QUHkBRfDfjszWryCeIwp33452aNcdvbYFvP6yahTRoZKd82uiR29Fa3MINGRgdcIEEAoEsOq6gNVTFc00Vr2r9k56')
const uuid= require('uuid/v4')


exports.make_payment= (req,res)=>{
    const {products, token}= req.body
    console.log(products)
    let amount=0
    products.map(p=>{
        amount= amount+p.price
    })

    const idempotencyKey= uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer=>{
        stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            shipping:{
                name: token.card.name
            }
        }, {idempotencyKey})
        .then(result=> res.status(200).json(result))
        .catch(err=>console.log(err))
    })

}