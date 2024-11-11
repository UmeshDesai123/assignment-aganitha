// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/home";
import BookFinder from "./pages/Book-Finder/BookFinder";
import Whether from "./pages/Weather/Weather";
import Recipe from "./pages/Recipe-idea/recipe";
import Earthquake from "./pages/Earthquake/earthquake";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Book Finder" element={<BookFinder />} />
          <Route path="/Weather Now" element={<Whether />} />
          <Route path="/Recipe Ideas" element={<Recipe />} />
          <Route path="/Earthquake Visualizer" element={<Earthquake />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
