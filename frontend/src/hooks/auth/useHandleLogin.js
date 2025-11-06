import { useState } from "react";
import { toast } from "react-hot-toast";

export const useHandleLogin = () => {
  const [loginFormData, setLoginFormData] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(loginFormData);
    try {
      setLoading(true);
      // setError(null);

      const { userName, password } = loginFormData;

      if (!userName || !password) {
        toast.error("Todos los campos son obligatorios");
        return;
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
      console.log(data);
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      //   console.log(data.data.token);
      localStorage.setItem("token", data.data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginFormData,
    setLoginFormData,
    loading,
    handleLogin,
  };
};
