import React from "react"
import "./Footer.scss"
import { useSelector } from "react-redux"

const Footer = () => {
  

  return (
    <footer>
      <div className="container">
        <p className="created-by">Created by Jacob Broughton</p>
        <p className="github">
          Feel free to visit my{" "}
          <a href="https://github.com/jacobbroughton">Github</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
