import {useState, useEffect} from "react"
import LandingPage from "./pages/LandingPage"

function App() {
  const [message, setMessage] = useState("Loading...")
  useEffect(()=>{
    fetch("http://localhost:3000/")
    .then((res) => res.text())
    .then((data) => setMessage(data))
    .catch(() => setMessage("Could not reach backend"))

  })
  return (
   <LandingPage />
  )
}

export default App