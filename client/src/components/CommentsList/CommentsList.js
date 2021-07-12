import { useEffect } from "react"
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment"
import "./CommentsList.scss"

const CommentsList = () => {

  const comments = useSelector((state) => state.comments);

  useEffect(() => {
    console.log(comments)
  }, [comments])

  
  return (
    <div className="comments-list">
      { comments.map((comment, key) => 
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