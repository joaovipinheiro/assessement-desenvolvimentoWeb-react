import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Countries from "./pages/Countries";
import Authorities from "./pages/Authorities";
import Agendas from "./pages/Agendas";
import NotFound from "./pages/NotFound";
import "./App.css";

const App = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Countries />} />
            <Route path="/countries" element={<Countries />} />
            <Route path="/countries/:countryId" element={<Countries />} />
            <Route path="/authorities/:countryId" element={<Authorities />} />
            <Route path="/agendas/:countryId" element={<Agendas />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
