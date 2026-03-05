import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CgGitFork, CgFileDocument } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaMoon, FaSun } from "react-icons/fa";

const NAV_ITEMS = [
  { to: "/", icon: AiOutlineHome, label: "Home" },
  { to: "/about", icon: AiOutlineUser, label: "About" },
  { to: "/project", icon: AiOutlineFundProjectionScreen, label: "Projects" },
  { to: "/game", icon: IoGameControllerOutline, label: "Game" },
  { to: "/resume", icon: CgFileDocument, label: "Resume" },
];

function NavBar({ theme = "light", onToggleTheme }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="dock-bar">
      {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
        <Link
          key={to}
          to={to}
          className={`dock-item${isActive(to) ? " active" : ""}`}
        >
          <Icon className="dock-icon" />
          <span className="dock-label">{label}</span>
        </Link>
      ))}

      <div className="dock-separator" />

      <a
        className="dock-item"
        href="https://github.com/danvisai/Portfolio"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CgGitFork className="dock-icon" />
        <AiFillStar className="dock-icon dock-icon-star" />
        <span className="dock-label">GitHub</span>
      </a>

      <button
        type="button"
        className={`dock-theme-toggle${theme === "dark" ? " is-dark" : ""}`}
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span className="dock-theme-knob" />
        <FaSun className="dock-theme-icon dock-theme-icon-sun" />
        <FaMoon className="dock-theme-icon dock-theme-icon-moon" />
      </button>
    </nav>
  );
}

export default NavBar;
