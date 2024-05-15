import { FaMoon } from "react-icons/fa";
const NavBar = () => {
  return (
    <div className="nav-bar">
      <div>
        <h2>The World </h2>
      </div>
      <div className="icon-text">
        <FaMoon />
        <span>coming soon...</span>
      </div>
    </div>
  );
};
export default NavBar;
