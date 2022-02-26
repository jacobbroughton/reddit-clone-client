import { useLocation } from "react-router-dom"

export const useQuery = () => {
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search)
  return searchQuery.get("q")
}
