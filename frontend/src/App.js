import React from "react";
import ProductList from "./components/ProductList/ProductList";
import HomePage from "./pages/HomePage";
import Login from "./components/LoginForm/Login";
import Register from "./components/RegistrationForm/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer2 from "./components/MainPage/Footer";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import VoucherListPage from "./pages/VoucherPage";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/voucher" element={<VoucherListPage />} />
      </Routes>
    </>
  );
};

export default App;
