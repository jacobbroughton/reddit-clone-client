import React, { useEffect } from "react"
import {
  // useDispatch,
  useSelector,
} from "react-redux"
import ErrorPopupItem from "../ErrorPopupItem/ErrorPopupItem"
import { AnimatePresence } from "framer-motion"
import "./ErrorPopupList.scss"

const ErrorPopupList = () => {
  const errors = useSelector((state) => state.error)
  

  useEffect(() => {
    console.log("ERRORS: ", errors)
  }, [errors])

  return (
    <AnimatePresence>
      <div className={`error-popup-list`}>
        {errors.map((errorItem, index) => (
          <ErrorPopupItem key={index} error={errorItem} />
        ))}
      </div>
    </AnimatePresence>
  )
}

export default ErrorPopupList
