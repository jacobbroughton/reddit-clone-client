import React from "react";

const DownVoteArrow = ({ customClass }) => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width="123.959px"
      height="123.958px"
      viewBox="0 0 123.959 123.958"
      className={`down-arrow ${customClass}`}
    >
      <g>
        <path
          d="M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56
		C125.979,34.417,123.279,28.017,117.979,28.017z"
        />
      </g>
    </svg>
  );
};
export default DownVoteArrow;
