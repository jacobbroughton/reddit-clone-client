import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { addComment } from "../../actions/commentsActions"
// import { getElapsedTime } from "../GetElapsedTime"
import "./CommentForm.scss"

const CommentForm = ({ post, parentComment, setToggleCommentReply, alwaysOpen }) => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode);

  const [body, setBody] = useState("")

  const handleSubmit = (e) => {

    let comment = {
      body,
      author_id: user.id,
      postId: post.id,
      parentComment: parentComment,
      username: user.username
    }

    dispatch(addComment(comment))

    setBody("")

    e.preventDefault()
  }



  return (
    <div className={`user-comment ${darkMode && 'dark'}`}>
      <p>{alwaysOpen ? 'Comment as ' : 'Reply as '}<span>{ user.username }</span> </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What are your thoughts?"/>
        <button className="comment-button" type="submit">Comment</button>
        { !alwaysOpen && <button onClick={() => setToggleCommentReply()}>Cancel</button>}
      </form>
    </div>
  )
}

export default CommentForm