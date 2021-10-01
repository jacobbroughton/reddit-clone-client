import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"
import { getElapsedTime } from "../../utilities/useElapsedTime";
import { startEditComment, deleteComment, commentThreadToggle, handleVote } from "../../actions/commentsActions";
import { ReactComponent as EditIcon } from "../../images/edit-icon.svg";
import { ReactComponent as DeleteIcon } from "../../images/delete-icon.svg";
import { ReactComponent as CommentIcon } from "../../images/comment-icon.svg";
import { ReactComponent as ExpandThreadIcon } from "../../images/expand.svg";

import CommentForm from "../CommentForm/CommentForm";
import VoteButtons from "../VoteButtons/VoteButtons";
import "./Comment.scss";
import ProfilePicture from "../ProfilePicture/ProfilePicture";

const Comment = ({ comment }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.post);
  const darkMode = useSelector((state) => state.darkMode);
  const comments = useSelector((state) => state.comments);
  const [toggleCommentReply, setToggleCommentReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCommentBody, setEditCommentBody] = useState();
  const [error, setError] = useState(null)


  let createdAt = getElapsedTime(comment.created_at);

  const handleEditCommentFormSubmit = (e, id) => {
    const body = editCommentBody;
    
    dispatch(startEditComment({ id, body }));
    setIsEditing(!isEditing);

    e.preventDefault();
  };  
  
  
  const handleThreadToggle = (comment) => {
    dispatch(commentThreadToggle(comment.id, !comment.threadToggle))
  };

  

  const getChildComments = (comments) => {

    return (
      comments.map(
        (eachComment, key) =>
          eachComment.parent_comment === comment.id && ( 
            <div className='nested-comment'>
              {!eachComment.threadToggle && 
              <button
                onClick={() => handleThreadToggle(eachComment)}
                className="replies-toggle"
              >
                  <ExpandThreadIcon className="expand-thread-icon"/>
                  Expand Thread
              </button>                
              }
              {eachComment.threadToggle && ( // toggle for hiding / showing reply thread
                <div className={`${key} bar-and-comment`}>
                  <div className="bar-parent">
                    <div
                      onClick={() => handleThreadToggle(eachComment)}
                      className="bar"
                    ></div>
                  </div>

                  <Comment key={key} comment={eachComment} />
                </div>
              )}
            </div>
          )
      )
    );
  };

  const handleVoteClick = (vote_value) => {

    if(!user) { 
      setError("You must log in to vote")
      setTimeout(() => setError(null), 4000)
      return
    }

    dispatch(handleVote(user.id, comment.id, vote_value))
  }

  useEffect(() => {
    setEditCommentBody(comment.body);
  }, [isEditing]);

  return (
    <div className={`comment-thread ${darkMode ? 'dark' : ''}`}>
      <div className='comment'>
      {/* <VoteButtons item={comment} handleVoteClick={handleVoteClick}/> */}
        {/* <div className="profile-picture"></div> */}
        <div className="comment-main-section">
        { error && <p className="vote-error">{error}</p> } 
          <p className="comment-metadata">
            <ProfilePicture size="small" source={comment.profile_picture}/>
            <span className="user">{comment.username}</span>
            <span className="time-ago">{createdAt}</span>
          </p>

          <div className="comment-body">
            {user && user.id === comment.author_id && isEditing ? (
              <form
                className="edit-comment-form"
                onSubmit={(e) => {
                  handleEditCommentFormSubmit(e, comment.id);
                }}
              >
                <textarea
                  value={editCommentBody}
                  onChange={(e) => setEditCommentBody(e.target.value)}
                />
                <div className="save-and-cancel">
                  <button type="submit">Save</button>
                  <button onClick={() => setIsEditing(!isEditing)}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <p className="comment-body-text">{comment.body}</p>
            )}
          </div>
          
          <div className="comment-buttons">
            <VoteButtons item={comment} handleVoteClick={handleVoteClick}/>          
            
            {user && <button
                className="reply-button"
                onClick={() => setToggleCommentReply(!toggleCommentReply)}
              >
                <CommentIcon className="comment-icon" /> Reply
              </button>
            }

            {user && 
            
            user.id === comment.author_id && (
              <>
                {!isEditing && (
                  <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
                    <EditIcon className="edit-icon" /> Edit
                  </button>
                )}

                <button className="delete-button" onClick={() => dispatch(deleteComment(comment.id))}>
                  <DeleteIcon className="delete-icon" /> Delete
                </button>
              </>
            )}
          </div>
          {toggleCommentReply && (
              <CommentForm
                post={post}
                parentComment={comment.id}
                setToggleCommentReply={setToggleCommentReply}
                alwaysOpen={false}
              />
            )}
          
          

        </div>
      </div>

      { getChildComments(comments) }
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object
}

export default Comment;
