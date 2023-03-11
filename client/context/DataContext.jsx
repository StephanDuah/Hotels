import React, {createContext,useEffect,useState} from 'react'
import axios from 'axios'
export const DataContext = createContext()

const DataProvider = ({children}) => {
   const [data,setData] = useState([])

   useEffect(()=>{
    const fetchedData = async () => {
        const response = await axios.get('https://event-test-api.onrender.com/api/v1/events')
        const data = await response.data
        
        setData(data)
    }

    fetchedData()
   },[])

   return <DataContext.Provider value={{data}}>
    {children}
   </DataContext.Provider>
}

export default DataProvider