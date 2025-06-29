import React, { useState, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Fav from "./pages/Fav/Fav";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import ItemDisplay from "./components/ItemDisplay/ItemDisplay";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ContactPage from "./components/ContactPage/ContactPage";
import About from "./components/About/About";
import Success from "./pages/Success/Success";
import Cancel from "./pages/Cancel/Cancel";
import Verify from "./pages/Verify";
// import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

const AdminRoute = ({ children }) => {
  const { token, role } = useContext(StoreContext);
  return token && role === "admin" ? children : <Navigate to="/" />;
};

const UserRoute = ({ children }) => {
  const { token } = useContext(StoreContext);
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  const [category] = useState("All");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ItemDisplay category={category} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/fav"
          element={
            <UserRoute>
              <Fav />
            </UserRoute>
          }
        />
        <Route
          path="/order"
          element={
            <UserRoute>
              <PlaceOrder />
            </UserRoute>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/verify" element={<Verify />} />

        {/* <Route path="/add" element={<AdminRoute><AdminDashboard /></AdminRoute>} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
