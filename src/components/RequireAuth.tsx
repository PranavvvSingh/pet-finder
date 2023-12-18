import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";

type propsType ={
    children: ReactNode
}
const RequireAuth = ({ children }: propsType) => {
  const auth = useSelector((state:RootState) => state.auth.user);
  if (!auth) return <Navigate to="/login" />;
  return children;
};

export default RequireAuth;
