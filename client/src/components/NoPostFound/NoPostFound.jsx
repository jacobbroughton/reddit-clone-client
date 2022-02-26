import React from "react"

const NoPostFound = () => {
  return (
    <div>
      <p className="post-not-found-p">
        Post not found, return to
        <Link
          className="post-not-found-link"
          to={subredditName ? `/${subredditName[0]}` : "/"}
        >
          {subredditName ? `${subredditName}` : "Home"}
        </Link>
      </p>
    </div>
  )
}

export default NoPostFound
