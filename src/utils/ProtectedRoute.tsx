import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const isAuthenticated = !!localStorage.getItem('token'); // or your auth logic

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
  return !isAuthenticated ? children : <Navigate to="/login" replace />;
}
