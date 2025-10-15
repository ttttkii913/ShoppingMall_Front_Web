import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/Test.jsx";
import Home from "../pages/home/Home.jsx";
import Header from "../components/header/Header.jsx";

export default function Router() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
