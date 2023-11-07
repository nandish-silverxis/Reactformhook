import React,{ useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

function Login() {

  const[formvalue,setFormvalue]=useState({email:'',password:''})
  const navigate=useNavigate();
  const{ register, watch ,formState:{errors},handleSubmit}=useForm();

  const dispatch = useDispatch();
  // const todo = useSelector((state) => state.data.todo);

  // const handleAddData = ()=>dispatch(getData());

 
useEffect (()=>
{
  if (localStorage.getItem('user-info'))
  {
    navigate('/Userdata')
  }
},[])

// useEffect(()=>
//   {
//     dispatch(getData());

//   },[]);


  const handleinput = (e)=>
  {
    const{name,value}=e.target
    setFormvalue({...formvalue,[name]:value})
  }

  const onSubmit= async(data)=>
    {
      let res =await fetch("https://kriyan-node-demo.onrender.com/api/v1/login",{
        method:"POST",
        headers:{'content-type':'application/json'},
        body:JSON.stringify(data)
      })
  
     res = await res.json();
     if(res.status)
     {
      localStorage.setItem("user-info",JSON.stringify(res.data))

      dispatch({
        type : 'UPDATE_USER_INFO', 
        payload : res.data
      })
      await Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login Successfully',
        showConfirmButton: false,
        timer: 2000
      })
      if (localStorage.getItem('user-info'))
      {
        navigate('/Userdata')
      }
     }
     else{
      localStorage.removeItem("user-info");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: res.message,
      })
     }

     }
    

  return (
   
        <div >
       <form action='' className='form ff' onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <input type='email' {...register("email",{required:true,pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i})} className='box' placeholder='Enter Email'/>
        <span className='text-danger'>
                {errors.email?.type==="required" && " Email is Required"}
                {errors.email?.type==="pattern" && "Enter Please Valid Email "}
                 </span>



        <input type='password' {...register("password",{required:true,minLength:6,maxLength:20,})} className='box' placeholder='Enter Password'/>
        <span className='text-danger'>
                {errors.password?.type==="required" && " Password is Required"}
                {errors.password?.type==="minLength" && "Enter Password is More then 6 Digits "}
                {errors.password?.type==="maxLength" && "Enter Password is less then 20 Digits "}
                            </span>
          <button type="submit" className="btn btn-warning">Login</button>
          <Link to='/Signup' className='sign'>Create Admin</Link>
        
       </form>
       </div>
         
   
  )
}

export default Login
