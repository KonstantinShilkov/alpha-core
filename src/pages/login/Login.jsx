import s from "./Login.module.css";
import logo from "../../assets/images/logo.jpg";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../hooks/useAuth";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import Preloader from "../../common/Preloader";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate, loading, error, isAuth } = useAuth();
  const navigate = useNavigate();
  console.log(isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate("/homepage");
      console.log(isAuth);
    }
  }, [isAuth, navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data) => {
    authenticate(data.email, data.password);
    reset();
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={s.mainContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.logoContainer}>
          <img className={s.logo} src={logo} alt="Logo" />
        </div>
        <div className={s.loginContainer}>
          <div className={s.headerTextBox}>
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
                      sx={{ width: 24, height: 24 }}
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
          <div className={s.buttonBox}>
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
