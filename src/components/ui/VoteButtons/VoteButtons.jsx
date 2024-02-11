import "./VoteButtons.scss";
import { useSelector } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
// import { ReactComponent as UpArrow } from "../../../images/up-vote-arrow.svg"
// import { ReactComponent as DownArrow } from "../../../images/down-vote-arrow.svg"
import UpArrow from "../icons/UpVoteArrow";
import DownArrow from "../icons/DownVoteArrow";
import { motion } from "framer-motion";

const VoteButtons = ({ item, handleVoteClick }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={`votes-section  `}>
      <motion.button
        onClick={() => handleVoteClick(1)}
        className="up-vote"
        whileTap={user ? { scale: 1.2 } : { scale: 1 }}
      >
        <UpArrow customClass={`${user && item.has_voted === 1 ? `selected` : ""}`} />
      </motion.button>
      <span className="votes-count">{item.vote_count && item.vote_count}</span>
      <motion.button
        onClick={() => handleVoteClick(-1)}
        className="down-vote"
        whileTap={user ? { scale: 1.2 } : { scale: 1 }}
      >
        <DownArrow customClass={`${user && item.has_voted === -1 ? `selected` : ""} `} />
      </motion.button>
    </div>
  );
};

VoteButtons.propTypes = {
  item: PropTypes.object,
  handleVoteClick: PropTypes.func,
};

export default VoteButtons;
