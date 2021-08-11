import "./VoteButtons.scss"
import { useSelector } from "react-redux"
import { ReactComponent as UpArrow } from "../../images/up-vote-arrow.svg"
import { ReactComponent as DownArrow } from "../../images/down-vote-arrow.svg"

const VoteButtons = ({ item, handleVoteClick }) => {

  const darkMode = useSelector((state) => state.darkMode)

  return (
    <div className={`votes-section ${darkMode ? "dark" : ''}`}>
      <button onClick={() => handleVoteClick(1)} className='up-vote'>
        <UpArrow className={`${item.has_voted === 1 ? `selected` : ''} up-arrow`}/>
      </button>
      <span className="votes-count">{item.vote_count && item.vote_count}</span>
      <button onClick={() => handleVoteClick(-1)} className='down-vote'>
        <DownArrow className={`${item.has_voted === -1 ? `selected` : ''} down-arrow`}/>
      </button>
    </div>
  )
}

export default VoteButtons