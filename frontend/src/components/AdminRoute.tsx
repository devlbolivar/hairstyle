import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import { ROUTES } from "../constants";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

export default AdminRoute;
