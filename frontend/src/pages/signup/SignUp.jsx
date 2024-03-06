// signup.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import GenderCheckbox from "./GenderCheckbox";
import "../../styles/signup.css"; 
import image from "../../images/collab.jpg";
import second from "../../images/collab.jpg";// Import styles

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="auth-container">
      <div className="auth-img">
        {/* Replace image source with appropriate logic */}
        <img className="rounded-image" src={image} alt="Authentication" />
      </div>
      <div className="s-curve"></div>
      <div className="auth">
        <div className="auth-form">
          <div className="logo">
            {/* Replace image source with appropriate logic */}
            <img src={second} alt="Logo" />
          </div>
          <h3 className="line">Enter info to Sign up your account !</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />

            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

            <p className="mid flex">
              <input
                type="checkbox"
                className="checkbox"
                checked={inputs.acceptTerms}
                onChange={() => setInputs({ ...inputs, acceptTerms: !inputs.acceptTerms })}
              />
              I accept the terms & conditions
            </p>

            <button type="submit">
              {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
            </button>

            <p className="mid">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
