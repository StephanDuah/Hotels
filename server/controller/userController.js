const { findOne } = require('../model/user')
const User = require('../model/user')


exports.register = async(req,res) => {
  try{
    const user = new User(req.body)
    await user.save()

    res.send({status:"success",data:"Register Success"})
  }catch(e){
   res.send({status:"error",data:"something went wrong"})
   console.log(e)
  }
}

exports.getUser = async(req,res) => {
  try{
      const user = await User.find({})
      res.send(user)
  }catch(e){
     console.log(e)
  }
}


exports.login = async(req,res) => {
    try{
       const user = await User.findOne({email: req.body.email})
       if(!user){
        return res.send({status:"error",data:"Incorrect Credential"})
       }

       if(!(user.password === req.body.password)){
        return res.send({status:"error",data:"Incorrect credential"})
       }

      res.send({status:"success",data:user})
    }catch(e){
        res.send({status:"error",data:"Something went wrong"})
        console.log(e)
    }
}