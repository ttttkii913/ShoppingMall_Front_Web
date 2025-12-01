import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/Test.jsx";
import Home from "../pages/home/Home.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Login from "../pages/login/Login.jsx";
import Product from "../pages/product/Product.jsx";
import Cart from "../pages/cart/Cart.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import ProductDetail from "../pages/productdetail/ProductDetail.jsx";
import LoginCallback from "../pages/login/LoginCallback.jsx";
import Join from "../pages/join/Join.jsx";
import Chatting from "../pages/chat/Chatting.jsx";
import AdminChat from "../pages/chat/AdminChat.jsx";

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login/:provider" element={<LoginCallback />} />
        <Route path="/chatting/new" element={<Chatting />} />
        <Route path="/chatting/:roomId" element={<Chatting />} />
        <Route path="/chatting/admin" element={<AdminChat />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    <Footer />
    </BrowserRouter>
  );
}
