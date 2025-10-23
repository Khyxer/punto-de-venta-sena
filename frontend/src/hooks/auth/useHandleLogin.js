import { useState } from "react";

export const useHandleLogin = () => {
  const [loginFormData, setLoginFormData] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(loginFormData);
    try {
      setLoading(true);
      setError(null);

      const { userName, password } = loginFormData;

      if (!userName || !password) {
        throw new Error("Todos los campos son obligatorios");
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
    //   console.log(data.data.token);
      localStorage.setItem("token", data.data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginFormData,
    setLoginFormData,
    loading,
    error,
    handleLogin,
  };
};
