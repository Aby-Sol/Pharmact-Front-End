import "./Post.css"
import {Link} from "react-router-dom"

export default function Post({post}) {
  // Define base URL for images
  const PF = "http://localhost:5000/images/";

  // Ensure post object exists before rendering
  if (!post) return null;

   // Destructure post objects
   const {  picture, categories, title, createdAt, description } = post;

  //Changing the date to the french format
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", options);



  return (
    <div className="post">

       {/* Render post image */}
      {/* <img className="postImg" src={PF + picture} alt="postimage" /> */}
      <img className="postImg" 
      src="https://www.shutterstock.com/image-illustration/pastel-color-medicine-pills-small-600nw-2326460823.jpg" 
      alt="postimage" />
  
        <div className="postInfo">
            <div className="postCats">
                {categories.map((category,index)=>(
                  <span key={index} className="postCat">{category}</span>
  
                ))}
            </div>

             {/* Render link to individual post */}
            <Link to={`/post/${post._id}`} className='link' >
               <span className="postTitle"> {title}  </span>
            </Link>
           
            <hr/>

            {/* Render formatted date */}
            <span className="postDate">{formattedDate}</span>
        </div>

         {/* Render post description */}
        <p className="postDesc">{description}</p>
        </div>

  )
}
