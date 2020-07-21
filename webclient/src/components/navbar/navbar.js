import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import { AccountCircleOutlined, LockOpen, Lock } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
}));

const createNavigationAction = ({ to, label, value, icon }) => (
  <BottomNavigationAction
    key={label}
    value={value}
    component={Link}
    to={to}
    label={label}
    icon={icon}
  />
);
const menuItems = [
  {
    label: "Profile",
    to: "/home",
    value: "profile",
    icon: <AccountCircleOutlined />,
  },

  { label: "Logout", to: "/", value: "logout", icon: <LockOpen /> },
  { label: "Login", to: "/login", value: "login", icon: <Lock /> },
];
export default () => {
  const isAuthUser = useSelector((state) => state.loginStore.isAuthUser);
  const dispatch = useDispatch();

  const [selectedMenu, setSelectedMenu] = useState("");
  const classes = useStyles();

  return (
    <BottomNavigation
      value={selectedMenu}
      onChange={(event, newValue) => {
        setSelectedMenu(newValue);
        if (selectedMenu === "logout") {
          dispatch(logout());
        }
      }}
      showLabels
      className={classes.stickToBottom}
    >
      {isAuthUser
        ? menuItems
            .filter((item) => item.label !== "Login")
            .map(createNavigationAction)
        : menuItems
            .filter((item) => item.label === "Login")
            .map(createNavigationAction)}
      )
    </BottomNavigation>
  );
};
