import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ProductsMenu = ({ menu, navigate, location }) => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const toggleProductsMenu = () => {
    setIsProductsOpen((prev) => !prev);
  };

  const isSubMenuActive =
    menu.subMenu &&
    menu.subMenu.some((subItem) => location.pathname === subItem.path);

  return (
    <>
      <ListItem disablePadding onClick={toggleProductsMenu}>
        <ListItemButton>
          <ListItemIcon
            sx={{ color: isSubMenuActive ? "white" : "gray" }}
          >
            <SmartphoneIcon />
          </ListItemIcon>
          <ListItemText
            primary={menu.name}
            sx={{
              color: isSubMenuActive ? "white" : "gray",
            }}
          />
          {isProductsOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isProductsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.subMenu.map((subItem) => (
            <ListItem
              key={subItem.name}
              disablePadding
              onClick={() => handleMenuClick(subItem.path)}
            >
              <ListItemButton
                sx={{
                  pl: 11,
                }}
              >
                <ListItemText
                  primary={subItem.name}
                  sx={{
                    color:
                      location.pathname === subItem.path
                        ? "white"
                        : "gray",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default ProductsMenu;