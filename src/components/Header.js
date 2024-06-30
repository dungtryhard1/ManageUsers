import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/personal_logo-vector.png";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleLogoutRedux } from "../redux/actions/userAction";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const handleHidden = () => {
    document.getElementsByClassName("show").classList.remove("show");
  };

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false && window.location.pathname !== "/login") {
      toast.success("Logout Success");
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-light bg-gradient">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              width="52"
              className="d-inline-block align"
              alt="logo app"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) ||
              window.location.pathname === "/" ||
              window.location.pathname === "/users") && (
              <>
                <Nav className="me-auto">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Manage user
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.auth ? (
                    <span className="ms-3 nav-link">
                      Welcome <b>{user.email}</b>
                    </span>
                  ) : (
                    ""
                  )}
                  <NavDropdown title="More">
                    {user && user.auth ? (
                      <NavDropdown.Item
                        className="dropdown-item text-decoration-none"
                        onClick={() => handleLogout()}
                      >
                        Logout <i className="fa fa-sign-out"></i>
                      </NavDropdown.Item>
                    ) : (
                      <NavLink
                        to="/login"
                        className="dropdown-item text-decoration-none"
                        onClick={() => handleHidden()}
                      >
                        Login <i className="fa fa-sign-in"></i>
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
