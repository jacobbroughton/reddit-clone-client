import "./PostList.scss"
import { useSelector, useDispatch } from "react-redux"
import { withRouter, useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { getPosts } from "../../actions/postListActions"
import { search } from "../../actions/searchActions"
import { setCurrentSubreddit } from "../../actions/subredditActions"
import { useQuery } from "../../utilities/useQuery"
import Post from "../Post/Post"
import SubredditsSelect from "../SubredditsSelect/SubredditsSelect"
import CurrentSubredditBanner from "../CurrentSubredditBanner/CurrentSubredditBanner"
import Loading from "../Loading/Loading"
import NoPostsPrompt from "../NoPostsPrompt/NoPostsPrompt"
import { setPost } from "../../actions/postActions"

const PostList = () => {
  const dispatch = useDispatch()
  const searchQuery = useQuery()

  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector((state) => state.darkMode)
  const posts = useSelector((state) => state.postList)
  const loading = useSelector((state) => state.loading)
  const post = useSelector((state) => state.post)
  const { GET_POSTS: getPostsError } = useSelector((state) => state.error)
  const { name } = useParams()

  useEffect(() => {
    console.log(getPostsError)
    if (post) {
      dispatch(setPost(null))
    }
  }, [])

  useEffect(() => {
    dispatch(setCurrentSubreddit(name ? name : null))

    if (searchQuery) {
      dispatch(search(user?.id, name, searchQuery))
    } else {
      dispatch(getPosts(user ? user.id : null, name ? name : null))
    }
  }, [searchQuery, name, user])

  return (
    <div className={`post-list-main ${darkMode ? "dark" : ""}`}>
      <SubredditsSelect />
      <CurrentSubredditBanner name={name} user={user} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="post-list-container">
            <div className="post-list">
              <>
                {posts.length > 0 ? (
                  posts.map((post, key) => <Post post={post} key={key} />)
                ) : (
                  <NoPostsPrompt user={user} darkMode={darkMode} />
                )}
              </>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default withRouter(PostList)
