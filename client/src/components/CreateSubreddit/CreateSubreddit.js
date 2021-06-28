import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createSubreddit } from "../../actions/subredditsActions"
import "./CreateSubreddit.scss"

const CreateSubreddit = () => {

  const [subredditName, setSubredditName] = useState("")
  const [subredditDescription, setSubredditDescription] = useState("")

  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)


  const handleSubmit = (e) => {
    dispatch(createSubreddit(subredditName, subredditDescription))

    // dispatch(getSubreddits())

    e.preventDefault()
  }


  return (
    <div className={`create-subreddit ${darkMode && 'dark'}`}>
      
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={e => setSubredditName(e.target.value)} placeholder="Subreddit name"/>
        <textarea onChange={e => setSubredditDescription(e.target.value)} placeholder="Description (optional)"/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateSubreddit