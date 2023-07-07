import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/BodyComponents/Home";

const MainRoute = () => {
  return (
    <Routes>
      <Route exact path="/signup" element={<Navigate to={"/home"} />} />
      <Route exact path="/" element={<Navigate to={"/home"} />} />
      <Route exact path="/login" element={<Navigate to={"/home"} />} />
      <Route exact path="/home" element={<Home />} />
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

export default MainRoute;
