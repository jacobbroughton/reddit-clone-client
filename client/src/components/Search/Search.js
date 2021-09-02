import "./Search.scss"
import { ReactComponent as SearchIcon } from "../../images/search.svg"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { search } from "../../actions/searchActions"
import React from "react"


const Search = () => {

  // /search/q=search query here

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.auth.user)
  const currentSubreddit = useSelector(state => state.currentSubreddit)
  const darkMode = useSelector(state => state.darkMode)


  const [searchValue, setSearchValue] = useState("")

  // const query = useQuery()
  // const { name } = useParams()

  const searchFunc = (value, subreddit) => {

      setSearchValue(value)
      dispatch(search(user?.id, subreddit, value))

      history.push(`search?q=${value}`)
  }


  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    if(searchValue === "") return

    searchFunc(searchValue, currentSubreddit?.name)
  }

  return (
    <div className={`search-bar ${darkMode ? 'dark' : ''}`}>
      <SearchIcon className="search-icon"/>
      { currentSubreddit && <label className="search-label">r/{currentSubreddit.name}</label> }
      <form onSubmit={(e) => handleSearchSubmit(e)} className="search-form">
        <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className="search-input" placeholder="Search"/>
      </form>

    </div>
  )
}

export default Search