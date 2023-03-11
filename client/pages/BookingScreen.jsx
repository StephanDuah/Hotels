import React,{useState,useEffect} from 'react'

import axios from 'axios'
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import {CircleLoader} from 'react-spinners'
import {Carousel} from 'react-bootstrap'
import { Modal, Button } from 'react-bootstrap';

function BookingScreen() {
      const [room,setRoom] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [syncing,setSync] = useState(false)
  const [error,setError] = useState(false)
  const [message,setMessage] = useState(false)
  const [booked,setBooked] = useState(false)
  const {id,startDate,endDate} = useParams() 
    const handleClose = () => setMessage(false);
     const todate = moment(endDate,'YYYY-MM-DD')
     const fromdate = moment(startDate,'YYYY-MM-DD')

     const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1
     const [totalAmount,setTotalAmount] = useState()
  

    const fetchedRooms = async () =>{
          try{

            setIsLoading(true)
            const data = (await axios.get(`http://localhost:4000/room/${id}`)).data
            setRoom(data)
            setTotalAmount(totalDays * data.rentPerNight)
            setIsLoading(false)
          }catch(e){
               setError(true)
               setIsLoading(true)
               console.log(e)
          }
            
        }

    
    const bookingFunction = async () => {
     const user = JSON.parse(localStorage.getItem('currentUser'))
     if(!user){
       window.location.href = "/login"
     }else{ 
      try{
        
     
     
     setSync(true)
     const response1 = (await axios.post("http://localhost:4000/pay",{email:user.email,price:totalAmount})).data
     console.log(response1)
     if(response1.status) {

      const bookingDetail = {
          room : room,         
          user_id: user._id,
          fromdate,
          todate,
          totalAmount,
          totalDays,
          
       }
       
       const response =  await (await axios.post("http://localhost:4000/book",bookingDetail)).data
       setSync(false)
       setMessage(true)
       setBooked(true)
       console.log(response)
      }else{
        console.log("Payment error")
        setError(true)
        setSync(false)
      } 
      }catch(e){
        console.log(e)
        setSync(false)
        setError(true)
       }
       }
    }


    useEffect(()=>{
        
        fetchedRooms()
    },[])

   
  return (
    <div className='px-5'>
      
      {error && <div className='alert alert-danger'>Something went wrong</div>}
       {isLoading ? <div><Loader /></div> : room ? <div className='row justify-content-center mt-5 bs px-3'>
            <div className='col-md-6'>
                <h1>{room.name}</h1>
                 <Carousel>
                {room.imageUrls.map((url)=>{
                   return(
                    <Carousel.Item>
                    <img src={url} className='d-block w-100 bigImg' alt="carousel image" />
                   </Carousel.Item>
                   ) 
                })}
                
            </Carousel>        
            </div>
            <div className='col-md-6 '>
                  <div style={{textAlign:"right"}}>
                       <h1>Room Details</h1>
                       <hr></hr>
                       <p>Name: {room.name}</p>
                       <p>From Date: {moment(startDate).format("DD-MM-YYYY")}</p>
                       <p>To Date: {moment(endDate).format("DD-MM-YYYY")}</p>
                       <p>Number of person: {room.maxCount}</p>
                       </div>
                       <div style={{textAlign:"right"}}>
                <h1>Amount</h1>
                <hr></hr>
                <p>Total Days: {totalDays}</p>
                <p>Rent per day: GHC{room.rentPerNight}</p>
                <p>Total Amount: GHC{totalAmount} </p>
            </div>
            <div style={{float:"right"}}>
                <button className="btn bl" disabled={syncing || booked} onClick={bookingFunction}>{syncing ? <CircleLoader color={"#fff"} loading={true} size={24}/>:`Pay  GHC${totalAmount}` }</button>
            </div>
            </div>
            
          </div>  : error ? <div><Error /></div> : <div></div> 
          
       }


       <Modal show={message} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Rooms has been successfully booked. Thank you for staying with us!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default BookingScreen