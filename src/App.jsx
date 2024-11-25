import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import EventDetails from "./components/EventDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EventList from "./components/EventList";

const App = () => {
  const userType = localStorage.getItem("userType");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<EventList userType={userType} />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div className="text-center text-red-500 text-lg mt-10">
                  Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
