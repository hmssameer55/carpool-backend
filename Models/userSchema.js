const {Schema,model}=require('mongoose')

const userSchema = new Schema ({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

const userModel = model("users",userSchema)

module.exports=userModel