import "./CurrentSubredditBanner.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { deleteSubreddit } from "../../actions/subredditsActions";


const CurrentSubredditBanner = ({ name, user }) => {

  const dispatch = useDispatch()
  const currentSubreddit = useSelector(state => state.currentSubreddit)

  const [deleteToggle, setDeleteToggle] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const handleSubredditDelete = () => {
    dispatch(deleteSubreddit(user.id, currentSubreddit.id))
  }



  return (
    <div className="current-subreddit-banner">
      {
        name ? 
        <>
            <h1><span className="rSpan">r/</span>{name} </h1> 
            {currentSubreddit?.user_id === user.id && 
              <>
                {deleteToggle ?
                  <span className="delete-confirmation-span">Are you sure? 
                    <button onClick={() => handleSubredditDelete()}>Yes</button> 
                    <button onClick={() => setDeleteToggle(false)}>No</button>
                  </span>
                  :
                  <button className="delete-btn" onClick={() => setDeleteToggle(true)}>Delete</button>
                }
              </>
            }
        </>

        : 
        <h1>Home</h1>
      }
    </div>
  )
}

export default CurrentSubredditBanner