import { useEffect, useState } from "react"

function getTheme() {
  let localStorageTheme = window.localStorage.getItem("theme")
  // let localStorageOpposite = localStorageTheme === "light" ? "dark" : "light"
  let userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark")
    .matches
    ? "dark"
    : "light"

  if(localStorageTheme) return localStorageTheme
  else if(userPreferredTheme) return userPreferredTheme

  // return localStorageTheme ? localStorageTheme : userPreferredTheme
}

export function useTheme() {
  const [theme, setTheme] = useState(getTheme())

  // function toggleTheme() {
  //   window.localStorage.setItem("theme", localStorageOpposite)
  //   document.body.dataset.theme = localStorageOpposite

  //   setTheme(localStorageOpposite)
  // }

  useEffect(() => {
    window.localStorage.setItem("theme", theme)
    document.body.dataset.theme = theme
    // setTheme(theme)
    // console.log(theme)
  }, [theme])

  return [theme, setTheme]
}
