import { useEffect, useState } from "react";
import axios from '../../http';
import "./Sidebar.css"
import { Link } from "react-router-dom";

export default function Sidebar() {

  const [cats,setCats] = useState([]);
  useEffect(()=>{
    const getCats = async () =>{
      const res = await axios.get('/categories')
      setCats(res.data)
    };
    getCats()
  },[])

  return (
    <div className="sidebar">
      <div className="SidebarItem">
        <span className="SidebarTitle">ABOUT ME</span>
        <img src="https://scontent.ftun20-1.fna.fbcdn.net/v/t1.15752-9/438115800_1594828017724783_3894389129971119792_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QeOFNNSLYrcAb4Tu5fN&_nc_ht=scontent.ftun20-1.fna&oh=03_Q7cD1QF5zzBOX92eOLOFovLtVrr5cxIdk46cXLVhYYlhf_qqNA&oe=664FB7D3" alt="Logo"/>
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum autem est ex quaerat quam enim sunt harum repudiandae ad sint tenetur et eveniet, cum, itaque repellat quisquam recusandae nostrum laboriosam.        
        </p>
        </div>
        <div className="SidebarItem">
        <span className="SidebarTitle">CATEGORIES</span>
        <ul className="SidebarList">
          {cats.map((c,index)=>(
            <Link to={`/?categories=${c.name}`} className="link" key={index}>
               <li className="SidebarListItem" key={index}>{c.name}</li>
            </Link>
          ))}   
        </ul>
        </div>
        <div className="SidebarItem">
          <span className="SidebarTitle">FOLLOW US</span>
          <div className="SidebarSocial">
            <i className="SidebarIcon fa-brands fa-instagram"></i>
            <i className="SidebarIcon fa-brands fa-facebook"></i>
            <i className="SidebarIcon fa-brands fa-twitter"></i>
            <i className="SidebarIcon fa-brands fa-pinterest"></i>      
          </div>
        </div>

      </div>
  )
}
