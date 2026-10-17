import { useNavigate } from "react-router";
import { logout } from "../features/auth/services/auth.service";

const useLogout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return { handleLogout };
};

export default useLogout;
