import React from "react";
import ProductList from "./components/ProductList/ProductList";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginForm/Login";
import Register from "./components/RegistrationForm/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer2 from "./components/MainPage/Footer";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default App;
