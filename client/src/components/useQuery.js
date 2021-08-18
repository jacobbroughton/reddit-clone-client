import { useLocation } from "react-router-dom"

export const useQuery = () => {
  const location = useLocation()
  return new URLSearchParams(location.search);
};