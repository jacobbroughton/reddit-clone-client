import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import ErrorIcon from "../../images/warning.png"
import "./ErrorPopupItem.scss"
import { removeError } from '../../reducers/errorReducer'

const ErrorPopupItem = ({errorMessage, index}) => {

  const dispatch = useDispatch()
  const darkMode = useSelector(state => state.darkMode)

  return (
    <div className={`error-popup-item ${darkMode ? 'dark' : ''}`}>
      <img src={ErrorIcon} alt="warning icon"/>
      <p className="error-message">{errorMessage}</p>
      <button onClick={() => dispatch(removeError(index))}>✖</button>
    </div>
  )
}

ErrorPopupItem.propTypes = {
  errorMessage: PropTypes.object,
  index: PropTypes.number
}

export default ErrorPopupItem
