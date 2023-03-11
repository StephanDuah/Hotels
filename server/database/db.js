const mongoose = require('mongoose')

const url = process.env.DB || 'mongodb://localhost/hotels'
mongoose.set("strictQuery", false);
mongoose.connect(url,{
    
    useNewUrlParser: true,
    
},()=>{
    console.log('DB running')
})