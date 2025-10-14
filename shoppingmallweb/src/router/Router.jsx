import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../pages/Test.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
