import "./PostList.scss"
import { useSelector, useDispatch } from "react-redux"
import { withRouter, Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAllPosts, getSubredditPosts } from "../../actions/postListActions"
// import { setPost } from "../../reducers/postReducer"
import Post from "../Post/Post"

const PostList = ({ currentSubreddit }) => {

  const dispatch = useDispatch()

  const darkMode = useSelector(state => state.darkMode)
  const posts = useSelector(state => state.postList)
  const user = useSelector(state => state.auth.user)
  const { name } = useParams()


  // useEffect(() => {
  //   dispatch(getAllPosts())
  // }, [])

  useEffect(() => {
    console.log(currentSubreddit)
    console.log(name)

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
              <Post 
                post={post} 
                // onClick={() => dispatch(setPost(post))}
                key={key}
              />
            )      
          }

        </div>

      </div>

    </div>
  )
}

export default withRouter(PostList)