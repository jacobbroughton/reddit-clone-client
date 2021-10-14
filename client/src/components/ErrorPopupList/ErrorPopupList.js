import React, { useEffect } from 'react'
import { 
  // useDispatch,
   useSelector } from "react-redux"
import ErrorPopupItem from "../ErrorPopupItem/ErrorPopupItem"
import { AnimatePresence } from "framer-motion"
import "./ErrorPopupList.scss"

const ErrorPopupList = () => {

  const errors = useSelector(state => state.error)
  const darkMode = useSelector(state => state.darkMode)

  useEffect(() => {
    console.log("ERRORS: ", errors)
  }, [errors])

  return (
    <AnimatePresence>
      <div className={`error-popup-list ${darkMode ? 'dark' : ''}`}>
        {errors.map((errorItem, index) => 
          <ErrorPopupItem key={index} error={errorItem}/>
        )}
      </div>
    </AnimatePresence>

  )
}

export default ErrorPopupList
