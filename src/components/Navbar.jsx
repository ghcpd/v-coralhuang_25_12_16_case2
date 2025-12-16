import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          CourseSite
        </NavLink>

        <nav className="links" aria-label="Primary">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "link active" : "link")}
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            About
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Courses
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
