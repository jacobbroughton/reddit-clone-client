import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPost, startEditPost } from "../../actions/postActions";
import { deletePost } from "../../actions/postActions";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { getElapsedTime } from "../GetElapsedTime";
import "./Post.scss";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const postFromState = useSelector((state) => state.post)

  const [isEditing, setIsEditing] = useState(false);
  const [editPostBody, setEditPostBody] = useState(post ? post.body : "");

  const dateCreated = getElapsedTime(post.created_at);

  const handleEditPostFormSubmit = (e, id) => {
    const body = editPostBody;
    const idForEdit = id

    dispatch(startEditPost({ idForEdit, body }));
    setIsEditing(!isEditing)

    e.preventDefault();
  };

  useEffect(() => {
    console.log(postFromState)
    console.log(post)
  }, [])


  const handlePostDelete = () => {
    dispatch(deletePost(post, post.id))
  }


  return (
    <div className="post">
      <div className="post-main-section">      
          <p className="post-metadata">
            <span className="subreddit">r/{post.subreddit_name}</span>
            <span className="posted-by-span">
              Posted by <span className="user">u/{post.username && post.username}</span>
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
