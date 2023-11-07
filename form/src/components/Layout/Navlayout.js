import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Navlayout() {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const dispatch = useDispatch();
    const userInfo = useSelector((state)=> state.user.userInfo);
    console.log(userInfo)
    useEffect(()=>{
      if(user)
      {
        
        dispatch({
          type : 'UPDATE_USER_INFO', 
          payload : user
        })
      }
    },[]);
  
  return (
    <div >
    {<nav class="navbar navbar-dark bg-dark" >
<div  >
 <Link to={"/Editprofile"}>
 <img style={{height:"50px",borderRadius:"10px",marginLeft:"1170px",marginTop:'20px'}} src='/profile2.jpg'></img>
 </Link>
 <div style={{width:"100px",marginLeft:"1300px",marginTop:"-30px"}}>
 {userInfo &&
        <span style={{color:'white',}}>{userInfo.name}</span> 
      }

 </div>

</div>

</nav> }

    </div>
  )
}

export default Navlayout
