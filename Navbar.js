import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const goToDetailPage = () => navigate(`/`);
  
  return (
    <nav>
        <span className="logo" onClick={goToDetailPage}>UPayments Store</span>
        <span className="register">Register</span>
      </nav>
  )
}

export default Navbar;