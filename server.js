const bodyParser = require('body-parser');
const express=require("express");
const mongoose = require('mongoose');
const Worker = require('./models/Worker.js');
const app = express();

const DB_URL = 'mongodb://localhost:27017/taskDB';
mongoose.connect(DB_URL,{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/workers')
//retrieving
.get((req,res)=>{
    Worker.find((err,workerList)=>{
if(err) {res.send(err)}
else {res.send(workerList)}
    })
})
//adding
.post((req,res)=>{
    const worker = new Worker({
        worker_name:req.body.name,
        worker_password:req.body.password,
        worker_address:req.body.address,
        worker_phone:req.body.phone
    })
    worker.save((err)=>{
        if(err) {res.send(err)}
        else res.send('Successfully added a new worker!')
    }
    )
})
//removing
.delete((req,res)=>{
    Worker.deleteMany((err)=>{

        if(err){res.send(err)}
        
        else{res.send('Successfully deleted all workers!')}
     })

})
//specific
app.route('/workers/:wname')
.get((req,res)=>{
    Worker.findOne({worker_name: req.params.wname},(err,foundWorker)=>{
        if(foundWorker){res.send(foundWorker)}
        else res.send("No Matched Workerfound!")
    } )
})
//update
.put((req,res)=>{
    Worker.updateOne(
       {worker_name: req.params.wname},
       {worker_password:req.body.password}, 
       (err)=>{
           if (err){res.send(err)}
           else{res.send('Successfully updated!')}
       }
    )
})
//delete
.delete((req,res)=>{
    Worker.deleteOne(
        {worker_name:req.params.wname},

        (err)=>{
        if(err){res.send(err)}
        
        else{res.send('Successfully deleted the worker!')}
     })

})
//update
// .patch((req,res)=>{
//     Worker.update(
//     {worker_name:req.params.wname},
//     {$set:req.body},
//     (err)=>{
// if(!err){res.send('Successfully updated!')}
// else res.send(err)
//     }
//     )
// }
// )
.patch((req,res)=>{
    Worker.update(
    {worker_name:req.params.wname},
    {$set:{worker_address:req.body.address, worker_phone:req.body.phone}},
    (err)=>{
if(!err){res.send('Successfully updated!')}
else res.send(err)
    }
    )
}
)


app.listen(process.env.PORT || 8000,()=>{
    console.log("Server started on port 8000");
});