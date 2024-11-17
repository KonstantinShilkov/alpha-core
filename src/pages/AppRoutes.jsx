import Login from "./login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import s from "../pages/Main.module.css";
import Help from "./Help";
import MainPage from "./mainPage/MainPage";

function AppRoutes() {
  return (
    <div className={s.mainContainer}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/homepage" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </div>
  );
}
export default AppRoutes;
