import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "../Protecte/ProtectedRoute";

const MainLayout = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Outlet />
    </ProtectedRoute>
  );
};

export default MainLayout;
