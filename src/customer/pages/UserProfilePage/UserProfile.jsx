import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HomeIcon from "@mui/icons-material/Home";
import LockIcon from "@mui/icons-material/Lock";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Profile from "./Profile";

const UserProfile = () => {
  const menu = [
    {
      name: "Tài khoản của tôi",
      icon: <AccountCircleIcon />,
    },
    {
      name: "Ngân hàng",
      icon: <AccountBalanceIcon />,
    },
    {
      name: "Địa chỉ",
      icon: <HomeIcon />,
    },
    {
      name: "Đổi mật khẩu",
      icon: <LockIcon />,
    },
    {
      name: "Đơn mua",
      icon: <ViewListIcon />,
    },
  ];

  const [selectedItem, setSelectedItem] = useState(menu[0].name);

  const contentMap = {
    "Tài khoản của tôi": <Profile/>,
    "Ngân hàng": <div>Nội dung Ngân hàng</div>,
    "Địa chỉ": <div>Nội dung Địa chỉ</div>,
    "Đổi mật khẩu": <div>Nội dung Đổi mật khẩu</div>,
    "Đơn mua": <div>Nội dung Đơn mua</div>,
  };

  return (
    <div className="mx-75">
      <div className="grid grid-cols-5">
        <div className="mt-10 col-span-1">
          <List>
            {menu.map((item, index) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton onClick={() => setSelectedItem(item.name)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
                <Divider />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="my-4 col-span-4 shadow-xl">
          {contentMap[selectedItem]}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
