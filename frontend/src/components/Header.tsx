import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { logout as removeCredentials } from "../slices/authSlice";
import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { RootState } from "../types";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBox from "./SearchBox";
import { ROUTES } from "../constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [logout] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout({}).unwrap();
      dispatch(removeCredentials({}));
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar className="bg-body-secondary" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to={ROUTES.HOME}>
            <Navbar.Brand>HairStyle</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to={ROUTES.CART}>
                <Nav.Link>
                  <FaShoppingCart></FaShoppingCart> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" className="ms-1">
                      {cartItems.reduce(
                        (acc: number, item) => acc + item.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to={ROUTES.PROFILE}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={ROUTES.LOGIN}>
                  <Nav.Link>
                    <FaUser></FaUser> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Dashboard" id="dashboard">
                  <LinkContainer to={ROUTES.ADMIN_ORDERS}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={ROUTES.ADMIN_PRODUCTS}>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={ROUTES.ADMIN_USERS}>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
