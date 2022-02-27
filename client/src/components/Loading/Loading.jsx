import React from "react"
import { useSelector } from "react-redux"
import "./Loading.scss"

const Loading = () => {
  

  return (
    <div className={`loading`}>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
    </div>
  )
}

export default Loading
