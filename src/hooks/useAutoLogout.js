import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/E-commerce_trunk";
import { toast } from "react-hot-toast";

const useAutoLogout = (token) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("⏰ Session expired, logging out.");
    dispatch(logout());
    navigate("/signin");
  };

  const getExpireTime = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  useEffect(() => {
    if (!token) return;

    const expTime = getExpireTime(token);
    if (!expTime) return;

    const now = Date.now();
    const timeLeft = expTime - now;

    if (timeLeft <= 0) {
      handleLogout();
      return;
    }

    const timer = setTimeout(() => {
      handleLogout();
    }, timeLeft);

    return () => clearTimeout(timer);
  }, [token]);
};

export default useAutoLogout;
