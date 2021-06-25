import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createPost } from "../../actions/postListActions"
import "./NewPost.scss"

const NewPost = ({
  currentSubreddit
}) => {
    // Make list of recent posts to all the subreddits
    // Individual subreddit views will filter this list (I think)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const subreddits = useSelector(state => state.subreddits)
  const darkMode = useSelector(state => state.darkMode)
  
  
  const [postType, setPostType] = useState("text")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [url, setUrl] = useState("")
  const [subreddit, setSubreddit] = useState(null)
 




  const handleSubmit = (e) => {

    const post = {
      postType,
      title,
      body: (postType === 'text' ? body : url),
      authorId: auth.user.id,
      subredditId: subreddit.id,
      subredditName: subreddit.name
    }

    dispatch(createPost(post))
    e.preventDefault()
  }

  useEffect(() => {
    if (postType === 'text') {
      setUrl('')
    } 
    // else if (postType === 'link') {
    //   setTitle('')
    // }
  }, [postType])

  useEffect(() => {
    if(subreddits.length > 0) {
      setSubreddit(currentSubreddit ? currentSubreddit : subreddits[0])
    }
  }, [subreddits, currentSubreddit])

  // const filterSubreddit = () => {
  //   let filteredSubreddit = subreddits.filter(subreddit => subreddit === currentSubreddit)
  //   return filteredSubreddit
  // }


  const handleSubredditChange = (selectValue) => {
    // setSubreddit(subreddits.filter(filterSubreddit(selectValue))[0])
    setSubreddit(subreddits.filter(sub => sub.name === selectValue)[0])
  }

  return (
      <div className={`new-post ${darkMode && 'dark'}`}>
          <div className="new-post-container">
              <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="both-radio-inputs">
                    <div className="post-type-buttons">
                      <button className={`post-type-button ${postType === 'text' ? 'clicked' : ''}`} value={'text'} onClick={() => setPostType('text')} type="button">Text</button>
                      <button className={`post-type-button  ${postType === 'link' ? 'clicked' : ''}`} value={'link'} onClick={() => setPostType('link')} type="button">Link</button>
                    </div>
                  </div>
                  <input className="new-post-input" placeholder="Title *" onChange={e => setTitle(e.target.value)}/>
                  { postType === 'text' ? <>
                    <textarea className="new-post-input" placeholder="Text (optional)" onChange={e => setBody(e.target.value)}/>
                  </> 
                  :
                  <>
                     <input type="url" className="new-post-input" placeholder="url *" onChange={e => setUrl(e.target.value)}/>
                  </>
                }
                  <select 
                    defaultValue={currentSubreddit ? currentSubreddit.name : subreddits.filter(subreddit => subreddit === currentSubreddit)} 
                    onChange={(e) => handleSubredditChange(e.target.value)}>
                    { subreddits.map((subreddit, key) => 
                      <option key={key}>{subreddit.name}</option>
                    )}
                  </select>
                  { subreddits.length > 0 && <input className="new-post-submit" type="submit"/> }
                  
              </form>
          </div>
      </div>
  )
}

export default NewPost