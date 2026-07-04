import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Listings from "./pages/Listings";
import Interests from "./pages/Interests";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "15px",
          background: "#222",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link style={{ color: "white" }} to="/">
          Home
        </Link>

        <Link style={{ color: "white" }} to="/login">
          Login
        </Link>

        <Link style={{ color: "white" }} to="/register">
          Register
        </Link>

        <Link style={{ color: "white" }} to="/dashboard">
          Dashboard
        </Link>
      </nav>

      <Routes>
  <Route path="/" element={<Home />} />
<Route path="/chat" element={<Chat />} />
  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

  <Route path="/dashboard" element={<Dashboard />} />

  <Route path="/listings" element={<Listings />} />

  <Route path="*" element={<NotFound />} />
<Route
  path="/interests"
  element={<Interests />}
/></Routes>
    </BrowserRouter>
  );
}

export default App;