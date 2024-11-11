import s from "./Login.module.css";
import logo from "../../assets/logo.jpg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
              <Input
                type="email"
                className={s.loginInput}
                {...register("email", {
                  required: "Введите адрес электронной почты",
                  minLength: {
                    message: "Any error",
                  },
                })}
                disableUnderline
              />
              <div className={s.emailError}>
                <span>{errors.email?.message}</span>
              </div>
            </div>
          </div>
          <div className={s.passwordBox}>
            <div className={s.passwordTextBox}>
              <span className={s.passwordText}>Пароль</span>
              <span className={s.passwordTextStar}>*</span>
            </div>
            <div>
              <Input
                className={s.passwordInput}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("password", {
                  required: "Введите пароль",
                })}
                disableUnderline
                sx={{
                  backgroundColor: "#ffffff",
                  borderRadius: "3px",
                  border: "1px solid #bcbcbc",
                }}
              />
              <div className={s.passwordError}>
                <span>{errors.password?.message}</span>
              </div>
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
