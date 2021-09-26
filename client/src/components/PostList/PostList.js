import "./PostList.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { getPosts } from "../../actions/postListActions";
import { search } from "../../actions/searchActions";
import { setCurrentSubreddit } from "../../actions/subredditActions";
import { useQuery } from "../useQuery";
import Post from "../Post/Post";
import SubredditsSelect from "../SubredditsSelect/SubredditsSelect";
import CurrentSubredditBanner from "../CurrentSubredditBanner/CurrentSubredditBanner";
import Loading from "../Loading/Loading";
import NoPostsPrompt from "../NoPostsPrompt/NoPostsPrompt";

const PostList = () => {
  const dispatch = useDispatch();
  const query = useQuery();

  const user = useSelector((state) => state.auth.user);
  const darkMode = useSelector((state) => state.darkMode);
  const posts = useSelector((state) => state.postList);
  const loading = useSelector((state) => state.loading);
  const { name } = useParams();

  let searchQueryFromURL = query.get("q");

  useEffect(() => {
    dispatch(setCurrentSubreddit(name ? name : null));

    if (searchQueryFromURL) {
      console.log("Search: " + searchQueryFromURL);
      dispatch(search(user?.id, name, searchQueryFromURL));
    } else {
      dispatch(getPosts(user ? user.id : null, name ? name : null));
    }
  }, [searchQueryFromURL, name, user]);

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
                {posts.length > 0 ? 
                  posts.map((post, key) => <Post post={post} key={key} />)
                  : 
                  <NoPostsPrompt user={user} darkMode={darkMode}/>
                }
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default withRouter(PostList);
