import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from "../commen/Header";
import Navlayout from "./Navlayout";






function AppLayout() {

  


  return (
    <div>
    <div>
    <Navlayout/>
  </div>
    <div className="hero3">
      
             <div className='leftpanel'>
      <Header/>
     
      </div>
      
      
        <Outlet/>
    </div>
    </div>
  )
  
}

export default AppLayout;
