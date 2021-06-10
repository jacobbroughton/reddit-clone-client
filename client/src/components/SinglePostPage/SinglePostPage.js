import "./SinglePostPage.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPost } from "../../actions/postActions"
import Post from "../Post/Post"

const SinglePostPage = () => {

  const dispatch = useDispatch()
  const { postId } = useParams()

  const post = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(postId))
  }, [])

  
  if(!post) return <h1>Loading</h1>
  return (
    <div className="single-post-page">
      <div className="single-post-page-container">
        <Post post={post}></Post>
      </div>
    </div>
  )
}

export default SinglePostPage