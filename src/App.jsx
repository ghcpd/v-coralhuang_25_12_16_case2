import React from "react";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";

const courses = [
  { id: 1, title: "React 101", price: 49 },
  { id: 2, title: "JavaScript Fundamentals", price: 39 },
  { id: 3, title: "UI Basics", price: 29 },
  { id: 4, title: "Web Accessibility", price: 35 }
];

function Home() {
  return (
    <section>
      <h1>Learn Online</h1>
      <p>A simple demo site for online courses.</p>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About</h1>
      <p>We provide quality online courses.</p>
    </section>
  );
}

function Courses() {
  return (
    <section>
      <h1>Courses</h1>
      <p>Browse our collection of courses.</p>
      <div className="grid">
        {courses.map((c) => (
          <div className="card" key={c.id}>
            <h3>{c.title}</h3>
            <p className="price">${c.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section>
      <h1>Contact</h1>
      <p>Get in touch with us.</p>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <NavLink to="/" className="brand">CourseSite</NavLink>
          <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "link active" : "link"}>About</NavLink>
            <NavLink to="/courses" className={({ isActive }) => isActive ? "link active" : "link"}>Courses</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "link active" : "link"}>Contact</NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>Courses Demo</span>
      </footer>
    </div>
  );
}
