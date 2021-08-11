import "./VoteButtons.scss"
import { useSelector } from "react-redux"

const VoteButtons = ({ item, handleVoteClick }) => {

  const darkMode = useSelector((state) => state.darkMode)

  return (
    <div className={`votes-section ${darkMode ? "dark" : ''}`}>
      <button onClick={() => handleVoteClick(1)} className={`${item.has_voted === 1 ? 'selected' : ''} up-vote`}>⬆</button>
      <span className="votes-count">{item.vote_count && item.vote_count}</span>
      <button onClick={() => handleVoteClick(-1)} className={`${item.has_voted === -1 ? `selected` : ''} down-vote`}>⬇</button>
    </div>
  )
}

export default VoteButtons