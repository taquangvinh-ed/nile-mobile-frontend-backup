import React from "react";
import { useLocation } from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import ProductsMenu from "./Products/ProductsMenu";
import StyleIcon from '@mui/icons-material/Style';

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    name: "Brands",
    path: "/admin/brands",
    icon: <StyleIcon />,
  },
  {
    name: "Products",
    path: "",
    icon: <></>,
    subMenu: [
      {
        name: "List",
        path: "/admin/product/list",
      },
      {
        name: "Create",
        path: "/admin/product/create",
      },
    ],
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <OrdersIcon />,
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: <PeopleIcon />,
  },
];

const Sidebar = ({ navigate }) => {
  const location = useLocation(); // Lấy đường dẫn hiện tại

  const handleMenuClick = (path) => {
    navigate(path); // Điều hướng đến đường dẫn được chọn
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#212529",
        borderRight: "1px solid black",
        color: "gray",
        height: "100%",
      }}
    >
      {/* Logo and Store Name */}
      <Box
        sx={{
          display: "fixed",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          bgcolor: "#212529",
          color: "white"
        }}
      >
        <img
          src="/logo.ico"
          alt="Nile Mobile Store Logo"
          style={{ width: "40px", height: "40px", marginRight: "8px" }}
        />
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Nile Mobile</span>
      </Box>

      {/* Menu List */}
      <List>
        {menu.map((item) => {
          if (item.name === "Products") {
            // Sử dụng ProductsMenu cho submenu của Products
            return (
              <ProductsMenu
                key={item.name}
                menu={item}
                navigate={navigate}
                location={location}
              />
            );
          }

          const isActive = location.pathname === item.path;

          return (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => handleMenuClick(item.path)}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{ color: isActive ? "white" : "gray" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{
                    color: isActive ? "white" : "gray",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
