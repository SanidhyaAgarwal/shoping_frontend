import { Outlet, Navigate } from "react-router-dom";
const checkDealer = () => {
  let role = sessionStorage.getItem("userRole");
  console.log(role);
  if (role === "DEALER") {
    return true;
  } else {
    return false;
  }
};
const RoleRoutes = () => {
  const isDealer = checkDealer();
  return isDealer ? <Outlet /> : <Navigate to="/" />;
};

export default RoleRoutes;
