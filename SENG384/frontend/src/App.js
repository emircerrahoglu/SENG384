import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import PeopleList from './components/PeopleList';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Register</Link>
          <Link to="/people">People List</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/people" element={<PeopleList />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;