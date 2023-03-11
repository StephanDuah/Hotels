import React from 'react'
import { Tabs } from 'antd';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';


export default function ProfileScreen() {
   const user = JSON.parse(localStorage.getItem('currentUser')) 
   
   useEffect(()=>{
     

     if(!user){
        windows.location.href = "/login"
     }
   })



    const {TabPane} = Tabs
  return (
    <div className='container'>
        <Tabs defaultActiveKey='1' >
            <TabPane tab="Profile" key="1" >
                <h2>Profile</h2>
                <br />
               <h1>Name: {user.name}</h1>
               <h1>Email: {user.email}</h1>
            </TabPane>
            <TabPane tab="Bookings" key="2" ><Booking /></TabPane>
            
        </Tabs>
    </div>
  )
}

export  function Booking () {

    const [rooms,setRooms] = useState([])
    const [loading,setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message,setMessage] = useState("")


    const  fetchdata = async() => {
        try{
            const user = JSON.parse(localStorage.getItem('currentUser'))
            console.log(user._id)
            setLoading(true)
            const data = await ( await axios.post('http://localhost:4000/getUserBookings',{user_id:user._id})).data 
            
            setRooms(data)
            setLoading(false)
        }catch(e){
            setLoading(false)
            setError(true)
            console.log(e)
        }
        
    }
    useEffect( ()=>{
       fetchdata()
    },[])


    async function cancelBooking(bookingId, room_id){
        try{
            setLoading(true)
            const result = await (await axios.post("http://localhost:4000/cancelUserBooking", {bookingId, room_id})).data
            setMessage(`The Booking with ID ${bookingId} has been cancelled`)
            setLoading(false)
        }catch(error){
            setLoading(false)
            setError(true)
            console.log(error)
        }
    }
    return (<>
      <h2>Booking</h2>
      {loading && <Loader />}
      {message && <div className='alert alert-success'>{message}</div>}
      {rooms &&
        rooms.map(room => (
            <div key={room._id} className="bs">
                <h1>{room.room}</h1>
                <hr></hr>
                <p><b>booking ID: </b>{room._id}</p>
                <p><b>Transaction ID: </b>{room.transactionId}</p>
                <p><b>Check In: </b>{room.fromdate}</p>
                 <p><b>Check In: </b>{room.todate}</p>
                <p><b>Status:  </b> {room.status === "booked" ? <div className=" text-success d-inline">Confirmed</div> : <div className="text-warning d-inline">Cancelled</div>}</p>
                {room.status === "booked" &&<div  >
                    <button className='btn btn-danger' onClick={() => cancelBooking(room._id,room.room_id)}>Cancel Booking</button>
                </div>}
            </div>
        )

        )
      }
       
      
    </>)
}

 