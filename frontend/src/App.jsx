import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
