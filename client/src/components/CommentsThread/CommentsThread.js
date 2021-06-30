import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../Comment/Comment"
import "./CommentsThread.scss"

const CommentsThread = ({ comments }) => {
  
  // const comments = useSelector((state) => state.comments);
  const [childComments, setChildComments] = useState([])

  // const getChildComments = (comment) => {
  //   return comments.filter(filteredComment => filteredComment.parent_comment === comment.id)
  // }

  // const hasNestedComments = getChildComments(comments) && comments.length


  const factorial = (n) => {
     
    // base case
    if(n === 1) return n

    // recursive case
    return n * factorial(n - 1)

  } 

  console.log(factorial(4))






  return (
    <div className="comments-thread">
      
    </div>
  )
}

export default CommentsThread