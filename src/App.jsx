import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home.jsx";
import Navigation from "../components/Navigation/Navigation.jsx";
import Main from "../components/Main/Main.jsx";
import Admin from "../components/AdminPanel/Admin.jsx";
import AdminAddNews from "../components/AdminPanel/AdminAddNews.jsx";
import NavAdmin from "../components/AdminPanel/NavAdmin.jsx";
import EditNews from "../components/AdminPanel/EditNews.jsx";

export default function App() {
  return (
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/admin" element={<NavAdmin />} />
      <Route path="/admin/users" element={<Admin />} />
      <Route path="/admin/addnews" element={<AdminAddNews />} />
      <Route path="/admin/addnews/editnews/:id" element={<EditNews />} />
    </Routes>
  );
}
