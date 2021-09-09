import "./PostList.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getPosts } from "../../actions/postListActions";
import { setCurrentSubreddit } from "../../actions/subredditActions";
import { useQuery } from "../useQuery"

// import { setPost } from "../../reducers/postReducer"
import Post from "../Post/Post";
import SubredditsSelect from "../SubredditsSelect/SubredditsSelect";
import CurrentSubredditBanner from "../CurrentSubredditBanner/CurrentSubredditBanner"
// import { post } from "../../../../routers/postsRouter";

const PostList = () => {
  const dispatch = useDispatch();
  const query = useQuery()

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode);
  const posts = useSelector((state) => state.postList);
  const loading = useSelector((state) => state.loading);
  const { name } = useParams();

  let searchQueryFromURL = query.get("q");

  useEffect(() => {
    if(!searchQueryFromURL) {
      dispatch(getPosts(user ? user.id : null, name ? name : null));
    }
  }, [searchQueryFromURL])

  // When { name } changes
  useEffect(() => {

    if(searchQueryFromURL) {
      // dispatch(setCurrentSubreddit(name ? name : null));
      return 
    } else {
      dispatch(getPosts(user ? user.id : null, name ? name : null));
      // dispatch(setCurrentSubreddit(name ? name : null));
    }
    // dispatch(getPosts(user ? user.id : null, name ? name : null));
    // dispatch(setCurrentSubreddit(name ? name : null));
    // dispatch(getPosts(user ? user.id : null, name ? name : null));
  }, [name, user]);

  useEffect(() => {
    dispatch(setCurrentSubreddit(name ? name : null))
  }, [name])


  return (
    <div className={`post-list-main ${darkMode ? 'dark' : ''}`}>
      <SubredditsSelect/>
      <div className="post-list-container">
        <div className="post-list">
          <CurrentSubredditBanner name={name} user={user}/>
          {loading ? (
            <p className="loading">Loading</p>
          ) : (
            <>
              {posts.map((post, key) => (
                <Post
                  post={post}
                  key={key}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostList);
