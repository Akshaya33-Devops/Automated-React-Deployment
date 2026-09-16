import React from "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

const Navbar = () => {
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any additional logout-related tasks here
    localStorage.removeItem("token");
    dispatch(clearCart()); // Clear the cart when logging out
    // Redirect the user to the appropriate page, e.g., home or login
    // You can use react-router's history or Link component to navigate
    navigate("/");
  };

  

  const handleNavigateToCart = () => {
    // Call this function when you want to navigate
    navigate('/cart'); // Replace '/cart' with your actual cart route
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            OnlineShop
          </Link>

          <div className="d-flex align-items-center">
            {localStorage.getItem("token") ? (
              <>
                <Link to="/" className="me-3 nav-link">
                  Home
                </Link>

                <Link to="/checkout-success" className="me-3 nav-link">
                  Your Orders
                </Link>

                <button
                  className="me-3 nav-link btn"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
                <IconButton aria-label="cart" onClick={handleNavigateToCart}>
                  <Badge badgeContent={cartTotalQuantity} color="success">
                    <ShoppingCartIcon color="action" />
                  </Badge>
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/" className="me-3 nav-link">
                  Home
                </Link>
                <Link to="/login" className="me-3 nav-link">
                  Login
                </Link>
                <Link to="/signup" className="me-3 nav-link">
                  SignUp
                </Link>
                <IconButton aria-label="cart" onClick={handleNavigateToCart}>
                  <Badge badgeContent={cartTotalQuantity} color="success">
                    <ShoppingCartIcon color="action" />
                  </Badge>
                </IconButton>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
