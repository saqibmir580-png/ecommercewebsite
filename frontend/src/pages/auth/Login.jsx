import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContex";
import { CourseData } from "../../context/CourseContex";
export const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { fetchMyCourse } = CourseData();
  const submitHandler = async (e) => {
    e.preventDefault();
    await loginUser(email, password, navigate,fetchMyCourse);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="email"> Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password"> Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button disabled={btnLoading} className="common-btn" type="submit">
            {btnLoading ? "Please Wait" : "Login"}
          </button>
        </form>
        <p>
          Don't have an account?<Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};
