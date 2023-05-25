import { Link } from "react-router-dom";
import { logout } from "../services/authService";

function Logout({onUpdate}) {
    const handleLogout = () => {
        logout();
        onUpdate("");
      };

  return (
    <Link className="nav-link" onClick={handleLogout}>
      Logout
    </Link>
  );
}

export default Logout;
