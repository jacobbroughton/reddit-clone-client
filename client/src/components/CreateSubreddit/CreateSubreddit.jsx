import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSubreddit } from "../../actions/subredditsActions"
import Meta from "../Meta"
import "./CreateSubreddit.scss"

const CreateSubreddit = () => {
  const [subredditName, setSubredditName] = useState("")
  const [subredditDescription, setSubredditDescription] = useState("")

  const dispatch = useDispatch()
  
  const user = useSelector((state) => state.auth.user)

  const handleSubmit = (e) => {
    if (subredditName !== "") {
      dispatch(createSubreddit(user.id, subredditName, subredditDescription))
    }
    e.preventDefault()
  }

  return (
    <div className={`create-subreddit`}>
      <Meta title={`Create a new subreddit`} />
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setSubredditName(e.target.value)}
          placeholder="Subreddit name"
        />
        <textarea
          onChange={(e) => setSubredditDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <button
          disabled={subredditName === ""}
          className={subredditName === "" ? "disabled" : ""}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateSubreddit
