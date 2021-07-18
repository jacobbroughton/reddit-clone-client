import "./PostList.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../../actions/postListActions";
import { setCurrentSubreddit } from "../../actions/subredditActions";
// import { setPost } from "../../reducers/postReducer"
import Post from "../Post/Post";
// import { post } from "../../../../routers/postsRouter";

const PostList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode);
  const posts = useSelector((state) => state.postList);
  const loading = useSelector((state) => state.loading);
  const { name } = useParams();


  // When { name } changes
  useEffect(() => {
    // dispatch(getPosts(user ? user.id : null, name));
    dispatch(setCurrentSubreddit(name));
    dispatch(getPosts(user ? user.id : null, name));
  }, [name, user]);


  return (
    <div className={`post-list-main ${darkMode ? 'dark' : ''}`}>
      <div className="post-list-container">
        <div className="post-list">
          {name ? 
            <h1>
              <span className="rSpan">r/</span>{name}
            </h1> 
            : 
            <h1>Home</h1>}
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
