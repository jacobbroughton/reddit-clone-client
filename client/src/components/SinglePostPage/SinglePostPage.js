import "./SinglePostPage.scss"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react"
import { useParams, Link, useLocation } from "react-router-dom"
import { getPost } from "../../actions/postActions"
import { getComments, resetComments } from "../../actions/commentsActions"
import CommentForm from "../CommentForm/CommentForm"
import Comment from "../Comment/Comment"
import CommentsList from "../CommentsList/CommentsList"
import Post from "../Post/Post"
// import { getElapsedTime } from "../GetElapsedTime";

const SinglePostPage = () => {

  const dispatch = useDispatch()
  const { postId } = useParams()

  const post = useSelector((state) => state.post);
  const darkMode = useSelector((state) => state.darkMode);
  const comments = useSelector((state) => state.comments);
  const user = useSelector((state) => state.auth.user);
  const currentSubreddit = useSelector((state) => state.auth.currentSubreddit);

  const location = useLocation()
  const subredditName = location.pathname.match(/r\/[^\/]+/)


  useEffect(() => {
    dispatch(getPost(postId, user.id ? user.id : null))
    dispatch(resetComments())
    dispatch(getComments(postId))
  }, [dispatch, postId])
  
  
  return (
    <div className={`single-post-page ${darkMode ? 'dark' : ''}`}>
      <div className="single-post-page-container">
        {post ? 
        <Post post={post}/> 
        : 
        <p className="post-not-found-p">
          Post not found, return to
          <Link className="post-not-found-link" to={subredditName ? `/${subredditName[0]}` : '/'}>{subredditName ? `${subredditName}` : 'Home'}</Link>
        </p>
        }
        { user && post &&
          <CommentForm
            parentComment={null}
            post={post}
            alwaysOpen={true}
          />
        }
        { comments && 
          <CommentsList/>
        }

      </div>
    </div>
  )
}

export default SinglePostPage