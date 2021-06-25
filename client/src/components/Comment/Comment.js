import { useSelector } from "react-redux"
import { useState } from "react"
import { getElapsedTime } from "../GetElapsedTime"
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import CommentForm from "../CommentForm/CommentForm"
import { ReactComponent as CommentIcon } from "../../images/comment-icon.svg"
import "./Comment.scss"

const Comment = ({ comment }) => {

  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.post)
  const darkMode = useSelector((state) => state.darkMode)

  const [toggleCommentReply, setToggleCommentReply] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentBody, setEditCommentBody] = useState(comment.body ? comment.body : "");


  let createdAt = getElapsedTime(comment.created_at)


  const handleEditCommentFormSubmit = (e, id) => {
    const body = editCommentBody;

    // dispatch(startEditComment({ id, body }));
    setIsEditing(!isEditing)

    e.preventDefault();
  };


  return (
    <div className={`comment ${darkMode && 'dark'}`}>
      <div className="comment-main-section">
  <p className="comment-metadata">
          <span className="user">{"bill"}</span>
          {createdAt}
        </p>



        <div className="comment-body">
          { user && user.id === comment.author_id && isEditing ?
            <form className="edit-comment-form" onSubmit={(e) => {
              handleEditCommentFormSubmit(e, comment.id)}

            }>
              <textarea value={editCommentBody} onChange={(e) => setEditCommentBody(e.target.value)} />
              <div className="save-and-cancel">
                <button type="submit">Save</button>
                <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
              </div>
            </form>
            :
            <p className="comment-body-text">{comment.body}</p>
          }
        </div>



        { user &&
          <>
            <button className="reply-button" onClick={() => setToggleCommentReply(!toggleCommentReply)}><CommentIcon className="comment-icon"/> Reply</button>
            { toggleCommentReply &&
                <CommentForm
                  post={post}
                  parentComment={comment.id}
                />
            }
          </>
        }
      </div>
      


      {user && user.id === post.author_id && (
        <div className="commented-user-accessable-options">
          { !isEditing &&
            <button>
            <EditIcon
              className="edit-icon"
              onClick={() => setIsEditing(!isEditing)}
            />
          </button>
          }

          <button>
            <DeleteIcon
              className="delete-icon"
            /> 
          </button>
        </div>
      )}
    </div>
  )
}

export default Comment