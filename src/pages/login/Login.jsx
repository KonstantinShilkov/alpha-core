import s from "./Login.module.css";
import logo from "../../assets/logo.jpg";
// import Input from "@mui/joy/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const testSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={s.mainContainer}>
      <form onSubmit={handleSubmit(testSubmit)}>
        <div className={s.logoContainer}>
          <img className={s.logo} src={logo} alt="Logo" />
        </div>
        <div className={s.loginContainer}>
          <div className={s.headerText}>
            <span>Войдите в свой аккаунт </span>
          </div>
          <div className={s.loginBox}>
            <div className={s.loginTextBox}>
              <span className={s.loginText}>Адрес электронной почты</span>
              <span className={s.loginTextStar}>*</span>
            </div>
            <div>
              <input
                {...register("email", {
                  required: "Email is Required",
                  minLength: {
                    message: "Any error",
                  },
                })}
                type="email"
                className={s.loginInput}
              />
            </div>
          </div>
          <div className={s.passwordBox}>
            <div className={s.passwordTextBox}>
              <span className={s.passwordText}>Пароль</span>
              <span className={s.passwordTextStar}>*</span>
            </div>
            <div>
              <input
                {...register("password", {
                  required: "Password is Required",
                  minLength: {
                    value: 6,
                    message: "Min length 6",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className={s.passwordInput}
              />
            </div>
          </div>
          <div>
            <button className={s.button} type="submit">
              Продолжить
            </button>
          </div>
          <div className={s.questionBox}>
            <nav>
              <NavLink className={s.questionLink} to="/help">
                Не удается войти в систему?
              </NavLink>
            </nav>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
