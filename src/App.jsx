import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Products from './pages/Products';
import Members from './pages/Members';
import DashboardLayout from './layouts/DashboardLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/admin/products" replace />} />
        <Route path="products" element={<Products />} />
        <Route path="members" element={<Members />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}

export default App;
