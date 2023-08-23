import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRoutes = () => {
  const loggedIn = localStorage.getItem('user') != undefined
  return loggedIn ? <Outlet/> : <Navigate to={'/'}/>
}

export default ProtectedRoutes