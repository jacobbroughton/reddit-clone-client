import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react"
import PropTypes from "prop-types"
import { addComment } from "../../actions/commentsActions"
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
      post_id: post.id,
      parent_comment: parentComment,
      username: user.username
    }

    dispatch(addComment(comment))

    setBody("")

    e.preventDefault()
  }



  return (
    <div className={`user-comment ${darkMode ? 'dark' : ''}`}>
      <p>{alwaysOpen ? 'Comment as ' : 'Reply as '}<span>{ user.username }</span> </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder={alwaysOpen ? 'What are your thoughts?' : 'Your thoughts?'}/>
        <button disabled={body === ""} className='comment-button' type="submit">Comment</button>
        { !alwaysOpen && <button className="cancel-button" onClick={() => setToggleCommentReply()}>Cancel</button>}
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object,
  parentComment: PropTypes.number,
  setToggleCommentReply: PropTypes.func,
  alwaysOpen: PropTypes.bool
}

export default CommentForm