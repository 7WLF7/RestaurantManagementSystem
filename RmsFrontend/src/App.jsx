import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import MenuPage from './pages/MenuPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/menuPage" element={<MenuPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
