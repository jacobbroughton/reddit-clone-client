import React from "react"
import PropTypes from "prop-types"
import "./ProfilePicture.scss"

const ProfilePicture = ({ source }) => {

  return (
    <img className="profile-picture" src={source}/>
  )
}

ProfilePicture.propTypes = {
  source: PropTypes.string
}

export default ProfilePicture