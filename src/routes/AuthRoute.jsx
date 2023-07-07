import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/AuthComponents/Login";
import SignUp from "../components/AuthComponents/SignUp";
const AuthRoute = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Navigate to={"/login"} />} />
      <Route exact path="/home" element={<Navigate to={"/login"} />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route
        path="*"
        element={
          <div>
            <h2>404 Page not found</h2>
          </div>
        }
      />
    </Routes>
  );
};

export default AuthRoute;
