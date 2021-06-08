import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../reducers/postReducer";
import "./Post.scss";

const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);

  let { postId } = useParams();

  useEffect(() => {
    if (!post) {
      dispatch(getPost(postId));
    }
  }, [post]);

  return (
    post && (
      <div>
        <h1>{post.title}</h1>
        <p>Posted on r/{post.subreddit_name}</p>
        <p>{post.created_at}</p>{" "}
      </div>
    )
  );
};

export default Post;
