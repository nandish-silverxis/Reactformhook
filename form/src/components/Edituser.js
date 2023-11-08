import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import {useForm} from "react-hook-form"



export default function Edituser() {
    const { id } = useParams();
    const [userId, setUserId] = useState(-1)
    const[edituser,setEdituser]=useState( {name:'',email:'',mobile:'',password:'',confirmpassword:'',dob:'',Country:'',gender:'male',title:"",note:" "})
    const navigate = useNavigate('')
    const[massage,setMassage]=useState('')
    const [error,setError]=useState({})
    const intitialValue = {
        title:"",
        note:"",
        id1:Math.random()*10,
    }
    const [notes,setNotes]=useState([intitialValue])
    
   
    const{ register, watch, setValue ,formState:{errors},handleSubmit}=useForm();
    

    useEffect (()=>
    {
        getuser()
    },[id])

    useEffect(() => {
        setUserId(localStorage.getItem("id"))
    })

    const getuser=async ()=>
    {
        try{

            const reqData=await fetch('https://kriyan-node-demo.onrender.com/api/v1/get-user',{
            method: "POST",
        body: JSON.stringify({ id: id}),
        headers: { "content-type": "application/json" },
        }) 
        const resData = await reqData.json();
        console.log(resData.data)
        const details=resData.data;
        console.log(details);

        
        setValue("name",details.name)
        setValue("email",details.email)
        setValue("dob",details.dob)
        setValue("mobile",details.mobile)
        setValue("gender",details.gender)
        setValue("id",details.id)
       
        

        }catch (error)
        {
            
      let timerInterval
      Swal.fire({
        title: 'Opss...',
        icon: 'error',
        html: 'Something Want Wrong<b></b>',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading()
          const b = Swal.getHtmlContainer().querySelector('b')
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
          }, 100)
        },
        willClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer')
        }
      })
        }
    }
      

    // const handelinput = (e)=>
    // {
    //     setEdituser({...edituser,[e.target.name]:e.target.value})
    //     setStates({...states,[e.target.name]:e.target.value})

    // }
    
    const handleClick = (e) =>
    {
        e.preventDefault();
        // setNotes([...notes, states])
        // setStates({
        //     title:"",
        //     note:"",

        // })
        setNotes([...notes,intitialValue])
        // intitialValue({
        //         title:"",
        //         note:"",
    
        //     })

    }

    const onSubmit = async (editinputvalue) =>
    {
        // e.preventDefault();
        // const editinputvalue={user_name:edituser.name,email:edituser.email,mobile:edituser.mobile,dob:edituser.dob,gender:edituser.gender,id:id}
        // setNotes([...notes, states])
        // setStates({
        //     title:"",
        //     note:"",

        // })
        console.log(editinputvalue)
        try{

            let res=await fetch('https://kriyan-node-demo.onrender.com/api/v1/edit-user',
            {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(editinputvalue)
            })

            let resjson= await res.json();
            if(res.status)
            {
                setMassage("user is updated successfully");
                    setTimeout(() => {
                        navigate("/Userdata");
                    }, 1000);
            }
            else{
                setMassage('Some Error Occured')
            }

        }catch (error)
        {

        }
    }
    const updateGenderState = (val) => {
        setEdituser((prevState) => ({
            ...prevState,
            ...{"gender":val},
          }));
    }
    const handalDelete = (id1)=>{

     const leftnote = notes.filter(note=> note.id1 !== id1)
     console.log(leftnote)
     setNotes(leftnote)

    
     
    }
