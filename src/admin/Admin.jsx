import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreateProductForm from './components/Products/CreateProductForm';
import ListProducts from './components/Products/ListProducts';
import OrdersTable from './components/OrdersTable';
import CustomersTable from './components/CustomersTable';
import DashboardMenu from './components/Dashboard/DashboardMenu';
import VariationsPage from './components/Variations/VariationsPage';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const menu = [
  { name: 'Dashboard', path: '/admin', icon: <DashboardIcon /> },
  { name: 'Products', path: '/admin/products'},
  { name: 'Customers', path: '/admin/customers', icon: <PeopleIcon /> },
  { name: 'Orders', path: '/admin/orders', icon: <LocalShippingIcon /> },
];

const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState('/admin');

  return (
    <div className="flex h-[100vh]">
      <CssBaseline />
      {/* Sidebar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '15%',
          height: '100vh',
          bgcolor: '#0f1530',
          overflowY: 'auto',
        }}
      >
        <Sidebar
          menu={menu}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          navigate={navigate}
        />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: '15%',
          width: '85%',
          background: 'linear-gradient(to bottom right, #001a40, #004488, #001a40)',
          height: '100vh',
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {/* Header */}
        <Header />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DashboardMenu />} />
          <Route path="/product/create" element={<CreateProductForm />} />
          <Route path="/product/list" element={<ListProducts />} />
          <Route path="/orders" element={<OrdersTable />} />
          <Route path="/customers" element={<CustomersTable />} />
          <Route path="/product/:productId/variations" element={<VariationsPage />} />
        </Routes>
      </Box>
    </div>
  );
};

export default Admin;
