
import ResumeTitle from './Components/ResumeTitle';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;


