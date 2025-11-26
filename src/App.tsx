import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainContent from "./components/MainContent";
import ProductPage from "./components/ProductPage";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";

function App() {
  return (
    <Router>
      <div className="flex h-screen justify-center">
        <Sidebar />

        <div className="flex rounded flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />

            <Route path="/product/:id" element={<ProductPage />} />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>

          <div className="">
            <TopSellers />

            <PopularBlogs />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
