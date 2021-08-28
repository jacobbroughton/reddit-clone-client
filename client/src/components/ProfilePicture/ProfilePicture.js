import React from "react"
import PropTypes from "prop-types"
import "./ProfilePicture.scss"

const ProfilePicture = ({ size, source }) => {

  return (
    <img className={`profile-picture ${size}`} src={source}/>
  )
}

ProfilePicture.propTypes = {
  source: PropTypes.string,
  size: PropTypes.string
}

export default ProfilePicture