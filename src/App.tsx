import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ResumeTitle from './Components/ResumeTitle';
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';


import ResumesPage from './pages/dashboard/resumes/Resumes';
import SettingsPage from './pages/dashboard/settings/Settings';

import ProtectedRoute from './utils/ProtectedRoute';
import DashboardLayout from './pages/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={() =>{}} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="resumes" replace />} />
          <Route path="resumes" element={<ResumesPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


