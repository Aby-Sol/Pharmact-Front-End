import "./Single.css"
import Sidebar from "../../components/sidebar/Sidebar"
import SinglePost from "../../components/singlePost/SinglePost"
export default function Single() {
  return (
    <div className="Single">
        <SinglePost/>
        <Sidebar/>

    </div>
  )
}
