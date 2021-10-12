import React from 'react'
import { 
  // useDispatch,
   useSelector } from "react-redux"
import ErrorPopupItem from "../ErrorPopupItem/ErrorPopupItem"
import "./ErrorPopupList.scss"

const ErrorPopupList = () => {

  // const dispatch = useDispatch()

  const errors = useSelector(state => state.error)
  const darkMode = useSelector(state => state.darkMode)



  console.log(errors)

  return (
    <div className={`error-popup-list ${darkMode ? 'dark' : ''}`}>
      {errors.map((errorItem, index) => <ErrorPopupItem key={index} index={index} errorMessage={errorItem.response}/>).reverse()}
    </div>
  )
}

export default ErrorPopupList
