import React from "react";
import { Link, useLocation } from "react-router-dom";

const Menu = () => {
  const { pathName } = useLocation();

  const isActive = (pn) => {
    if (pn === pathName) return "active";
  };
  const navLinks = [
    { label: "Trang chủ", icon: "fa-earth-asia", path: "/" },
    { label: "Người dùng", icon: "fa-user-gear", path: "/users" },
    { label: "Bài viết", icon: "fa-file-pen", path: "/posts" },
    { label: "Báo cáo", icon: "fa-flag", path: "/report" },
  ];
  return (
    <div className="menu">
      <ul className="navbar-nav flex-col">
        {navLinks.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link
              className={`nav-link ${isActive(link.path)} d-flex align-items-center`}
              to={link.path}
            >
              <i className={`fa-solid ${link.icon}`}></i>
              <small style={{paddingLeft: "5px"}}>{link.label}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
