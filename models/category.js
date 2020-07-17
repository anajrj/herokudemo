const mongoose= require('mongoose')

const categorySchema= mongoose.Schema(
{
    
    product_type: {
        type: String,
        required: true,
        trim: true,
        
        maxlength:32
    },
    
    name:{
        type:String,
        trim: true,
        required: true,
        
        maxlength: 32
    }
},
{
    timestamps: true
})


module.exports= mongoose.model("Category",categorySchema)