import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
import Authentication from "./pages/Authentication/Authentication";
import Dashboard from "./pages/Dashboard/Dashboard";
import { useContext } from "react";
import { DatabaseProvider } from "./contexts/DatabaseContext";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
 
function App() {
  return (
    <Router>
      <AuthProvider>
        <DatabaseProvider>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Authentication />} />

            {/* Protected Route */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/product" element={<ProtectedRoute><SingleProduct /></ProtectedRoute>} />

            {/* Redirect to login or dashboard */}
            <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </DatabaseProvider>
      </AuthProvider>
    </Router>
  );
}

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? children : <Navigate to="/login" replace />;
};

export default App;
