import { useState } from 'react'
import Navbar from '../components/Navbar'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom'
import HomeScreen from '../pages/HomeScreen'
import BookingScreen from '../pages/BookingScreen'
import RegisterScreen from '../pages/RegisterScreen'
import LoginScreen from '../pages/LoginScreen'
import ProfileScreen from '../pages/ProfileScreen'
import PayPage from '../pages/PayPage'
import AdminScreen from '../pages/AdminScreen'
const router = createBrowserRouter(
  createRoutesFromElements(<>
  <Route path='/' element={<HomeScreen />} />
  <Route path='/bookingscreen/:id/:startDate/:endDate' element={<BookingScreen />} />
  <Route path='/pay' element={<PayPage/>}/>
  <Route path='/admin' element={<AdminScreen/>}/>
  <Route path='/register' element={<RegisterScreen/>}/>
  <Route path='/login' element={<LoginScreen />} />
    <Route path='/profile' element={<ProfileScreen />} />
   </>)
)

function App() {
  

  return (
    <>
    <Navbar />
    <RouterProvider router={router} />
    </>
  )
}

export default App
