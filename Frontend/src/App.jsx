// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./components/auth/ProtectedRoute"

import LandingPage from "./pages/LandingPage"
import RestaurantSignup from "./pages/Restaurant-side/auth/Signup"
import CustomerSignup from "./pages/Customer-side/auth/Signup"
import RestaurantLogin from "./pages/Restaurant-side/auth/Login"
import CustomerLogin from "./pages/Customer-side/auth/Login"
import RestaurantResetPassword from "./pages/Restaurant-side/auth/ResetPassword"
import CustomerResetPassword from "./pages/Customer-side/auth/ResetPassword"
import RestaurantVerifyEmail from "./pages/Restaurant-side/auth/VerifyEmail"
import CustomerVerifyEmail from "./pages/Customer-side/auth/VerifyEmail"
import RestaurantOnboarding from "./pages/Restaurant-side/Onboarding"
import RestaurantDashboard from "./pages/Restaurant-side/Dashboard"
import RestaurantMenu from "./pages/Restaurant-side/Menu"
import RestaurantStaff from "./pages/Restaurant-side/Staff"
import RestaurantOrders from "./pages/Restaurant-side/Orders"
import RestaurantTableBooking from "./pages/Restaurant-side/TableBooking"
import RestaurantSettings from "./pages/Restaurant-side/Settings"
import CustomerRestaurants from "./pages/Customer-side/Restaurants"
import CustomerMenu from "./pages/Customer-side/Menu"
import CustomerOrders from "./pages/Customer-side/Orders"
import CustomerTableBooking from "./pages/Customer-side/TableBooking"
import CustomerSettings from "./pages/Customer-side/Settings"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/Restaurant-side/Signup" element={<RestaurantSignup />} />
        <Route path="/Customer-side/Signup" element={<CustomerSignup />} />
        <Route path="/Restaurant-side/Login" element={<RestaurantLogin />} />
        <Route path="/Customer-side/Login" element={<CustomerLogin />} />
        <Route path="/Restaurant-side/ResetPassword" element={<RestaurantResetPassword />} />
        <Route path="/Customer-side/ResetPassword" element={<CustomerResetPassword />} />
        <Route path="/Restaurant-side/VerifyEmail" element={<RestaurantVerifyEmail />} />
        <Route path="/Customer-side/VerifyEmail" element={<CustomerVerifyEmail />} />

        {/* Protected — Restaurant */}
        <Route path="/Restaurant-side/Onboarding" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantOnboarding /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/Dashboard" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantDashboard /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/Menu" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantMenu /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/Staff" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantStaff /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/Orders" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantOrders /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/TableBooking" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantTableBooking /></ProtectedRoute>
        } />
        <Route path="/Restaurant-side/Settings" element={
          <ProtectedRoute allowedRole="restaurant"><RestaurantSettings /></ProtectedRoute>
        } />

        {/* Protected — Customer */}
        <Route path="/Customer-side/Restaurants" element={
          <ProtectedRoute allowedRole="customer"><CustomerRestaurants /></ProtectedRoute>
        } />
        <Route path="/Customer-side/Menu" element={
          <ProtectedRoute allowedRole="customer"><CustomerMenu /></ProtectedRoute>
        } />
        <Route path="/Customer-side/Orders" element={
          <ProtectedRoute allowedRole="customer"><CustomerOrders /></ProtectedRoute>
        } />
        <Route path="/Customer-side/TableBooking" element={
          <ProtectedRoute allowedRole="customer"><CustomerTableBooking /></ProtectedRoute>
        } />
        <Route path="/Customer-side/Settings" element={
          <ProtectedRoute allowedRole="customer"><CustomerSettings /></ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App