import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Display from './Display';
import './App.css';

const basename = '/frontend'; // Set the basename to match the subpath in Ingress

function App() {
  return (
    <Router
    basename={basename}
    >
        <Routes>
          <Route path="/" element={<Display />} />
        </Routes>
    </Router>
  );
}

export default App;