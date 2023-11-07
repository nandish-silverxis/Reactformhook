import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"

function Signup() {

    const[formvalue,setFormvalue]=useState({name:'',email:'',password:'',confirmpassword:''})
    const[massage,setMassage]=useState();
    const navigate=useNavigate();
    const{ register, watch ,formState:{errors},handleSubmit}=useForm();


    const handleinput = (e)=>
    {
      const{name,value}=e.target
      setFormvalue({...formvalue,[name]:value})
    }



    const onSubmit= async(data)=>
    {
     
      console.log(data)
        let res =await fetch("https://kriyan-node-demo.onrender.com/api/v1/register",{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(data)
        })
    
        let resjson=await res.json();
        console.log(resjson);
        if(res.status)
        {
          setMassage("Sign Up successfully")
            setTimeout(()=>
            {
                navigate('/');
            },2000)
        }
        else{
          setMassage("some error occured")
        }

        }


  return (
   
    <div>
    <form action='' className='form fff' onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <p className='text-success'>{massage}</p>
        <input type='text' {...register("name",{required:true,pattern: /^[a-zA-Z0-9_]+$/i})} className='box' placeholder='Enter Username'/>
        <span className='text-danger'>
                {errors.name?.type==="required" && " Name is Required"}
                {errors.name?.type==="pattern" && "Enter Please Valid Username "}
                    </span>


        
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




        <input type='password'  className='box' placeholder='Enter Confirm Password' {...register("confirmpassword", {required: true,validate: (val) => {if (watch('password') != val) {
                                                               return "Your passwords do no match";
                                                            }
                                                          },
                                                        })} />
        <span className='text-danger'>
                {errors.confirmpassword?.type==="required" && "Confirm Password is Required"}
                {errors.confirmpassword?.type === "validate" && "Confirm Password doen't match"}
                </span>


                <button type="submit" className="btn btn-primary">Submit</button>
       
        
       </form>
    </div>
  
  )
}

export default Signup
