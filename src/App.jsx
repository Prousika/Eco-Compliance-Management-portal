import { BrowserRouter } from "react-router";
import Home from "./components/Home";
import { Routes } from "react-router";
import { Route } from "react-router";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
import Register from "./components/Register";
import Reportissue from "./components/reportissue";
import Transparencymap from "./components/Transparencymap";
import Checkstatus from "./components/Checkstatus";
import EcoAwareness from "./components/EcoAwareness";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("ecoLoggedIn") === "true";

  if (!isLoggedIn) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          redirectTo: location.pathname,
          loginRequired: true,
          message: "Please login first to access this page.",
        }}
      />
    );
  }

  return children;
};

const App=()=>{
  return(
  <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/transparencymap" element={<Transparencymap/>}/>
    <Route
      path="/reportissue"
      element={
        <ProtectedRoute>
          <Reportissue />
        </ProtectedRoute>
      }
    />
    <Route
      path="/checkstatus"
      element={
        <ProtectedRoute>
          <Checkstatus />
        </ProtectedRoute>
      }
    />
    <Route path="/eco-awareness" element={<EcoAwareness/>}/>
  </Routes>
  </BrowserRouter>
  
  </>
  )
 }
 export default App;
