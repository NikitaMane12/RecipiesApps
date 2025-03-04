import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Recipe App</h2>
      <ul className="nav-links">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Recipes</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
