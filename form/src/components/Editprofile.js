import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from "react-redux";
import {useForm} from "react-hook-form"


function Editprofile() {

    const{ register, watch, setValue ,formState:{errors},handleSubmit}=useForm();
    const { id } = useParams();
    const[edituser,setEdituser]=useState( {name:''})
    const navigate = useNavigate('')
    const[massage,setMassage]=useState('')
    const [error,setError]=useState({})

    const dispatch = useDispatch();
  const userInfo = useSelector((state)=> state.user.userInfo)

  useEffect(()=>{
    if(userInfo){
        setValue("name",userInfo.name)
    }
  },[userInfo])
    
   
    

    const onSubmit = (data) =>
    {
            var updateddata={...userInfo,...{name:data.name}}
            localStorage.setItem("user-info",JSON.stringify(updateddata))
            dispatch({
                    type : 'UPDATE_USER_INFO', 
                    payload :updateddata 
                   }) 
                   navigate("/Userdata")
    }
   


  return (
    
    <div>
    <section style={{marginLeft:"400px"}}>
    <div >
      
    <h1 >Edit Profile </h1>
            <p className='text-success'>{massage}</p>
      
      
                            <form className="row g-1 p-2 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12">
                            <label  className="form-label"><b>User_name:</b></label>
                            <input type="text" className="form-control" {...register("name",{required:true,pattern: /^[a-zA-Z0-9_]+$/i})} />
                            <span className='text-danger'>
                                {errors.user_name?.type==="required" && " Name is Required"}
                                {errors.user_name?.type==="pattern" && "Enter Please Valid Username "}
                            </span>
                        </div>
                        <div className="col-12 ">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>
                        </form>
       
    </div>
    </section>
            </div>
            
        
    
  )
}

export default Editprofile
