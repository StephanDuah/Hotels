const express = require('express')
const Room = require('./model/room')
require('./database/db')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())

app.use(require('./routes/roomRouter'))

app.use(require('./routes/userRouter'))
app.use(require('./routes/bookingRouter'))
app.use(require("./routes/payRouter"))



const port = 4000 

app.get('/',  (req, res) => {

 
     
 
})

app.listen(port,()=>{
  console.log("Server running")
})




