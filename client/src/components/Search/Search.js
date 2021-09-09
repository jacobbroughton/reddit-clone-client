import "./Search.scss"
import { ReactComponent as SearchIcon } from "../../images/search.svg"
import { ReactComponent as BackArrow } from "../../images/backarrow.svg"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { search } from "../../actions/searchActions"
import useBrowserResize from "../useBrowserResize"
import React from "react"


const Search = () => {

  const { width } = useBrowserResize()

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const user = useSelector(state => state.auth.user)
  const currentSubreddit = useSelector(state => state.currentSubreddit)
  const darkMode = useSelector(state => state.darkMode)


  const [searchValue, setSearchValue] = useState("")
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [mobile, setMobile] = useState(false)

  // useEffect(() => {
  //   console.log(browserWidth)
  // }, [browserWidth])

  useEffect(() => {
    if(width <= 767) {
      setMobile(true)
    } else {
      setMobile(false)
      setSearchExpanded(false)
    }
  }, [width])

  useEffect(() => {
    console.log(searchExpanded, mobile)
  }, [searchExpanded, mobile])


  const searchFunc = (value, subreddit) => {

    setSearchValue(value)
    dispatch(search(user?.id, subreddit, value))

    console.log(location)

    if(currentSubreddit) {
      history.push(`${location.pathname}?q=${value}`)
    } else {
      console.log(location)
      history.push(`/search?q=${value}`)
    }
  }


  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    if(searchValue === "") return

    searchFunc(searchValue, currentSubreddit?.name)
  }

  return (
    <div className={`search-bar ${darkMode ? 'dark' : ''}`}>
      <button className="search-icon-button" onClick={mobile ? () => setSearchExpanded(!searchExpanded) : undefined}>
        {searchExpanded ? <BackArrow className="search-icon" /> : <SearchIcon className="search-icon"/> }
      </button>
      { mobile && searchExpanded ? 
        <div className='mobile-search'>
          {/* {currentSubreddit && <label className="search-label">r/{currentSubreddit.name}</label>} */}
          <form onSubmit={(e) => handleSearchSubmit(e)} className="search-form">
            <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className="search-input" placeholder={`Search ${currentSubreddit ? `in ${currentSubreddit.name}` : ''}`}/>
          </form>
        </div>
        :
        <div className="desktop-search">
          {currentSubreddit && <label className="search-label">r/{currentSubreddit.name}</label>}
          <form onSubmit={(e) => handleSearchSubmit(e)} className="search-form">
            <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className="search-input" placeholder="Search"/>
          </form>
        </div>
      }
    </div>
  )
}

export default Search