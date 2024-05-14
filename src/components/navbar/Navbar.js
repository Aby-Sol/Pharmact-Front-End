import React from 'react'
import "./NavBar.css"
import { Link } from 'react-router-dom'
import { Context } from "../../context/Context";
import { useContext } from "react";

const PF = "http://localhost:5000/images/"
const Navbar = () => {
    const {user, dispatch}= useContext(Context)
  
    //Creating the function that handles the Logout
    const handleLogout = () =>{
        dispatch({type:"LOGOUT"})
    }

  return (
    <div className='Navbar'>
        <div className='LogoSpace'>
            <a href='/'><img className='Logo' src="https://scontent.ftun20-1.fna.fbcdn.net/v/t1.15752-9/438115800_1594828017724783_3894389129971119792_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QeOFNNSLYrcAb4Tu5fN&_nc_ht=scontent.ftun20-1.fna&oh=03_Q7cD1QF5zzBOX92eOLOFovLtVrr5cxIdk46cXLVhYYlhf_qqNA&oe=664FB7D3" alt="Logo"/></a>
        </div>
        {/* <div className='topLeft'>
            <i className="Socials fa-brands fa-facebook"></i>
            <i className="Socials fa-brands fa-instagram"></i>
            <i className="Socials fa-brands fa-twitter"></i>
            <i className="Socials fa-brands fa-pinterest"></i>        
            </div> */}
        <div className='topcenter'>
            <ul className='topList'>
                { user ? (<><li className='TopListItem'><Link className='link' to="/">HOME</Link></li>
                <li className='TopListItem'><Link className='link'to="/write">NEW POST</Link></li>
                <li className='TopListItem'><Link className='link'to="/about">ABOUT</Link></li>
                <li className='TopListItem'><Link className='link'to="/contact">CONTACT</Link></li>
                {/* <li className='TopListItem'><Link className='link'to="/categories">CATEGORIES</Link></li> */}
                </>) 
                :  //else
                (<><li className='TopListItem'><Link className='link' to="/">HOME</Link></li>
                <li className='TopListItem'><Link className='link'to="/about">ABOUT</Link></li>
                <li className='TopListItem'><Link className='link'to="/contact">CONTACT</Link></li>
                {/* <li className='TopListItem'><Link className='link'to="/categories">CATEGORIES</Link></li> */}
                </>)
                }
                
                
            </ul>
        </div>
        <div className='topRight'>
            { user ? 
           ( <>
           <Link to="/settings">
           {/* <img className='ProfilePicture'  alt="ProfilePicture" src={PF+user.profilePic}/>  */}
           <img className='ProfilePicture'  alt="ProfilePicture" src="https://pics.craiyon.com/2023-06-04/50f169348eb24ce0919dba8133c08ddc.webp"/> 

           </Link>
             <li className='Log topList' onClick={handleLogout}><Link Link className='link'to="/">LOGOUT</Link></li></>)
                : (
            <ul className='topList'>
             <li className='Log'><Link className='link'to="/login">LOGIN</Link></li>
             <li className='Log'><Link className='link'to="/register">REGISTER</Link></li>
             </ul>
            )}
            <i className="SearchIcon fa-solid fa-magnifying-glass"></i>
        </div>
    </div>
  )
}

export default Navbar