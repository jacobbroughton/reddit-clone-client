import { useParams } from "react-router-dom"
import "./Post.scss"

const Post = () => {

  const { postId } = useParams()

  console.log(postId)

  return (
    <div>Post</div>
  )
}

export default Post