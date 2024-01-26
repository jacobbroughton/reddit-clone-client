import React from "react";
import { useSelector } from "react-redux";
import ErrorPopupItem from "../ErrorPopupItem/ErrorPopupItem";
import { AnimatePresence } from "framer-motion";
import "./ErrorPopupList.scss";

const ErrorPopupList = () => {
  const errors = useSelector((state) => state.error);

  return (
    <AnimatePresence>
      <div className={`error-popup-list`}>
        {errors.map((errorItem, index) => (
          <ErrorPopupItem key={index} error={errorItem} />
        ))}
      </div>
    </AnimatePresence>
  );
};

export default ErrorPopupList;
