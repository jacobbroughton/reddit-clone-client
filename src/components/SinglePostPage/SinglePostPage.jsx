import "./SinglePostPage.scss"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPost } from "../../actions/postActions"
import { getComments, resetComments } from "../../actions/commentsActions"
import CommentForm from "../CommentForm/CommentForm"
import CommentsList from "../CommentsList/CommentsList"
import Post from "../Post/Post"
import Loading from "../Loading/Loading"
import useBrowserResize from "../../utilities/useBrowserResize"
import LogInPrompt from "../LogInPrompt/LogInPrompt"
import SubredditsSelect from "../SubredditsSelect/SubredditsSelect"
import BackDark from "../../images/back-dark.png"
import BackLight from "../../images/back-light.png"
import { motion } from "framer-motion"

const SinglePostPage = () => {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const { width } = useBrowserResize()


  const post = useSelector((state) => state.post)
  const theme = useSelector(state => state.theme)
  const comments = useSelector((state) => state.comments)
  const loading = useSelector((state) => state.loading)
  const currentSubreddit = useSelector((state) => state.currentSubreddit)
  const user = useSelector((state) => state.auth.user)

  // const location = useLocation();
  // const subredditName = location.pathname.match(/r\/[^/]+/);

  const [showingSubredditSelect, setShowingSubredditSelect] = useState(false)

  useEffect(() => {
    dispatch(getPost(postId, user ? user.id : null))
    dispatch(resetComments())
    dispatch(getComments(postId, user ? user.id : null))
  }, [dispatch, postId])

  useEffect(() => {
    console.log("theme")
    if (width <= 767) {
      setShowingSubredditSelect(true)
    } else {
      setShowingSubredditSelect(false)
    }
  }, [width, theme])

  return (
    <motion.div
      className={`single-post-page  `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {showingSubredditSelect && (
        <div className="back-button-and-subreddit-select">
          <Link
            to={currentSubreddit ? `/r/${currentSubreddit.name}` : "/"}
            className="back-button"
          >
            <img className="back-icon" src={theme ? BackLight : BackDark} />
          </Link>
          <SubredditsSelect />
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        post && (
          <div className="single-post-page-container">
            <Post post={post} single={true} />

            {user ? (
              post && (
                <CommentForm
                  parentComment={null}
                  post={post}
                  alwaysOpen={true}
                />
              )
            ) : (
              <LogInPrompt actionText="comment" />
            )}
            {comments.length > 0 && <CommentsList />}
          </div>
        )
      )}
    </motion.div>
  )
}

export default SinglePostPage
