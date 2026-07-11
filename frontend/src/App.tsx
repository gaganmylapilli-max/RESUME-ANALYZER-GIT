import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
// These are the routing tools from react-router-dom library
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Analyze from './pages/Analyze';
import History from './pages/History';

function App() {
  return (
    <>
    <div className="bg-mesh"></div>
    <Router>
      <Navbar/>
      <main style={{maxWidth: '1200px', margin:'0 auto', padding: '2rem 1rem'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/analyze" element={<Analyze/>} />
          <Route path="/history" element={<History/>} />
        </Routes>

      </main>
    </Router>
    </>
  );
}

export default App;