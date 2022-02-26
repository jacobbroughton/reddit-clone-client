import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import ErrorIcon from "../../images/warning.png"
import "./ErrorPopupItem.scss"
import { removeError } from "../../reducers/errorReducer"
import { motion } from "framer-motion"

const ErrorPopupItem = ({ error }) => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.darkMode)

  const [errorShowing, setErrorShowing] = useState(true)

  const handleErrorTimer = () => {
    setTimeout(() => {
      setErrorShowing(false)
    }, 5000)
  }

  useEffect(() => {
    handleErrorTimer()
  }, [error])

  useEffect(() => {
    if (!errorShowing) {
      dispatch(removeError(error.itemIndex))
    }
  }, [errorShowing])

  return (
    <motion.div
      className={`error-popup-item ${darkMode ? "dark" : ""}`}
      animate={{
        opacity: errorShowing ? 1 : 0,
        x: errorShowing ? 0 : "-100%",
      }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      initial={{ x: "-100%" }}
    >
      <img src={ErrorIcon} alt="warning icon" />
      <p className="error-message">{error.response}</p>
    </motion.div>
  )
}

ErrorPopupItem.propTypes = {
  error: PropTypes.object,
}

export default ErrorPopupItem
