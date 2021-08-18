import "./Search.scss"
import { ReactComponent as SearchIcon } from "../../images/search.svg"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { search } from "../../actions/searchActions"
import { useEffect } from "react"
// import axios from "axios"


const Search = () => {

  // /search/q=search query here

  const dispatch = useDispatch()
  const history = useHistory()

  const user = useSelector(state => state.auth.user)
  const currentSubreddit = useSelector(state => state.currentSubreddit)
  const darkMode = useSelector(state => state.darkMode)


  const [searchValue, setSearchValue] = useState("")

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    if(searchValue === "") { return }
    dispatch(search(user?.id, currentSubreddit?.name, searchValue))
    console.log(history.location.pathname)
    history.push(`${history.location.pathname}?q=${searchValue}`)
  }

  useEffect(() => {
    setSearchValue('')
  }, [history.location.pathname])

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