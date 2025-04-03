import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pets from './Pets';
import './App.css';

const basename = '/frontend'; // Set the basename to match the subpath in Ingress

function App() {
  return (
    <Router
    basename={basename}
    >
        <Routes>
          <Route path="/" element={<Pets />} />
        </Routes>
    </Router>
  );
}

export default App;