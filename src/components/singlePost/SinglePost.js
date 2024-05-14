import { Link, useLocation } from "react-router-dom"
import {useContext, useEffect,useState} from "react";
import axios from '../../http';
import { Context } from "../../context/Context";
import "./SinglePost.css";


const PF = "http://localhost:5000/images/"

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(Context);

  useEffect(() => {
      const fetchPost = async () => {
          const res = await axios.get("/posts/" + path);
          setPost(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCategories(res.data.categories);
          console.log(categories.map)
        };
      fetchPost();
  }, [path]);


  //Deleting a post
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your post?");
    if (confirmed) {
      try {
          await axios.delete("/posts/" + path, { data: { username: user.username } });
          window.location.replace("/");
      } catch (error) {
          console.error("Error deleting post:", error);
      }
  }};


  //Updating a post
  const handleUpdate = async () => {
      try {
          const formData = new FormData();
          if (file) {
              formData.append("file", file);
          }
          formData.append("title", title);
          formData.append("description", description);
          formData.append("username", user.username);

          await axios.put(`/posts/${post._id}`, formData);
          setUpdateMode(false);
      } catch (err) {
          console.error("Error updating post:", err);
      }
  };

  return (
      <div className="singlePost">
          <div className="singlePostWrapper">
              {updateMode ? (
                  <>
                      <label htmlFor="fileInput">
                          <i className="writeIcon fa-solid fa-plus"></i>
                      </label>
                      <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                      {file && (
                        <img src={URL.createObjectURL(file)} alt="PostImage" className="singlePostImg" />
                      )}
                  </>
              ) : (
                //   <img src={PF + post.picture} alt="Postimage" className="singlePostImg" />
                  <img src="https://img.freepik.com/premium-photo/pink-capsule-pills-pink-background-pharmaceutical-industry-health-medicine-pharmacy-banner-pills-love-treatment-care-love-online-pharmacy-background-vitamins-supplements_33867-1861.jpg" alt="Postimage" className="singlePostImg" />
              )}

              {updateMode ? (
                  <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} />
              ) : (
                  <h1 className="singlePostTitle">{title}
                      {post.username === user?.username && (
                          <div className="singlePostEdit">
                              <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                              <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                          </div>
                      )}
                  </h1>
              )}

              <div className="singlePostInfo">
                  <span className="SinglePostAuthor"> Auteur: 
                      <Link to={`/?user=${post.username}`} className="link">
                          <b> {post.username}</b>
                      </Link>
                  </span>
                 
                  <span className="SinglePostDate"> {new Date(post.createdAt).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              {updateMode ?
                  <></>
                    : <span className="SinglePostCategory"> Catégorie(s): 
                    {categories.map ((category) =>(
                      <Link to={`/?categories=${category}`} className="link">
                      <b> {category},</b>
                  </Link>  
                    ))}
                  
                    </span>
                  }
              {updateMode ? (
                  <textarea type="text" value={description} className="singlePostDescInput" onChange={(e) => setDescription(e.target.value)} />
              ) : (
                  <p className="singlePostDesc">{description}</p>
              )}
              {updateMode && (
                  <button className="singlePostButton" onClick={handleUpdate}>
                      Update
                  </button>
              )}
          </div>
      </div>
  );
}