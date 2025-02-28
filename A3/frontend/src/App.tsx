import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import Home from './Home'
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
    </Router>
  );
}

export default App;