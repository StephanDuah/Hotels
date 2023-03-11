import axios from 'axios'
import React, {useState} from 'react'
import {useForm} from 'react-hook-form'

function RegisterScreen() {
   const [message,setMessage] = useState({})
   const {register,handleSubmit} = useForm()
    
   const submit = async (data1) => {
    console.log(data1)
     try{
        const {password , cpassword} = data1
        if(password === cpassword){
         const response =  (await axios.post("http://localhost:4000/register",data1)).data
         const {status,data} = response
        return setMessage({status,data})      
        }
       
        setMessage({status:"error",data:"passwords do match"})

     }catch(e){
      setMessage({status:"error",data:"something went wrong"})
      console.log(e)
     }
     
   }
  return (
    <div className='container'>
        <div className='row  justify-content-center mt-5'>
            <div className='col-md-5 bs py-3 px-5'>
                <h1 className='text-center '>Hotels Register</h1>
                {message.status === "error" ? <div class={`alert alert-danger`} role="alert">
                       {message.data}
                        </div>: message.status === "success" ? <div class={`alert alert-success`} role="alert">
                       {message.data}
                        </div> : ''}
                <form onSubmit={handleSubmit(submit)}>
                    <div className='mb-3'>
                      <label htmlFor='name' className="form-label">Name:</label>
                      <input type="text" className="form-control" {...register("name")} name="name" id="name" placeholder="Enter your name here"/>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='email' className="form-label">Email:</label>
                      <input type="email" className="form-control" {...register("email")} name="email" id="email" placeholder="Enter your email here"/>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='password' className="form-label">Password</label>
                      <input type="password" className="form-control" {...register("password")} name="password" id="password" placeholder="Enter your name here"/>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='cpassword' className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" {...register("cpassword")} name="cpassword" id="cpassword" placeholder="Enter your name here"/>
                    </div>
                    <div  className='mb3'>
                        <input className='btn w-100 btn-dark' type="submit" placeholder='Submit'/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegisterScreen