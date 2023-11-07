import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


export default function Heder() {
  const navigate=useNavigate

  let user = JSON.parse(localStorage.getItem('user-info'))
  console.log(user)
 
  function logout()
  {
    localStorage.clear();
    navigate('/')

  }

  return (
    <div>
      <nav className="navbar">
  <div className="container-fluid">
    <div className="row">
     
        <h5 style={{marginTop:"50px"}}>Left Menu</h5>
      <ul className="navbar-nav">
       <li className='nav-item'><Link to="/Home" className="nav-link">Home</Link></li>
       <li className='nav-item'><Link to="/Userdata" className="nav-link">Employee List</Link></li>
       <li className='nav-item'><Link to="/" className="nav-link" onClick={logout}>Log Out</Link></li>

      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}
