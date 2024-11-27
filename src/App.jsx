import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import EventDetails from "./components/EventDetails";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EventsPage from "./components/EventsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsService from "./pages/TermsService";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/venue" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-service" element={<TermsService />} />
          <Route path="/contact" element={<Contact />} />
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
  );
};

export default App;
