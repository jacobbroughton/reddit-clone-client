import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { createPost } from "../../../redux/actions/postListActions";
import Meta from "../../ui/Meta";
import he from "he";
import "./NewPost.scss";

const NewPost = () => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const auth = useSelector((state) => state.auth);
  const subreddits = useSelector((state) => state.subreddits);
  const currentSubreddit = useSelector((state) => state.currentSubreddit);

  const [postType, setPostType] = useState(new URLSearchParams(search).get("type"));
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [subreddit, setSubreddit] = useState(null);

  const handleSubmit = (e) => {
    console.log(postType);

    const post = {
      postType,
      title,
      body: postType === "text" ? body : url,
      authorId: auth.user.id,
      subredditId: subreddit.id,
      subredditName: subreddit.name,
    };

    dispatch(createPost(post));
    e.preventDefault();
  };

  useEffect(() => {
    setPostType(new URLSearchParams(search).get("type"));
  }, [search]);

  useEffect(() => {
    if (postType === "Text") {
      setUrl("");
    }
  }, [postType]);

  useEffect(() => {
    if (subreddits.length > 0) {
      setSubreddit(currentSubreddit && currentSubreddit);
    }
  }, [subreddits, currentSubreddit]);

  const handleSubredditChange = (selectValue) => {
    console.log(selectValue);
    console.log(subreddits);
    setSubreddit(subreddits.filter((sub) => he.decode(sub.name) === selectValue)[0]);
  };

  return (
    <div className={`new-post`}>
      <Meta title={`Create a new ${postType} post`} />
      <div className="new-post-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h3>Create a New Post</h3>
          <div className="both-radio-inputs">
            <p>Select the type of post you'd like to create</p>
            <div className="post-type-buttons">
              <Link
                to={"/new-post?type=text"}
                className={`post-type-button ${postType === "text" ? "clicked" : ""}`}
                value={"text"}
                type="button"
              >
                Text
              </Link>
              <Link
                to={"/new-post?type=link"}
                className={`post-type-button  ${postType === "link" ? "clicked" : ""}`}
                value={"link"}
                type="button"
              >
                Link
              </Link>
            </div>
          </div>
          <input
            className="new-post-input"
            placeholder="Title (required)"
            onChange={(e) => setTitle(e.target.value)}
          />
          {postType === "text" ? (
            <>
              <textarea
                className="new-post-input"
                placeholder="Text (optional)"
                onChange={(e) => setBody(e.target.value)}
              />
            </>
          ) : (
            <>
              <input
                type="url"
                className="new-post-input"
                placeholder="URL (required)"
                onChange={(e) => setUrl(e.target.value)}
              />
            </>
          )}
          <select
            defaultValue={currentSubreddit && currentSubreddit.name}
            onChange={(e) => handleSubredditChange(e.target.value)}
          >
            <option disabled selected value>
              {" "}
              Select a subreddit{" "}
            </option>
            {subreddits.map((subreddit, key) => (
              <option key={key}>{he.decode(subreddit.name)}</option>
            ))}
          </select>
          <button
            disabled={title === "" || !subreddit}
            className="new-post-submit"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
