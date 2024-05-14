import { useContext } from "react";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Settings from "./Pages/settings/Settings";
import Single from "./Pages/single/Single";
import Write from "./Pages/write/Write";
import Navbar from "./components/navbar/Navbar";
import {Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";


function App() {

  const user= useContext(Context) ;
  const connected = user.connected
  console.log(connected)
  return (
  <>
    <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register"  element={connected ? <Home/> : <Register/>}/>
    <Route path="/settings" element={user ? <Settings/> : <Register/>}/>
    <Route path="/write" element={<Write/>}/>
    <Route path="/post/:postId" element={<Single/>}/>
  </Routes>
  </>

    
   
  
  );
}

export default App;
