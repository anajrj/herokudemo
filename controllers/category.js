const Category= require('../models/category')

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,category)=>{
        if(err){
            res.status(400).json({
                err: 'no category found'
            })
        }
        req.category= category
        next()
    })
}

exports.createCategory= (req,res)=>{
    const category= new Category(req.body)
    
    
    category.save((err,category)=>{
        if(err){
            console.log(err)
            res.json({
                err:'category can not be saved in DB'
            })
        }
        res.json({
            category
        })
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}


exports.getAllCategory= (req,res)=>{
    
    
        Category.find().sort({"product_type":1}).exec((err,categories)=>{
                    if(err){
                        res.json({
                            err:'No category found'
                        })
                    }
                    res.json(categories)
                })

    
    
    // (product_type==='all') ? (
    //     Category.find().exec((err,categories)=>{
    //         if(err){
    //             res.json({
    //                 err:'No category found'
    //             })
    //         }
    //         res.json(categories)
    //     })
    // ) : (Category.find({product_type:product_type}).exec((err,categories)=>{
    //     if(err){
    //         res.json({
    //             err:'No category found'
    //         })
    //     }
    //     res.json(categories)
    // }))
    
}

exports.updateCategory= (req,res)=>{
    const category= req.category
    category.name= req.body.name
    category.product_type= req.body.product_type

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                err: "Failed to update category"
            })
        }
        res.json(updatedCategory)

    })

}

exports.removeCategory= (req,res)=>{
    const category= req.category

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                err: "Failed to delete this category"
            })
        }
        res.json({
            message: `successfully deleted  ${category.name} category`
        })
    })
}