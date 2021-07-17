import "./Footer.scss"
import { useSelector } from "react-redux";

const Footer = () => {

  const darkMode = useSelector(state => state.darkMode)

  return (
    <footer className={`${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <p className="created-by">Created by Jacob Broughton</p>
        <p className="github">Feel free to visit my <a href="https://github.com/jacobbroughton">Github</a></p>
      </div>
    </footer>
  )
}

export default Footer