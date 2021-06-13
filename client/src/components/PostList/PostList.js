import "./PostList.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getPosts } from "../../actions/postListActions";
import { setCurrentSubreddit } from "../../actions/subredditActions";
// import { setPost } from "../../reducers/postReducer"
import Post from "../Post/Post";

const PostList = () => {
  const dispatch = useDispatch();

  const darkMode = useSelector((state) => state.darkMode);
  const posts = useSelector((state) => state.postList);
  const currentSubreddit = useSelector((state) => state.currentSubreddit);
  const loading = useSelector((state) => state.loading);
  const { name } = useParams();


  // When { name } changes
  useEffect(() => {
    dispatch(getPosts(name));
  }, [name]);


  // Every render
  useEffect(() => {
      dispatch(setCurrentSubreddit(name));
      dispatch(getPosts(name));
  }, []);


  return (
    <div className={`post-list-main ${darkMode && "dark"}`}>
      <div className="post-list-container">
        <div className="post-list">
          {name ? <h1>{name}</h1> : <h1>Home</h1>}
          {loading ? (
            <p>Loading</p>
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
