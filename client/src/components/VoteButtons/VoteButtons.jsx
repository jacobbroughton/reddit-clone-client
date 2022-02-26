import "./VoteButtons.scss"
import { useSelector } from "react-redux"
import React from "react"
import PropTypes from "prop-types"
import { ReactComponent as UpArrow } from "../../images/up-vote-arrow.svg"
import { ReactComponent as DownArrow } from "../../images/down-vote-arrow.svg"
import { motion } from "framer-motion"

const VoteButtons = ({ item, handleVoteClick }) => {
  const darkMode = useSelector((state) => state.darkMode)
  const user = useSelector((state) => state.auth.user)

  return (
    <div className={`votes-section ${darkMode ? "dark" : ""}`}>
      <motion.button
        onClick={() => handleVoteClick(1)}
        className="up-vote"
        whileTap={user ? { scale: 1.4 } : { scale: 1 }}
      >
        <UpArrow
          className={`${
            user && item.has_voted === 1 ? `selected` : ""
          } up-arrow`}
        />
      </motion.button>
      <span className="votes-count">{item.vote_count && item.vote_count}</span>
      <motion.button
        onClick={() => handleVoteClick(-1)}
        className="down-vote"
        whileTap={user ? { scale: 1.4 } : { scale: 1 }}
      >
        <DownArrow
          className={`${
            user && item.has_voted === -1 ? `selected` : ""
          } down-arrow`}
        />
      </motion.button>
    </div>
  )
}

VoteButtons.propTypes = {
  item: PropTypes.object,
  handleVoteClick: PropTypes.func,
}

export default VoteButtons
