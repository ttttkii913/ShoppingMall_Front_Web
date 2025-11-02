import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/Test.jsx";
import Home from "../pages/home/Home.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Login from "../pages/login/Login.jsx";
import Product from "../pages/product/Product.jsx";

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
