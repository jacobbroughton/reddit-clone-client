import { useEffect } from "react"
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment"
import CommentsThread from "../CommentsThread/CommentsThread"
import "./CommentsList.scss"

const CommentsList = () => {

  const comments = useSelector((state) => state.comments);

  // useEffect(() => {
  //   console.log(comments[0])
  // }, [comments])

  // const getChildComments = (comment) => {
  //   return comments.filter(filteredComment => filteredComment.parent_comment === comment.id)
  // }

  
  return (
    <div className="comments-list">
      { comments.map((comment, key) => 
        !comment.parent_comment && 
        // <CommentsThread
        //   comment={comment}
        // />
        <Comment
          comment={comment}
        />
      )}
    </div>
  )
}

export default CommentsList