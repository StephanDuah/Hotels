import React, {createContext,useEffect,useState} from 'react'
import axios from 'axios'
export const RoomContext = createContext({})

const RoomProvider = ({children}) => {
    const [rooms, setRooms] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error,setError] = useState(false)
    useEffect(()=>{
        const fetchData = async()=>{
        try{
          setIsLoading(true)
          const response =  await axios.get('http://localhost:4000/rooms')
         const data = await response.data    
         setRooms(data)
          
          setIsLoading(false)
         
        } catch(e){
              setIsLoading(false)
              setError(true)
              console.log(e)
        }
    }

    fetchData()
    })
    return <RoomContext.Provider value={{isLoading,error,rooms}}>{children}</RoomContext.Provider>
}

export default RoomProvider