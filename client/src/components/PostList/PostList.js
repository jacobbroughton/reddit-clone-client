import "./PostList.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getAllPosts } from "../../reducers/postsReducer"

const PostList = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPosts())
  })

  return (
    <h1>Post List</h1>
  )
}

export default PostList