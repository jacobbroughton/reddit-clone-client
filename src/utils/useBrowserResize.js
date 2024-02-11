import { useState, useEffect } from "react"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window

  return {
    width,
    height,
  }
}

const useBrowserResize = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", () => handleResize())
    return () => window.removeEventListener("resize", () => handleResize())
  }, [])

  return windowDimensions
}

export default useBrowserResize