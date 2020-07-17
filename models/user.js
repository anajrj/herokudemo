var mongoose= require("mongoose");
var crypto=require('crypto')
var uuidv1=require("uuid/v1")

var UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname:{
        type: String,
        maxlenght: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    userinfo:{
        type: String,
        trim: true
    },
    
    encry_password:{
        type: String,
        required:true,
    },
    salt: String,
    role:{
        type: Number,
        default: 0
    },
    purchases:{
        type: Array,
        default: []
    }
},{timestamps:true});

UserSchema.virtual('password')
.set(function(password){
    this._password=password
    this.salt=uuidv1()
    this.encry_password=this.securePassword(password)
})
.get(function(){
    return this._password
})



UserSchema.methods={
    Authenticate: function(plainPassword){
        // console.log(this.securePassword(plainPassword))
        // console.log(this.encry_password)
        return this.securePassword(plainPassword) === this.encry_password
    },

    securePassword: function(plainPassword){
        if(!plainPassword) return "this ";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
            
        } catch (error) {
            return ""
        }
    }
}



module.exports= mongoose.model("User",UserSchema)
