import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import "./index.css";

const App = () => {
  return (
    <div>
      <Navbar />
      <About />
      <EventList />
      <Footer />
    </div>
  );
};

export default App;
