import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import MenuPage from './pages/MenuPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/menuPage" element={<MenuPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
