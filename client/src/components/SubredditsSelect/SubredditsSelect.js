import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import "./SubredditsSelect.scss"

const SubredditsSelect = () => {


  const history = useHistory()

  const subreddits = useSelector(state => state.subreddits)

  const generalSubreddits = subreddits.filter(subreddit => subreddit.user_id === 1)
  const userCreatedSubreddits = subreddits.filter(subreddit => subreddit.user_id !== 1)

  console.log(generalSubreddits)
  console.log(userCreatedSubreddits)


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

  if(!allSubs) return <p>Loading</p>

  return (
    <div className="mobile-subreddit-selector">
      <Link to="/">Home</Link>
      <select onChange={(e) => history.push(`/r/${e.target.value}`)} className="subreddits">
        {allSubs.map((subObject, index) => 
          <optgroup label={subObject.type} key={index}>
            {subObject.includedSubreddits.map((sub, index) => 
              <option key={index}>{sub.name}</option>
            )}
          </optgroup>
        )}
      </select>
    </div>

  )
}

export default SubredditsSelect
