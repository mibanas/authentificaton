import { Route, Routes } from 'react-router-dom';
import './App.css';
import PublicRoute from './pages/public/PublicRoute';
import AdminRoute from './pages/admin/AdminRoute';


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/*' element={<PublicRoute />} />
          <Route path='/admin/*' element={<AdminRoute />} />
      </Routes>
    </div>
  );
}

export default App;
