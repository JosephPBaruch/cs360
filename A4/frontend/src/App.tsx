import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pets from './Pets';
import './App.css';

const basename = '/frontend'; // Set the basename to match the subpath in Ingress

function App() {
  return (
    <Router basename={basename}>
      <header>
        <h1>Pet/Owner Schema</h1>
        <nav>
          <Link to="/pets">Pets</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/pets" element={<Pets />} />
      </Routes>
    </Router>
  );
}

export default App;