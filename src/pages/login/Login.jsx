import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/api";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [information, setInfo] = useState({
    email: undefined,
    password: undefined,
  });

  const error = useSelector((state) => state.error);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api + "/admin/login", information, {
        withCredentials: true,
      });
      dispatch({ type: "LOGIN", user: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", error: err.response.data.message });
    }
  };

  return (
    <div>
      <div className="login">
        <div className="loginContainer">
          <input
            type="email"
            placeholder="Email"
            id="email"
            onChange={handleChange}
            className="loginInput"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="loginInput"
          />
          <button onClick={handleClick} className="loginButton">
            Login
          </button>

          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
