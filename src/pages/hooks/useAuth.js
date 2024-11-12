import { useState } from "react";
import { LOGIN_MUTATION } from "../../apollo/auth";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [data, setData] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const authenticate = async (email, password) => {
    try {
      const { data: responseData } = await login({
        variables: { email, password },
      });
      console.log(responseData);
      setData(responseData);
      setIsAuth(true);
      navigate("/tree");

      console.log(isAuth);
    } catch (err) {
      const errorMessage = err.message;
      if (errorMessage === "Invalid credentials") {
        enqueueSnackbar("wrong email or password");
      } else {
        enqueueSnackbar(errorMessage);
      }

      console.error("Ошибка авторизации:", err);
    }
  };

  return { data, isAuth, loading, error, authenticate };
};
