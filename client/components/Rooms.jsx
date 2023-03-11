import {Link} from 'react-router-dom'
import React,{useState} from 'react'
import {Modal,Carousel} from 'react-bootstrap'

function Rooms({room}) {
    const {_id,name,description,imageUrls,maxCount,phoneNumber,type,startDate,endDate} = room
    const [show, setShow] = useState(false)

    //Modal handlers
    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)
  return (
    
    <div className='row bs'>
        <div className="col-md-4">
            <img src={imageUrls[0]} className="smallImg"/>
        </div>
        <div className="col-md-7">
            
            <h1>{name}</h1>
          
            <p>persons Limit: {maxCount}</p>
            <p>Room type: {type}</p>
            <p>Contact: {phoneNumber}</p>
            <div style={{float:'right'}}>
                {(startDate && endDate) && (
                    <Link style={{marginRight:"10px"}} className="btn bl" to={`/bookingscreen/${_id}/${startDate}/${endDate}`  }>Book Now</Link>
                )}
                <button className='btn bl' onClick={handleOpen}>View details</button>
            </div>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
           <Modal.Header closeButton>
              <Modal.Title>{name}</Modal.Title>
           </Modal.Header>
           <Modal.Body>
            <Carousel>
                {imageUrls.map((url)=>{
                   return(
                    <Carousel.Item>
                    <img src={url} className='d-block w-100 bigImg' alt="carousel image" />
                   </Carousel.Item>
                   ) 
                })}
                
            </Carousel>
            <p>{description}</p>
            </Modal.Body>
        </Modal>
    </div>
 
  )
}

export default Rooms