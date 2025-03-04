import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register'
import Home from './Home'
// import ProtectedRoute from './ProtectedRoute';
import './App.css';

const basename = '/frontend'; // Set the basename to match the subpath in Ingress

function App() {
  return (
    <Router
    basename={basename}
    >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> */}
          <Route path="/home" element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;