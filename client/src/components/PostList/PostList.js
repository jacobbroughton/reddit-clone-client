import "./PostList.scss"
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllPosts, getSubredditPosts } from "../../reducers/postListReducer"
import { setPost } from "../../reducers/postReducer"

const PostList = ({ currentSubreddit }) => {

  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)
  const posts = useSelector(state => state.postList)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  useEffect(() => {
    if (currentSubreddit) {
      dispatch(getSubredditPosts(currentSubreddit.id))
    } else {
      dispatch(getAllPosts())
    }
  }, [currentSubreddit])



  return (
    <div className={`post-list-main ${darkMode && 'dark'}`}>
      <div className="post-list-container">
        <div className="post-list">
          { currentSubreddit ? <h1>{currentSubreddit.name}</h1> : <h1>Home</h1>}
          <p>Showing {posts.length} posts</p>
          
          { 
            posts.map((post, key) => 
            <Link 
              to={`/r/${post.subreddit_name.replace(/\s+/g, '-').toLowerCase()}/${post.id}`} 
              key={key} 
              className="post-link"
              // onClick={() => dispatch(setPost(post))}
              >
                <div className="post"
                onClick={() => dispatch(setPost(post))}
                >
                  
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-body">{post.body}</p>
                  <p>r/{post.subreddit_name}</p>
                  <p className="post-created-at">{post.created_at}</p>
                </div>
              </Link>  
            )      
          }

        </div>

      </div>

    </div>
  )
}

export default withRouter(PostList)