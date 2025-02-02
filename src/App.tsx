import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Fertilizer from "./pages/fertilizer";
import Home from "./pages/home";
import Cultivation from "./pages/cultivation";

export default function App (){
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fertilizer" element={<Fertilizer />} />
      <Route path="/cultivation" element = {<Cultivation/>} />
    </Routes>

  </Router>)
}