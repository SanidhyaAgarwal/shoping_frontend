import { Outlet, Navigate } from "react-router-dom";
const checkCustomer = () => {
  let role = sessionStorage.getItem("role");
  
  return role ? true : false;
};
const AuthRoutes = () => {
  const isCustomer = checkCustomer();
  
  if(isCustomer){
    
    return <Outlet/>
  } else{
    return <Navigate to="/login"/>
  }
  
};

export default AuthRoutes;
