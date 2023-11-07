import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { useDispatch, useSelector } from "react-redux";
import { getData, updateData } from './components/Action';
import Userdata from './components/Userdata';
import { Routes,Route } from 'react-router-dom';
import Adduser from './components/Adduser';
import Edituser from './components/Edituser';
import Login from './components/Login';
import Signup from './components/Signup';
import AppLayout from './components/Layout/AppLayout';
import Loginlayout from './components/Layout/Loginlayout';
import { useEffect } from 'react';
import Editprofile from './components/Editprofile';


function App() {


  

  return (
    <div className="App">
      
        <div className='rightpanel'>
        <Routes >
          
          <Route element={<AppLayout/>}>
            <Route path='/Userdata' element={<Userdata/>}></Route>
            <Route path='/adduser' element={<Adduser/>}></Route>
          <Route path='/Edituser/:id' element={<Edituser/>}></Route>
          <Route path='/Editprofile' element={<Editprofile/>}></Route>
         
          </Route>

      <Route element={<Loginlayout/>}>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          </Route>
          <Route path='/Home' element={<Home/>}></Route>
        </Routes>

       
      
      </div>
      <div>
      </div>
      
    </div>
  );
}

export default App;
