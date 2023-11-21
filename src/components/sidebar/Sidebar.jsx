import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../../api/api";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.isLogin);
  const handleClickLogout = async () => {
    try {
      await axios.post(api + "/logout", { withCredentials: true });
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/");
  });
  return (
    <div className="sidebar">
      <div className="sidebarTitle">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="sidebarCenter">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <p className="title">LISTS</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>

          <p className="title">NEW</p>

          <Link to="/products/new" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>New Product</span>
            </li>
          </Link>
          <p className="title">CHAT ROOM</p>

          <Link to="/chat" style={{ textDecoration: "none" }}>
            <li>
              <ChatIcon className="icon" />
              <span>Chat</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li onClick={handleClickLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
