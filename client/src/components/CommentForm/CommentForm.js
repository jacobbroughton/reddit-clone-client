import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { addComment } from "../../actions/commentsActions"
import moment from "moment"
import "./CommentForm.scss"

const CommentForm = ({ post }) => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode);

  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    let dateNow = moment().format("MMMM Do YYYY");

    let comment = {
      body,
      authorId: user.id,
      postId: post.id,
      parentComment: null,
      createdAt: dateNow,
      updatedAt: dateNow
    }

    dispatch(addComment(comment))

    e.preventDefault()
  }

  return (
    <div className={`user-comment ${darkMode && 'dark'}`}>
      <p>Comment as <span>{ user.username }</span> </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea onChange={(e) => setBody(e.target.value)} placeholder="What are your thoughts?"/>
        <button type="submit">Comment</button>
      </form>
    </div>
  )
}

export default CommentForm