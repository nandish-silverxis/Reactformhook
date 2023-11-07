import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Heder from "./commen/Header";
import { useDispatch,useSelector } from "react-redux";
import { getData } from "./Action";
import { updateData } from "./Action";






function Userdata() {

  const[userdata,setUserdata]=useState([]);
  const[massage,setMassage]=useState('')
  const navigate= useNavigate('')
  const[search,setSearch]=useState('')
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=> state.user.userInfo);

  


  useEffect(()=>
  {
    console.log(search)
    getUserdata()

  },[search]);
  // useEffect(()=>{
  //   setTimeout(() => {
  //     dispatch({
  //       type : 'UPDATE_USER_INFO', 
  //       payload : {...userInfo,...{"name":"Hinal"}}
  //     })
  //   }, 5000);
  // },[]);

  const getUserdata=async()=>
  {
    try{

      const reqData=await fetch("https://kriyan-node-demo.onrender.com/api/v1/get-user",{
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({search:search})
      })
    const resData=await reqData.json();
    setUserdata(resData.data)
    console.log(resData)
    }
    catch (error) {

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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
    
    }
  }

  const handeldelete = async(id )=>
    {
      if(conf()){
      let res = await fetch("https://kriyan-node-demo.onrender.com/api/v1/delete-user",{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id  })
      })

      let resjson = await res.json();
      if(res.status)
      {
        setMassage("user post deleted successfully");
        window.location.replace("/Userdata")
        setTimeout(() => {
          navigate("/Userdata");
          setMassage("");
        }, 2000);
        
      }
      else {
        setMassage("please check Data");
      }

    }
  }
    function conf() {
      var ret = window.confirm("Do you want to Delete?");
  
      if (ret == true) {
        return true;
      } else {
        return false;
      }
    }
    

   

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-12">

            <h1 className="mt-2" style={{color:"white"}}>Employee List</h1>
            <p className="text-success">{massage}</p>
            <form className="form-inline my-2 my-lg-0" >
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
    </form>
              <div className="d-grid d-md-flex justify-content-md-end mt-3 mb-3">
                
                    <Link to="/adduser" className="btn btn-warning"> Add New User </Link>
              </div>
            <table className="table table-bordered nanadish table-striped">
              <thead>
               
                <tr style={{color:"white"}}>
                  <th>Sr.no</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone No</th>
                  <th>Date Of Birth</th>
                  <th>Gender</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  userdata.map( (value,i)=>(
                  <tr key={i} >
                    <td style={{color:"yellow"}}>{i+1}</td>
                    <td style={{color:"yellow"}}>{value.name}</td>
                    <td style={{color:"yellow"}}>{value.email}</td>
                    <td style={{color:"yellow"}}>{value.mobile}</td>
                    <td style={{color:"yellow"}}>{value.dob}</td>
                    <td style={{color:"yellow"}}>{value.gender}</td>
                    <td>
                      <Link
                        to={"/Edituser/"+value.id }
                        className="btn btn-success mx-2"
                        onClick={() => localStorage.setItem("id", i)}
                        
                      >
                        Edit
                      </Link>
                      <Link className="btn btn-danger" onClick={()=> {
                        handeldelete(value.id)
                      }}>Delete</Link>
                    </td>
                  </tr>
                   ))
                    }
              </tbody>
            </table>
           
            


          </div>
        </div>
    </div>
  )
  
}

export default Userdata;
