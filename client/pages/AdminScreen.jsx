import React from 'react'
import {Tabs} from 'antd'
import { useEffect,useState } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

const {TabPane} = Tabs


function AdminScreen() {
  return (
    <div className='py-3 px-5'><div className='bs'>
        <h2 className="text-center" style={{fontSize: '30px'}}><b>Admin Panel</b></h2>
            <Tabs defaultActiveKey='1' >
            <TabPane tab="Bookings" key="1" >
                <Bookings />
            </TabPane>
            <TabPane tab="Rooms" key="2" >
                <Rooms />
            </TabPane>
            <TabPane tab="Add Room" key="3" >
                <AddRooms />
            </TabPane>
            <TabPane tab="Users" key="4" >
                <Users />
            </TabPane>
            
        </Tabs>
        </div>
        </div>
  )
}

export function AddRooms (){

    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [message,setMessage] = useState(false)
    const {register,handleSubmit} = useForm()

    const onSubmit = async (room) => {
        console.log(room)
      const {image1,image2,image3} = room
      const imageUrls = [image1,image2,image3]
      try{
        setLoading(true)
       const response = await (await axios.post('http://localhost:4000/rooms',{...room,imageUrls})).data
       if(response.status === "success"){
        setMessage(response.data)
       }
       setLoading(false)
        }catch(e){
            setLoading(false)
            setError(e)
            console.log(e)
      }
    }
    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {message && <div className='alert alert-success'>{message}</div>}
            {error && <div className='alert alert-danger'>something went wrong</div>}
          <div className='row'>
            <div className='col-md-5'>
                <input type="text" {...register("name")} className='form-control my-4' placeholder='room name'/>
                <input type="text" {...register("rentPerNight")} className='form-control my-4' placeholder='rent per night'/>
                <input type="text" {...register("maxCount")} className='form-control my-4' placeholder='number of person'/>
                <input type="text"{...register("description")} className='form-control my-4' placeholder='description'/>
            <input type="text" {...register("phoneNumber")} className='form-control my-4' placeholder='phone number'/>

            </div>
            <div className='col-md-5'>
                <select className='form-control my-4' {...register("type")}>
                  <option value="delux">Delux</option>
                  <option value="non-delux">Non delux</option>
                </select>
                <input type="text" {...register("image1")} className='form-control my-4' placeholder='Image URL 1'/>
                <input type="text" {...register("image2")} className='form-control my-4' placeholder='Image URL 2'/>
                <input type="text" {...register("image3")} className='form-control my-4' placeholder='Image URL 3'/>
                <div className="">
                    <button type='submit' disabled={loading} className='btn btn-primary'>{loading ? "...loading" :"Add Room"}</button>
                </div>
            </div>
          </div>
          </form>
        </>
    )
}

export function Bookings() {
   const [bookings,setBookings] = useState([])
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(false)  

   const fetchBookings = async () => {
    try{
        setLoading(true)
       const data = await (await axios.get("http://localhost:4000/bookings")).data
       setBookings(data)
       setLoading(false)
    }catch(e){
       setLoading(false)
       setError(e)
       console.log(e)
       
       
    }
   }
    useEffect(()=>{
      fetchBookings()
    })
    return(
        <>
        <h1>{bookings.length} bookings</h1>
        <table className="table table-bordered table-dark">
         <thead className='bs'>
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
         </thead>
         <tbody>
            {bookings && (bookings.map((booking)=>{
                return (
                    <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.user_id}</td>
                        <td>{booking.room}</td>
                        <td>{booking.fromdate}</td>
                        <td>{booking.todate}</td>
                        <td>{booking.status}</td>
                    </tr>
                )
            }))}
         </tbody>
        </table>

        </>
    )
}

export function Rooms() {
   const [rooms,setRooms] = useState([])
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(false)  

   const fetchRooms = async () => {
    try{
        setLoading(true)
       const data = await (await axios.get("http://localhost:4000/rooms")).data
       setRooms(data)
       setLoading(false)
    }catch(e){
       setLoading(false)
       setError(e)
       console.log(e)
       
       
    }
   }
    useEffect(()=>{
      fetchRooms()
    })
    return(
        <>
        <h1>{rooms.length} Rooms</h1>
        <table className="table table-bordered table-dark">
         <thead className='bs'>
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent per night </th>
              <th>Number of persons</th>
              <th>Phone number</th>
            </tr>
         </thead>
         <tbody>
            {rooms && (rooms.map((room)=>{
                return (
                    <tr key={room._id}>
                        <td>{room._id}</td>
                        <td>{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.rentPerNight}</td>
                        <td>{room.maxCount}</td>
                        <td>{room.phoneNumber}</td>
                    </tr>
                )
            }))}
         </tbody>
        </table>
        </>
    )
}


export function Users() {
   const [users,setUsers] = useState([])
   const [loading,setLoading] = useState(false)
   const [error,setError] = useState(false)  

   const fetchUsers = async () => {
    try{
        setLoading(true)
       const data = await (await axios.get("http://localhost:4000/users")).data
       setUsers(data)
       setLoading(false)
    }catch(e){
       setLoading(false)
       setError(e)
       console.log(e)
       
       
    }
   }
    useEffect(()=>{
      fetchUsers()
    })
    return(
        <>
        <h1>{users.length} Users</h1>
         <table className="table table-bordered table-dark">
         <thead className='bs'>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
         </thead>
         <tbody>
            {users && (users.map((user)=>{
                return (
                    <tr key={user._id}>
                         <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                )
            }))}
         </tbody>
        </table>
        </>
    )
}

export default AdminScreen



