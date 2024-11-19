import { useEffect, useState } from "react";
import { LOGIN_MUTATION } from "../../apollo/queries";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [data, setData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const decodeToken = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const isTokenExpired = (token) => {
    const decoded = decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log(`exp after: ${decoded.exp}`);
    console.log(`current time: ${currentTime}`);

    return decoded.exp < currentTime;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      setIsAuth(true);
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
    }
  }, []);

  const authenticate = async (email, password) => {
    try {
      const { data: responseData } = await login({
        variables: { email, password },
      });
      const token = responseData?.login?.token;
      if (token) {
        localStorage.setItem("token", token);
      }

      console.log(responseData);
      setData(responseData);
      setIsAuth(true);
      navigate("/homepage");
    } catch (err) {
      const errorMessage = err.message;
      if (errorMessage === "Invalid credentials") {
        enqueueSnackbar("invalid email or password");
      } else {
        enqueueSnackbar(errorMessage);
      }

      console.error("Ошибка авторизации:", err);
    }
  };

  useEffect(() => {
    if (isAuth) {
      localStorage.setItem("isAuth", "true");
    } else {
      localStorage.removeItem("isAuth");
    }
  }, [isAuth]);

  return { data, isAuth, loading, error, authenticate };
};
