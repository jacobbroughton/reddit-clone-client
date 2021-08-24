import "./SearchPage.scss"
import PostList from "../PostList/PostList"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentSubreddit } from "../../actions/subredditActions"
import { search } from "../../actions/searchActions"
import { useQuery } from "../useQuery"

const SearchPage = () => {

  const dispatch = useDispatch()
  const { name } = useParams()
  const query = useQuery()

  let searchQueryFromURL = query.get("q");
  const user = useSelector(state => state.auth.user)


  useEffect(() => {
    if(name) {
      dispatch(setCurrentSubreddit(name))
      dispatch(search(user?.id, name, searchQueryFromURL))
    }
  }, [name])

  return (
    <div className="search-page">
      <PostList/>
    </div>
  )
}

export default SearchPage