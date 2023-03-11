const Room = require('../model/room')

exports.getRooms = async (req,res) =>{
    try{
     const rooms = await Room.find({})
     res.send(rooms)
    
    }catch(e){
      console.log(e)
    }

}

exports.createRooms = async (req,res) => {
  try{
   const room = new Room(req.body)

   await room.save()
   
   res.status(201).send({status:"success",data:"Room save successful"})
  }catch(e){
    console.log(e)
    res.status(500).send({status:"error", data:e})
  }
}

exports.getRoom = async (req,res) => {
  const _id = req.params.id
  try{
    const room = await Room.findById({_id})
    res.send(room)   
  }catch(e){
    console.log(e)
  }
}