const mongoose=require("mongoose")
const { stringify } = require("querystring")
const workerSchema=new mongoose.Schema(
    {
        worker_name:{
            type:String,
            required:'Please enter your task name'
        },
        worker_address:{
            type:String,
           // required:'Please enter your address'
        },
        worker_phone:{
            type:String,}
       // required:'Please enter your phone'}
        ,
        worker_password:{
            type:String,
          //  required:'Please enter your password'}
            },
        creation_date: {
            type: Date,
            default : Date.now
        }

        
    }
)
module.exports = mongoose.model("Worker",workerSchema)