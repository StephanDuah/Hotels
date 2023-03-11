import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Rooms from '../components/Rooms'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import AOS from 'aos'
import moment from 'moment'
import 'aos/dist/aos.css'

AOS.init({
  duration:2000
})
function HomeScreen() {
  const [rooms,setRooms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState()
  const [startDate,setStartDate] = useState()
  const [endDate,setEndDate] = useState()
  const [duplicateRooms,setDuplicateRooms] = useState([])
  const {RangePicker} = DatePicker
  const fetchedRooms = async () =>{
          try{

            setIsLoading(true)
            const data = (await axios.get('http://localhost:4000/rooms')).data
            console.log(data)
            setRooms(data)
            setDuplicateRooms(data)
            setIsLoading(false)
          }catch(e){
               setError(true)
               setIsLoading(false)
               console.log(e)
          }
            
        }  

        function checkavailability(room,start,end){

          if(room.currentBookings.length > 0){
               
                for(const booking of room.currentBookings){  
                 if(moment(start).isBetween(booking.fromdate,booking.todate) ){
                  return false
                }

                if( moment(end).isBetween(booking.fromdate,booking.todate)){
                  return false
                }

                if(moment(start).isSame(booking.fromdate) || moment(end).isSame(booking.fromdate) || moment(end).isSame(booking.todate) || moment(end).isSame(booking.todate)){
                  return false
                }  
                
                if(moment(start).isBefore(booking.fromdate) && moment(end).isAfter(booking.todate)){
                  return false
                }
              }
           
        }
        return true
      }
        function filterDate  (dates)  {
         
            const start = moment(dates[0].$d).format("YYYY-MM-DD")
            const end = moment(dates[1].$d).format("YYYY-MM-DD")
            
            setStartDate(start)
            setEndDate(end)

            
             var temprooms = []

            

              for(const room of duplicateRooms){
               
               if( checkavailability(room,start,end) ){
                 temprooms.push(room)
               }
                
              }

              setRooms(temprooms)
             
          
        
            }

            const filterSearch = (e) => {
                const search = e.target.value
                const temprooms = duplicateRooms.filter(room => room.name.toLowerCase().includes(search.toLowerCase()))

                setRooms(temprooms)
            }

            const filterSelect = (e) => {
                const select = e.target.value

                if(select.toLowerCase() !== "All".toLowerCase()){
                const temprooms = duplicateRooms.filter(room => room.type.toLowerCase() === select.toLowerCase())

                setRooms(temprooms)

                }else{
                  setRooms(duplicateRooms)
                }
            }
        
    useEffect(()=>{
        

        fetchedRooms()
    },[])

  return (
    <div className='container'>
      <div className='row mt-5 bs justify-content-center'>
        <div className='col-md-3 mt-2'>
          
          <RangePicker format="YYYY-MM-DD" onChange={filterDate}/>
        
        </div>
        <div className='col-md-5 mt-2'>
          <input type="text" className="form-control" name="search" placeholder="Search rooms" onChange={filterSearch}/>
        </div>

        <div className='col-md-3 mt-2'>
          
          <select className='form-control' onChange={filterSelect}>
            <option value="All">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </select>

          
        
        </div>
      </div>
    <div className='row justify-content-center mt-3'>{
      isLoading ? <Loader /> : rooms.length >= 1 ? rooms.map((room) => {
        return (
          
          <div className='col-md-9 mt-2'><Rooms data-aos='fade-up' key={room._id} room={{...room,startDate,endDate}}  /></div>
        )
      })
     : error ? <Error /> : <div></div> }
     </div>
    </div>
  )
}

export default HomeScreen