import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import he from "he"
import "./SubredditsSelect.scss"

const SubredditsSelect = () => {


  const history = useHistory()

  const subreddits = useSelector(state => state.subreddits)
  const currentSubreddit = useSelector(state => state.currentSubreddit)
  const darkMode = useSelector(state => state.darkMode)


  const generalSubreddits = subreddits.filter(subreddit => subreddit.user_id === 1)
  const userCreatedSubreddits = subreddits.filter(subreddit => subreddit.user_id !== 1)

  generalSubreddits.unshift({name: "Home"})


  const [allSubs, setAllSubs] = useState([])

  useEffect(() => {
    setAllSubs([
      {
        type: "General",
        includedSubreddits: generalSubreddits
      },
      {
        type: "User Created",
        includedSubreddits: userCreatedSubreddits
      }
    ])
  }, [subreddits])


  const handleSelect = (e) => {
    if(e.target.value === "Home") {
      history.push('/')
    } else {
      history.push(`/r/${e.target.value}`)
    }
    
  }

  if(!allSubs) return <p>Loading</p>

  return (
    <div className={`mobile-subreddit-selector ${darkMode ? 'dark' : ''}`}>
      <label>Select a subreddit</label>
      <select 
        value={currentSubreddit ? currentSubreddit.name : "Home"}
        label="Select a subreddit" 
        onChange={(e) => handleSelect(e)} 
        className="subreddits"
        >
        {allSubs.map((subObject, index) => 
          <optgroup label={subObject.type} key={index}>
            {subObject.includedSubreddits.map((sub, index) => 
              <option key={index}>{he.decode( sub.name)}</option>
            )}
          </optgroup>
        )}
      </select>
    </div>

  )
}

export default SubredditsSelect
