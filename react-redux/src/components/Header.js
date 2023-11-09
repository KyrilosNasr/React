import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/store";
import classes from "./Header.module.css";
const Header = () => {
  const dispatch = useDispatch();  
  const authState = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => dispatch(authActions.logout());
  console.log('from header');
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {authState && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
