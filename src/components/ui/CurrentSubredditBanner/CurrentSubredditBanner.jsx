import "./CurrentSubredditBanner.scss"
import { useDispatch, useSelector } from "react-redux"
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"
import { useQuery } from "../../../utils/useQuery"
import { deleteSubreddit } from "../../../redux/actions/subredditsActions"
import he from "he"

const CurrentSubredditBanner = ({ name }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const currentSubreddit = useSelector((state) => state.currentSubreddit)
  
  const user = useSelector((state) => state.auth.user)

  const [deleteToggle, setDeleteToggle] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubredditDelete = () => {
    dispatch(deleteSubreddit(user.id, currentSubreddit.id))
    setDeleteToggle(false)
  }

  useEffect(() => {
    setDeleteToggle(false)
  }, [currentSubreddit])

  const query = useQuery()

  useEffect(() => {
    // let searchQueryFromURL = query.get("q");
    setSearchQuery(query)
  }, [location])

  return (
    <section className={`current-subreddit-banner`}>
      {name ? (
        <div className="current-subreddit-banner-stack">
          <h1>
            {currentSubreddit ? (
              <>
                <span className="rSpan">r/</span>
                {he.decode(currentSubreddit.name)}
              </>
            ) : (
              "Home"
            )}{" "}
          </h1>
          {searchQuery && (
            <p className="search-value">
              <span>Search: </span>
              {searchQuery}
            </p>
          )}
          {user &&
            currentSubreddit &&
            currentSubreddit?.user_id === user?.id &&
            (deleteToggle ? (
              <span className="delete-confirmation-span">
                Are you sure?
                <button onClick={() => handleSubredditDelete()}>Yes</button>
                <button onClick={() => setDeleteToggle(false)}>No</button>
              </span>
            ) : (
              <button
                className="delete-btn"
                onClick={() => setDeleteToggle(true)}
              >
                Delete Subreddit
              </button>
            ))}
        </div>
      ) : (
        <div className="current-subreddit-banner-stack">
          <h1>Home</h1>
          {searchQuery && (
            <p className="search-value">
              <span>Search: </span>
              {searchQuery}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

CurrentSubredditBanner.propTypes = {
  name: PropTypes.string,
}

export default CurrentSubredditBanner
