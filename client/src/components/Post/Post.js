import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, startEditPost, deletePost } from "../../actions/postActions";
import { handleVote } from "../../actions/postListActions"
// import { deletePost } from "../../actions/postActions";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { getElapsedTime } from "../GetElapsedTime";
import "./Post.scss";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  // const postFromState = useSelector((state) => state.post)

  const [isEditing, setIsEditing] = useState(false);
  const [editPostBody, setEditPostBody] = useState(post ? post.body : "");
  const [error, setError] = useState(null)

  const dateCreated = getElapsedTime(post.created_at);

  const handleEditPostFormSubmit = (e, id) => {
    const body = editPostBody;

    dispatch(startEditPost({ id, body }));
    setIsEditing(!isEditing)

    e.preventDefault();
  };


  const handlePostDelete = () => {
    dispatch(deletePost(post, post.id))
  }

  const handleVoteClick = (vote_value) => {
    if(!user) { 
      setError("You must log in to vote")
      setTimeout(() => setError(null), 4000)
      return
    }

    dispatch(handleVote(user.id, post.id, vote_value))
  }


  return (
    <div className="post">
      <div className="votes-section">
        <button onClick={() => handleVoteClick(1)} className={`${post.has_voted === 1 ? 'selected' : ''} up-vote`}>⬆</button>
        <span className="votes-count">{post.votes && post.votes}</span>
        <button onClick={() => handleVoteClick(-1)} className={`${post.has_voted === -1 ? `selected` : ''} down-vote`}>⬇</button>
      </div>
      <div className="post-main-section">   
      { error && <p className="vote-error">{error}</p> }   
          <p className="post-metadata">
            <Link to={`/r/${post.subreddit_name}`} className="post-subreddit-link">r/{post.subreddit_name}</Link>
            <span className="posted-by-span">
            {post.id} Posted by <span className="user">u/{post.username && post.username}</span>
            </span>

            {dateCreated}
          </p>

        
        { post.post_type === "link" ?
          <a className="link-title" href={post.body}>{post.title}</a>
          :
          <div className="title-and-body">
            <Link
              to={`/r/${post.subreddit_name.replace(/\s+/g, "-").toLowerCase()}/${
                post.id
              }`}
              className="post-title"
              onClick={() => dispatch(setPost(post))}
            >
              {post.title}
            </Link>

            <div className="post-body">
              { user && user.id === post.author_id && isEditing ?
                <form className="edit-post-form" onSubmit={(e) => {
                  handleEditPostFormSubmit(e, post.id)}

                }>
                  <textarea value={editPostBody} onChange={(e) => setEditPostBody(e.target.value)} />
                  <div className="save-and-cancel">
                    <button disabled={post.body === editPostBody} type="submit">Save</button>
                    <button onClick={() => setIsEditing(!isEditing)}>Cancel</button>
                  </div>
                </form>
                :
                <p className="post-body-text">{ post.body }</p>
              }
            </div>

            
          </div>
        }
      </div>


      {user && user.id === post.author_id && (
        <div className="posted-user-accessable-options">
          { !isEditing &&
            <button
              onClick={() => setIsEditing(!isEditing)}>
              <EditIcon
                className="edit-icon"
              
              />
          </button>
          }

          <button
            onClick={() => handlePostDelete()}>
              <DeleteIcon
                className="delete-icon"
              /> 
          </button>
        </div>
      )}




    </div>
  );
};

export default Post;
