import { useSelector } from "react-redux"
import { useState } from "react"
import { getElapsedTime } from "../GetElapsedTime"
import CommentForm from "../CommentForm/CommentForm"
import "./Comment.scss"

const Comment = ({ comment }) => {

  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.post)

  const [toggleCommentReply, setToggleCommentReply] = useState(false)


  let createdAt = getElapsedTime(comment.created_at)


  return (
    <div className="comment">
      <p>{comment.body}</p>
      <p>{comment.username}</p>
      <p>{createdAt}</p>
      { user &&
        <>
          <button onClick={() => setToggleCommentReply(!toggleCommentReply)}>Reply</button>
          { toggleCommentReply &&
              <CommentForm
                post={post}
                parentComment={comment.id}
              />
          }
        </>
      }
    </div>
  )
}

export default Comment