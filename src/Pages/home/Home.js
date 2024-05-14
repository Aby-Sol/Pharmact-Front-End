import {useEffect,useState} from "react";
import Posts from '../../components/Posts/Posts'
import Header from '../../components//header/Header'
import Sidebar from '../../components//sidebar/Sidebar'
import './Home.css'
import axios from '../../http';
import { useLocation } from "react-router-dom";

const Home = () => {

 //Using location to find a specific username/category
  const {search} = useLocation()

  //Using axios to fetch the posts
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async () =>{
      try{
      const res = await axios.get("/posts" + search )
      setPosts (res.data)
    }
      catch (error){
        console.error(error.response.data)
      }
    }
    fetchPosts()
    },[search])
  
  return (
    <> 
      <Header/>
      <div className='Home'>
        <Posts posts={posts}/>
        <Sidebar/>
      </div>
    </>
   
  )
}
export default Home