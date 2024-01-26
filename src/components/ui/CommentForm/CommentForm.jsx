import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import PropTypes from "prop-types"
import { addComment } from "../../../redux/actions/commentsActions"
import "./CommentForm.scss"

const CommentForm = ({
  post,
  parentComment,
  setToggleCommentReply,
  alwaysOpen,
}) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)
  

  const [body, setBody] = useState("")

  const handleSubmit = (e) => {
    let comment = {
      body,
      author_id: user.id,
      post_id: post.id,
      parent_comment: parentComment,
      username: user.username,
      profile_picture: user.profile_picture,
    }

    dispatch(addComment(comment))

    setBody("")

    e.preventDefault()
  }

  return (
    <div className={`user-comment`}>
      <p>
        {alwaysOpen ? "Comment as " : "Reply as "}
        <span>{user.username}</span>{" "}
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder={
            alwaysOpen ? "What are your thoughts?" : "Your thoughts?"
          }
        />
        <button className="comment-button" type="submit" disabled={body.length === 0}>
          Comment
        </button>
        {!alwaysOpen && (
          <button
            className="cancel-button"
            onClick={() => setToggleCommentReply()}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object,
  parentComment: PropTypes.number,
  setToggleCommentReply: PropTypes.func,
  alwaysOpen: PropTypes.bool,
}

export default CommentForm
