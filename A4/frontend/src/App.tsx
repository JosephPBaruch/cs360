import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pets from './Pets';
import './App.css';
import Owners from './Owners';
import Owns from './Owns';
import Likes from './Likes';
import Purchases from './Purchases';

const basename = '/frontend'; 

function App() {
  return (
    <Router basename={basename}>
      <header>
        <h1>Pet/Owner Schema</h1>
        <nav>
          <Link to="/pets">Pets </Link>
          <Link to="/owners">Owners </Link>
          <Link to="/owns">Owns </Link> 
          <Link to="/likes">Likes </Link> 
          <Link to="/purchases">Purchases </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/pets" element={<Pets />} />
        <Route path="/owners" element={<Owners />} />
        <Route path="/owns" element={<Owns />} /> 
        <Route path="/likes" element={<Likes />} /> 
        <Route path="/purchases" element={<Purchases />} /> 
      </Routes>
    </Router>
  );
}

export default App;