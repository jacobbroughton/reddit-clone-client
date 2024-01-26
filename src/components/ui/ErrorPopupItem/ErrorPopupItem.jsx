import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import ErrorIcon from "../../../images/warning.png";
import { removeError } from "../../../redux/reducers/errorReducer";
import { motion } from "framer-motion";
import "./ErrorPopupItem.scss";

const ErrorPopupItem = ({ error }) => {
  const dispatch = useDispatch();

  const [errorShowing, setErrorShowing] = useState(true);

  const handleErrorTimer = () => {
    setTimeout(() => {
      setErrorShowing(false);
    }, 5001);
  };

  useEffect(() => {
    handleErrorTimer();
  }, [error]);

  useEffect(() => {
    if (!errorShowing) {
      dispatch(removeError(error.itemIndex));
    }
  }, [errorShowing]);

  return (
    <motion.div
      className={`error-popup-item`}
      animate={{
        opacity: errorShowing ? 1 : 0,
        x: errorShowing ? 0 : "-100%",
      }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      initial={{ x: "-100%" }}
    >
      <img src={ErrorIcon} alt="warning icon" />
      <p className="error-message">{error.message}</p>
    </motion.div>
  );
};

ErrorPopupItem.propTypes = {
  error: PropTypes.object,
};

export default ErrorPopupItem;
