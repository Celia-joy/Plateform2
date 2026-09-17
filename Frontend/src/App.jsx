import {useState, useEffect} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
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

function App() {
  const [message, setMessage] = useState("Loading...")
  useEffect(()=>{
    fetch("http://localhost:3000/")
    .then((res) => res.text())
    .then((data) => setMessage(data))
    .catch(() => setMessage("Could not reach backend"))

  })
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<LandingPage />} />
   <Route path="/Restaurant-side/Signup" element={<RestaurantSignup />} />
   <Route path="/Customer-side/Signup" element={<CustomerSignup />} />
   <Route path="/Restaurant-side/Login" element={<RestaurantLogin/>} />
   <Route path="/Customer-side/Login" element={<CustomerLogin/>} />
   <Route path="/Restaurant-side/ResetPassword" element={<RestaurantResetPassword/>}/>
   <Route path="/Customer-side/ResetPassword" element={<CustomerResetPassword/>}/>
   <Route path="/Restaurant-side/VerifyEmail" element={<RestaurantVerifyEmail/>}/>
   <Route path="Customer-side/VerifyEmail" element={<CustomerVerifyEmail/>}/>
   <Route path="/Restaurant-side/Onboarding" element={<RestaurantOnboarding/>}/>
   <Route path="/Restaurant-side/Dashboard" element={<RestaurantDashboard/>}/>
   <Route path="/Restaurant-side/Menu" element={<RestaurantMenu/>} />
   <Route path="/Restaurant-side/Staff" element={<RestaurantStaff/>} />
   <Route path="/Restaurant-side/Orders" element={<RestaurantOrders/>} />
   <Route path="/Restaurant-side/TableBooking" element={<RestaurantTableBooking/>} />
   <Route path="/Restaurant-side/Settings" element={<RestaurantSettings/>} />
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App