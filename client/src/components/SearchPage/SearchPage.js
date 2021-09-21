import "./SearchPage.scss"
import PostList from "../PostList/PostList"
import { useParams } from "react-router-dom"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentSubreddit } from "../../actions/subredditActions"
import { search } from "../../actions/searchActions"
import { useQuery } from "../useQuery"
import Meta from "../Meta"

const SearchPage = () => {

  const dispatch = useDispatch()
  const { name } = useParams()
  const query = useQuery()

  let searchQueryFromURL = query.get("q");
  const user = useSelector(state => state.auth.user)
  const currentSubreddit = useSelector(state => state.currentSubreddit)


  useEffect(() => {
    if(name) {
      dispatch(setCurrentSubreddit(name))
      dispatch(search(user?.id, name, searchQueryFromURL))
    }
  }, [name])

  return (
    <div className="search-page">
      <Meta title={`Searching for '${searchQueryFromURL}' ${currentSubreddit ? `in r/${currentSubreddit.name}` : ''}`}/>
      <PostList/>
    </div>
  )
}

export default SearchPage