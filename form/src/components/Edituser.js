import React, { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'



export default function Edituser() {
    const { id } = useParams();
    const [userId, setUserId] = useState(-1)
    const[edituser,setEdituser]=useState( {name:'',email:'',mobile:'',password:'',confirmpassword:'',dob:'',Country:'',gender:'male'})
    const navigate = useNavigate('')
    const[massage,setMassage]=useState('')
    const [error,setError]=useState({})

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
        setEdituser(resData.data);

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
      

    const handelinput = (e)=>
    {
        setEdituser({...edituser,[e.target.name]:e.target.value})
    }
    

    const handelupdate = async (e) =>
    {
        e.preventDefault();
        const editinputvalue={user_name:edituser.name,email:edituser.email,mobile:edituser.mobile,dob:edituser.dob,gender:edituser.gender,id:id}
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

  return (

    <div className="hero3">
    <div>
    <section >
    <div >
      
    <h1 >Edit user {parseInt(userId) + 1}</h1>
            <p className='text-success'>{massage}</p>
      
       <section className='container my-3 bg-dark w-50 text-light p-2'>
                            <form className="row g-1 p-2 " onSubmit={handelupdate}>
                        <div className="col-md-6">
                            <label  className="form-label"><b>User_name:</b></label>
                            <input type="text" className="form-control" name="name" value={edituser.name} onChange={handelinput}/>
                            
                        </div>
                        <div className="col-md-6">
                            <label  className="form-label"><b>Email:</b></label>
                            <input type="email" name='email' className="form-control" value={edituser.email} onChange={handelinput} />
                           
                        </div>


                        

                    
                        <div className="col-12 mt-4">
                            <label className="form-label"style={{marginRight:"450px"}}><b>Mobile No:</b></label>
                            <input type="number" className="form-control" name="mobile" value={edituser.mobile} onChange={handelinput} />
                           
                        </div>


                        <div className="col-12 mt-4">
                            <label  className="form-label" style={{marginRight:"450px"}}><b>Date_Of_Birth:</b></label>
                            <input type="date" className="form-control" name="dob"  value={edituser.dob} onChange={handelinput} />
                        </div>

                        
                        
                 
{                        
                <fieldset className >
                                <legend className="col-form-label col-sm-2 pt-4 " ><b>Gender</b>:</legend>
                                <div className="row mt-4 mb-2 mx-3">
                                <div className="form-check col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" name="x" value={"male"} checked={(edituser.gender=="male")?true:false} onChange={e=>updateGenderState("male")} />
                                    <label className="form-check-label" >
                                    Male
                                    </label>
                                </div>
                                <div className="form-check col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" name="x" id="gridRadios2" value="female"  checked={(edituser.gender=="female")?true:false} onChange={e=>updateGenderState("female")}/>
                                    <label className="form-check-label" for="gridRadios2">
                                    Female
                                    </label>
                                </div>
                                <div className="form-check  col-sm-2 me-4">
                                    <input className="form-check-input" type="radio" name="x" id="gridRadios3" value="other" checked={(edituser.gender=="other")?true:false}  onChange={e=>updateGenderState("other")}/>
                                    <label className="form-check-label" for="gridRadios3">
                                    Other
                                    </label>
                                </div>
                                </div>
                            </fieldset> }
                            

                            


                        
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
