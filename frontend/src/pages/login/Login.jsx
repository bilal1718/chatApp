// Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import "../../styles/login.css"; 
import image from "../../images/collab.jpg";
import second from "../../images/collab.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div id="loginPage" className="d-flex justify-content-center">
      <div className="auth-form">
        <div className="logo-login">
          {/* Replace image source with appropriate logic */}
          <img src={second} alt="Logo" />
        </div>
        <h4 className="line">Enter your credentials</h4>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <button type="submit">
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>

          <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
