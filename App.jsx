import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTP from "./pages/OTP";

import Donation from "./pages/Donation";
import Request from "./pages/Request";

import DonorDashboard from "./pages/DonorDashboard";
import DonorProfile from "./pages/DonorProfile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminUserRecords from "./pages/AdminUserRecords";
import AdminCamp from "./pages/AdminCamp";
import AdminStock from "./pages/AdminStock";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/otp" element={<OTP />} />

      <Route path="/donation" element={<Donation />} />

      <Route path="/request" element={<Request />} />

      <Route path="/dashboard" element={<DonorDashboard />} />

      <Route path="/profile" element={<DonorProfile />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      <Route path="/admin/user" element={<AdminUserRecords />} />

      <Route path="/admin/camp" element={<AdminCamp />} />

      <Route path="/admin/stock" element={<AdminStock />} />

    </Routes>
  );
}

export default App;