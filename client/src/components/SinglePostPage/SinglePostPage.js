import "./SinglePostPage.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPost } from "../../actions/postActions"
import { getComments, resetComments } from "../../actions/commentsActions"
import CommentForm from "../CommentForm/CommentForm"
import Comment from "../Comment/Comment"
import Post from "../Post/Post"
// import { getElapsedTime } from "../GetElapsedTime";

const SinglePostPage = () => {

  const dispatch = useDispatch()
  const { postId } = useParams()

  const post = useSelector((state) => state.post);
  const darkMode = useSelector((state) => state.darkMode);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getPost(postId))
    dispatch(resetComments())
    dispatch(getComments(postId))
  }, [dispatch, postId])
  
  
  if(!post) return <h1>Loading</h1>
  return (
    <div className={`single-post-page ${darkMode && 'dark'}`}>
      <div className="single-post-page-container">
        <Post post={post}/>
        { user &&
          <CommentForm
            parentComment={null}
            post={post}
            alwaysOpen={true}
          />
        }
        { comments && 
        <div className="comments">
          { comments.map((comment, key) => {
            return !comment.parent_comment &&
              <Comment
                comment={comment}
                key={key}
              />
          })}
        </div>
        }

      </div>
    </div>
  )
}

export default SinglePostPage