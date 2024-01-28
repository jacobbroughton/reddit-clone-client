import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, startEditPost, deletePost } from "../../../redux/actions/postActions";
import { handleVote } from "../../../redux/actions/postListActions";
import { handleSinglePostVote } from "../../../redux/actions/postActions";
// import { ReactComponent as EditIcon } from "../../../images/edit-icon.svg";
// import { ReactComponent as DeleteIcon } from "../../../images/delete-icon.svg";
import EditIcon from "../icons/EditIcon"
import DeleteIcon from "../icons/DeleteIcon"
import { getElapsedTime } from "../../../utils/useElapsedTime";
import VoteButtons from "../../ui/VoteButtons/VoteButtons";
import Meta from "../Meta";
import he from "he";
import { motion } from "framer-motion";
import "./Post.scss";

const Post = ({ post, single }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);

  const currentSubreddit = useSelector((state) => state.currentSubreddit);

  const [isEditing, setIsEditing] = useState(false);
  const [editPostBody, setEditPostBody] = useState(post ? post.body : "");
  const [error, setError] = useState(null);
  const dateCreated = getElapsedTime(post.created_at);

  const handleEditPostFormSubmit = (e, id) => {
    const body = editPostBody;

    dispatch(startEditPost({ id, body }));
    setIsEditing(!isEditing);

    e.preventDefault();
  };

  const handlePostDelete = () => {
    dispatch(deletePost(post, post.id));

    if (single) history.push(currentSubreddit ? `/r/${currentSubreddit.name}` : "/");
  };

  const handleVoteClick = (vote_value) => {
    if (!user) {
      setError("You must log in to vote");
      setTimeout(() => setError(null), 4000);
      return;
    }

    if (single) {
      dispatch(handleSinglePostVote(user.id, post.id, vote_value));
    } else {
      dispatch(handleVote(user.id, post.id, vote_value));
    }
  };

  return (
    <motion.div
      className="post"
      initial={single ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      edit={single ? { opacity: 1 } : { opacity: 0 }}
    >
      {single && <Meta title={post.title} />}
      <VoteButtons item={post} handleVoteClick={handleVoteClick} />
      <div className="post-main-section">
        {error && <p className="vote-error">{error}</p>}
        <p className="post-metadata">
          <Link
            to={`/r/${he.decode(post.subreddit_name)}`}
            className="post-subreddit-link"
          >
            r/{he.decode(post.subreddit_name)}
          </Link>
          <span className="posted-by-span">
            Posted by <span className="user">u/{post.username && post.username}</span>
          </span>

          <span className="time-ago-span">{dateCreated}</span>
        </p>

        {post.post_type === "link" ? (
          <a className="link-title" href={post.body}>
            {he.decode(post.title)}
          </a>
        ) : (
          <div className="title-and-body">
            <Link
              to={`/r/${he.decode(post.subreddit_name.replace(/\s+/g, "-"))}/${post.id}`}
              className="post-title"
              onClick={() => dispatch(setPost(post))}
            >
              {he.decode(post.title)}
            </Link>

            <div className="post-body">
              {user && user.id === post.author_id && isEditing ? (
                <form
                  className="edit-post-form"
                  onSubmit={(e) => {
                    handleEditPostFormSubmit(e, post.id);
                  }}
                >
                  <textarea
                    value={editPostBody}
                    onChange={(e) => setEditPostBody(e.target.value)}
                  />
                  <div className="save-and-cancel">
                    <button disabled={post.body === editPostBody} type="submit">
                      Save
                    </button>
                    <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                  </div>
                </form>
              ) : (
                <p className="post-body-text">{he.decode(post.body)}</p>
              )}
            </div>
          </div>
        )}

        {user && user.id === post.author_id && (
          <div className="posted-user-accessable-options">
            {!isEditing && (
              <button onClick={() => setIsEditing(!isEditing)}>
                <EditIcon />
                Edit
              </button>
            )}

            <button onClick={() => handlePostDelete()}>
              <DeleteIcon />
              Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  single: PropTypes.bool,
};

export default Post;