console.log(errors)
  return (

    <div className="hero3">
    <div>
    <section >
    <div >
      
    <h1 >Edit user {parseInt(userId) + 1}</h1>
            <p className='text-success'>{massage}</p>
      
       <section className='container my-3 bg-dark w-50 text-light p-2'>
                            <form className="row g-1 p-2 " onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-6">
                            <label  className="form-label"><b>User_name:</b></label>
                            <input type="text" className="form-control" {...register("name",{required:true,pattern: /^[a-zA-Z0-9_]+$/i})} />
                            <span className='text-danger'>
                                {errors.user_name?.type==="required" && " Name is Required"}
                                {errors.user_name?.type==="pattern" && "Enter Please Valid Username "}
                            </span>
                            
                        </div>
                        <div className="col-md-6">
                            <label  className="form-label"><b>Email:</b></label>
                            <input type="email" {...register("email",{required:true,pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i})} className="form-control"/>
                            <span className='text-danger'>
                                {errors.email?.type==="required" && " Email is Required"}
                                {errors.email?.type==="pattern" && "Enter Please Valid Email "}
                            </span>
                           
                        </div>


                        

                    
                        <div className="col-12 mt-4">
                            <label className="form-label"style={{marginRight:"450px"}}><b>Mobile No:</b></label>
                            <input type="number" className="form-control" {...register("mobile",{required:true,minLength:10,maxLength:12})} />
                            <span className='text-danger'>
                                {errors.mobile?.type==="required" && " Phone Number is Required"}
                                
                                
                            </span>
                           
                        </div>


                        <div className="col-12 mt-4">
                            <label  className="form-label" style={{marginRight:"450px"}}><b>Date_Of_Birth:</b></label>
                            <input type="date" className="form-control" {...register("dob",{required:true})}  />
                            <span className='text-danger'>
                                {errors.dob?.type==="required" && " Date of Birth is Required"}
                            </span>
                        </div>

                        
                        
                 
{                        
                <fieldset className >
                                <legend className="col-form-label col-sm-2 pt-4 " ><b>Gender</b>:</legend>
                                <div className="row mt-4 mb-2 mx-3">
                                <div className="form-check col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" {...register("gender",{required:true})} value={"male"}  />
                                    <label className="form-check-label" >
                                    Male
                                    </label>
                                </div>
                                <div className="form-check col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" {...register("gender",{required:true})} id="gridRadios2" value="female" />
                                    <label className="form-check-label" htmlFor="gridRadios2">
                                    Female
                                    </label>
                                </div>
                                <div className="form-check  col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" {...register("gender",{required:true})} id="gridRadios3" value="other" />
                                    <label className="form-check-label" htmlFor="gridRadios3">
                                    Other
                                    </label>
                                </div>
                                </div>
                            </fieldset> }

                           






                       <div className='notes-container d-flex flex-wrap ' >
                       <label  className="form-label" style={{marginRight:"450px"}}><b>Notes:</b></label>
                       { notes.map((note,i)=>
                       (
                        <div className='note w-50 mt-2   p-2  py-10 border border-primary rounded' key={i}>
                         
                        {
                            i !==0 ?<button type='button' className='delete-note btn-close btn-close-white  aria-label=Close 'style={{marginLeft:"230px"}} onClick={()=>handalDelete(note.id1)}></button>
                            :<p></p>
                        }
                          

                            <input type="text" placeholder='Title' className="form-control" {...register(`notes.${i}.title`,{required:true} )} />
                            <span className='text-danger'>
                                {errors?.notes?.[i]?.title?.type==="required" && "title is Required"}
                            </span>


                           <textarea  cols="32" rows="5" placeholder='Note' className='mt-3' {...register(`notes.${i}.note`,{required:true})}  />
                            <span className='text-danger'>
                                {errors?.notes?.[i]?.note?.type==="required" ? "Discription is Required":""}
                            </span>

                            
                            
                            <h3 className='font-bold text-1xl pb-2'>{note.title}</h3>
                            <p>{note.note}</p>

                        </div>
                       ))}
                             <div className='col-12 '>
                           <button  onClick={handleClick} className='btn btn-primary mt-2 float-end'>Add More</button>
                           </div> 
                       </div>













                      

                        <div className="col-12 ">
                            <button type="submit" className="btn btn-success">Update</button>
                        </div>
                        </form>
       </section>
       
    </div>
    </section>
            </div>
            </div>
        
        
  )
}
