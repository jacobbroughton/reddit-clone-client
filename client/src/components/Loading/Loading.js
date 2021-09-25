import React from 'react'
import { useSelector } from "react-redux"
import "./Loading.scss"

const Loading = () => {

  const darkMode = useSelector(state => state.darkMode)

  return (
    <div className={`loading ${darkMode ? 'dark' : ''}`}>
      <div className="one"></div>
      <div className="two"></div>
      <div className="three"></div>
    </div>
  )
}

export default Loading
