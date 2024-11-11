import Login from "./login/Login";
import { Route, Routes } from "react-router-dom";
import s from "../pages/Main.module.css";
import Help from "./Help";

function Main() {
  return (
    <div className={s.mainContainer}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </div>
  );
}
export default Main;
