import { useQuery } from "@apollo/client";

import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/MainPage/HeroBanner";
import Footer2 from "../components/MainPage/Footer";
import ProductList from "../components/ProductList/ProductList";
import Register from "../components/RegistrationForm/Register";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroBanner />
      <ProductList />
      <Footer2 />
    </>
  );
};

export default HomePage;
