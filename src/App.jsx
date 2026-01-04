import { BrowserRouter } from "react-router";
import Home from "./components/Home";
import { Routes } from "react-router";
import { Route } from "react-router";
import Register from "./components/Register";
import Reportissue from "./components/reportissue";
import Transparencymap from "./components/Transparencymap";
import Checkstatus from "./components/Checkstatus";


const App=()=>{
  return(
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/transparencymap" element={<Transparencymap/>}/>
    <Route path="/reportissue" element={<Reportissue/>}/>
    <Route path="/checkstatus" element={<Checkstatus/>}/>
  </Routes>
  </BrowserRouter>
  
  </>
  )
 }
 export default App;