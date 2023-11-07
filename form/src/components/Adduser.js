import React,{ useEffect, useState } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form"
import Swal from 'sweetalert2'
import Heder from './commen/Header';
import Select from 'react-select'


function Adduser() {

    const [countrydata,setCountrydata]=useState([]);
    const [countryid,setCounrtyid]=useState('');
    const[statedata,setStatedata]=useState([]);
    const[stateid,setStateid]=useState('');
    const[enable,setEnable]=useState(true);
    const[tnc,setTnc]=useState(false);
    const[massage,setMassage]=useState();
    const navigate=useNavigate();
    const{ register, watch ,formState:{errors},handleSubmit}=useForm();
    
console.log(errors);
   
    const[formvalue,setFormvalue]=useState({user_name:'',email:'',mobile:'',password:'',confirmpassword:'',dob:'',Country:'',gender:'male'})

    

    useEffect( () =>
  {
    
    getcountry()
        
  },[])


  const getcountry =async()=>
    {
      const responce=await fetch("https://kriyan-node-demo.onrender.com/api/v1/get-country",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
      });
      const jsondata = await responce.json();
      console.log(jsondata.data)
      setCountrydata(jsondata.data)



    }


    const handlecountry= async(e)=>
    {
      var inputCountryId = e.target.value;
      setCounrtyid(inputCountryId);
      
      if(inputCountryId!='')
      {
        const reqstatdata=await fetch("https://kriyan-node-demo.onrender.com/api/v1/get-state",{
          method: "POST",
          body: JSON.stringify({ country_id: inputCountryId}),
          headers: {
            Accept: "application/json",
            "content-type": "application/json",
          },
        })
        const resstatdata=await reqstatdata.json();
        console.log(resstatdata.status);
        if(reqstatdata.status){

          setStatedata(resstatdata.data.data);
          
        }
        else{
          alert("something went wrong")
        }
        setEnable(false);
        
      }
      else{
        setStatedata([]);
        setEnable(true)
      }
      
    }
    const handlestate = (e)=>{
      const getstateid=e.target.value;
      console.log(getstateid)
      setStateid(getstateid)
  
    }
    const handleinput = (e)=>
    {
      const{name,value}=e.target
      setFormvalue({...formvalue,[name]:value})
    }

          
    
    
  
    const onSubmit= async(data)=>
    {
     
      console.log(data)

     

        
        

        let res =await fetch("https://kriyan-node-demo.onrender.com/api/v1/add-user",{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(data)
        })
    
        let resjson=await res.json();
        console.log(resjson);
        if(res.status===200)
        {
          setMassage("user data inserted successfully")
            setTimeout(()=>
            {
                navigate('/Userdata');
            },2000)
        }
        else{
          setMassage("some error occured")
        }

        }
       

  const updetgender = (val) => {
    setFormvalue((prevState) => ({
        ...prevState,
        ...{"gender":val},
      }));
}





  
  return (
    <div className="container">
    <div className='row'>
    <h1>User Registration Form</h1>
       <p className='text-success'>{massage}</p>
       <section className='container my-2  bg-dark w-50 text-light p-4 '>
                            <form className="row g-1 p-2"  onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-6">
                            <label  className="form-label"><b>Username:</b></label>
                            <input type="text" className="form-control" {...register("user_name",{required:true,pattern: /^[a-zA-Z0-9_]+$/i})} />
                            <span className='text-danger'>
                                {errors.user_name?.type==="required" && " Name is Required"}
                                {errors.user_name?.type==="pattern" && "Enter Please Valid Username "}
                            </span>
                        </div>
                        <div className="col-md-6">
                            <label  className="form-label"><b>Email:</b></label>
                            <input type="text" {...register("email",{required:true,pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i})} className="form-control"/>
                            <span className='text-danger'>
                                {errors.email?.type==="required" && " Email is Required"}
                                {errors.email?.type==="pattern" && "Enter Please Valid Email "}
                            </span>
                        </div>
                        <div className="col-6">
                            <label  className="form-label"><b>Password:</b></label>
                            <input type="password"{...register("password",{required:true,minLength:6,maxLength:20,})} className="form-control"  />
                            <span className='text-danger'>
                                {errors.password?.type==="required" && " Password is Required"}
                                {errors.password?.type==="minLength" && "Enter Password is More then 6 Digits "}
                                {errors.password?.type==="maxLength" && "Enter Password is less then 20 Digits "}
                            </span>
                        </div>
                        <div className="col-6">
                            <label  className="form-label"><b>Confirm Password:</b></label>
                            <input type="password" className="form-control" {...register("confirmpassword", {required: true,validate: (val) => {if (watch('password') != val) {
                                                               return "Your passwords do no match";
                                                            }
                                                          },
                                                        })} />
                            <span className='text-danger'>
                                {errors.confirmpassword?.type==="required" && "Confirm Password is Required"}
                                {errors.confirmpassword?.type === "validate" && "Confirm Password doen't match"}
                            </span>
                        </div>

                        <div className="col-12">
                            <label className="form-label"style={{marginRight:"450px"}}><b>Mobile No:</b></label>
                            <input type="number" className="form-control" {...register("mobile",{required:true,minLength:10,maxLength:12})} />
                            <span className='text-danger'>
                                {errors.mobile?.type==="required" && " Phone Number is Required"}
                                
                                
                            </span>
                        </div>


                        <div className="col-12 mb-4">
                            <label  className="form-label" style={{marginRight:"450px"}}><b>Date Of Birth:</b></label>
                            <input type="date" className="form-control" {...register("dob",{required:true})}  />
                            <span className='text-danger'>
                                {errors.dob?.type==="required" && " Date of Birth is Required"}
                                
                            </span>
                        </div>

                        
                        <div className="col-md-6">
                            <label className="mb-2"><b>Country</b></label>
                  <select name="country" {...register("country",{required:true})} className="form-control p-2" onChange={(e)=>handlecountry(e)}>
                    <option value=''>---Select Country---</option>
                    {
                      countrydata.map((getcountry,i)=>(
                        <option key={i} value={getcountry.id}>{getcountry.name}</option>
                      ))
                    }

                  </select>
                  
                  <span className='text-danger'>
                                {errors.country?.type==="required" && " Country is Required"}
                                
                            </span>
                        </div>
                       

                        <div className="col-md-6">
                        <label className="mb-2"><b>State</b></label>
                  <select name="state"  {...register("state",{required:true})} className="form-control p-2" disabled={enable} onChange={(e)=>handlestate(e)}>
                    <option >---Select State---</option>
                    {
                      statedata.map((getstate,i)=>(
                        <option key={i} value={getstate.id}>{getstate.name}</option>
                      ))
                    }
                  </select>
                  <span className='text-danger'>
                                {errors.state?.type==="required" && " State is Required"}
                                
                            </span>
                        </div>

                        
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
                            </fieldset>
                            

                            


                        <div className="col-4">
                            <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="check" {...register("check",{required:true})} />
                            <span className='text-danger'>
                                {errors.check?.type==="required" && " Please Check Term & Condition"}
                                
                            </span>
                            <label className="form-check-label align-left" >
                                Tearms & Condition
                            </label>
                           
                            </div>
                        </div>
                        <div className="col-12 ">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                        </form>
       </section>
    </div>
    </div>
  )
}

export default Adduser
