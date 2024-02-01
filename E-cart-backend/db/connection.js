//import mongoose
const mongoose= require('mongoose')

//to acces connection string from .env file
const db =process.env.DATABASE

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("Database connection establised");
}).catch((error)=>{
    console.log(error);
})