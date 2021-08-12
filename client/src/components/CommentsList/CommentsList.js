import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment"
import "./CommentsList.scss"

const CommentsList = () => {

  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);


  
  return (
    <div className="comments-list">
      { !comments  ? 
        !user &&  
          <p className="no-comments-prompt"> It's quiet here,&nbsp;
            <Link to="/login">login</Link> or <Link to="/register">register</Link> to leave a comment...
          </p>
      :
      comments.map((comment, key) => 
        !comment.parent_comment && 
        <Comment
          key={key}
          comment={comment}
        />
      )}
    </div>
  )
}

export default CommentsList