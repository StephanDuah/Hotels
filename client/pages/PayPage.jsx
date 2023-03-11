
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { Modal, Button } from 'react-bootstrap';
import Pusher from 'pusher-js'
function PayPage() {
    const [message,setMessage] = useState() 
   const {register,handleSubmit} = useForm()
     const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
   const submit = async(user) => {
    try{
      const data = (await axios.post('http://localhost:4000/pay',user)).data
      setMessage(data.data.display_text)
       
    }catch(e){
        
      console.log(e)
    }
     
   }
    const fetchwebhookres = async () => {

     try{
      Pusher.logToConsole = true
          var pusher = new Pusher('90867a52c23b7bb344af', {
      cluster: 'mt1'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
     setShow(true)
     setMessage("")
      console.log(data)
    });
    
     }catch(
       e
     )  {
       console.log(e)
     } }
    
   useEffect(() => {
      fetchwebhookres()
   },[])

  return (
    <div>
        <div className='container'>
        <div className='row  justify-content-center mt-5'>
            <div className='col-md-5 bs py-3 px-5'>
                <h1 className='text-center '>Payment</h1>
                {message &&  <div className='alert alert-info'>{message}</div>  }
                <form onSubmit={handleSubmit(submit)}>
                    
                    <div className='mb-3'>
                      <label htmlFor='email' className="form-label">Email:</label>
                      <input type="email" className="form-control" {...register("email")} name="email" id="email" placeholder="Enter your email here"/>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='phoneNumber' className="form-label">Phone Number</label>
                      <input type="text" className="form-control" {...register("number")} name="number" id="phoneNumber" placeholder="Enter your number here"/>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='price' className="form-label">Price</label>
                      <input type="text" className="form-control" {...register("price")} name="price" id="price" placeholder="Enter your price here"/>
                    </div>
                    
                    <div  className='mb3'>
                        <input className='btn w-100 btn-dark' type="submit" placeholder='Submit'/>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your order has been successfully placed. Thank you for shopping with us!
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

export default PayPage