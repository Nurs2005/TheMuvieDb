import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieInfo from './components/MuvieInfo/MovieInfo';
import MovieDetail from './components/MuvieDetails/MovieDetail';
function App() {
  return (
      <Routes>
        <Route path="/" element={<MovieInfo />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
  );
}

export default App;
