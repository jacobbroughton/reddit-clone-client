import { useEffect, useState } from "react"

export function useTheme() {
  let localStorageTheme = window.localStorage.getItem("theme")
  let localStorageOpposite = localStorageTheme === "light" ? "dark" : "light"
  let userPreferredTheme = window.matchMedia("(prefers-color-scheme: dark")
    .matches
    ? "dark"
    : "light"

  const [theme, setTheme] = useState(localStorageTheme ? localStorageTheme : userPreferredTheme)

  function toggleTheme() {
    window.localStorage.setItem("theme", localStorageOpposite)
    document.body.dataset.theme = localStorageOpposite

    setTheme(localStorageOpposite)
  }

  useEffect(() => {
    setTheme(localStorageTheme ? localStorageTheme : userPreferredTheme)
  }, [])

  return [theme, toggleTheme]
}
