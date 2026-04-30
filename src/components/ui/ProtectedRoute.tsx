import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // check localStorage for the user — same way Signin.tsx saves it
  const user = localStorage.getItem('user');

  if (!user) {
    // no user found — send them to signin page
    return <Navigate to="/signin" replace />;
  }

  // user found — let them through
  return <>{children}</>;
};

export default ProtectedRoute;