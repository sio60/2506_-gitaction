import { Link } from "react-router-dom";
import isAuthenticated from "../js/auth";
import Logout from "./Logout";
import "./nav.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">홈</Link>
      {isAuthenticated() && (
        <div>
          <div>
            <Link to="/myposts">내 포스트</Link>
          </div>
            <div>
              <Link to="/boardList">전체 글</Link>
            </div>
        </div>
      )}
      {isAuthenticated() ? <Logout /> : <Link to="/login">로그인</Link>}
    </nav>
  );
};
export default NavBar;