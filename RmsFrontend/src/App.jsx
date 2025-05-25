import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Menu from './pages/Menu';
import BasketPage from './pages/Basket';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
