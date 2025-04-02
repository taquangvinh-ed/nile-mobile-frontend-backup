import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CreateProductForm from './components/Products/CreateProductForm';
import ListProducts from './components/Products/ListProducts';
import OrdersTable from './components/OrdersTable';
import CustomersTable from './components/CustomersTable';
import DashboardMenu from './components/Dashboard/DashboardMenu';
import BrandsPage from './components/BrandsPage';
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
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  return (
    <div className="flex h-[100vh]">
      {/* Sidebar */}
      <Box
        sx={{
          position: isSidebarHidden ? 'absolute' : 'fixed',
          top: 0,
          left: 0,
          width: isSidebarHidden ? '0' : '15%', 
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#262d34',
          transition: 'width 0.3s, position 0.3s',
        }}
      >
        {!isSidebarHidden && (
          <Sidebar
            menu={menu}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            navigate={navigate}
          />
        )}
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          marginLeft: isSidebarHidden ? '0' : '15%',
          width: isSidebarHidden ? '100%' : '85%',
          background: '#1e1f22',
          height: '100vh',
          overflowY: 'auto',
          padding: '16px',
          transition: 'margin-left 0.3s, width 0.3s',
        }}
      >
        {/* Header */}
        <Header setIsSidebarHidden={setIsSidebarHidden} isSidebarHidden={isSidebarHidden} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DashboardMenu />} />
          <Route path="/brands" element={<BrandsPage />} />
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
