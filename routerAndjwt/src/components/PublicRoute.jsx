import isAuthenticated from "../js/auth"

const PublicRoute = ({children}) => {
  return isAuthenticated()? <Navigate to="/"/> : children

}
export default PublicRoute