import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section>
      <h1 className="h1">Learn Online</h1>
      <p className="p">
        A minimal demo site for online courses. Browse courses and get in touch.
      </p>

      <Link to="/courses" className="button" style={{ display: "inline-block", textDecoration: "none", color: "inherit" }}>
        Browse Courses
      </Link>

      <div style={{ height: 16 }} />

      <div className="grid">
        <div className="card">
          <strong>Simple</strong>
          <p className="p">A baseline app with minimal UI and routing.</p>
        </div>
        <div className="card">
          <strong>Fast to extend</strong>
          <p className="p">Designed to be improved with new features.</p>
        </div>
        <div className="card">
          <strong>Clear structure</strong>
          <p className="p">Pages, components, and data are separated.</p>
        </div>
      </div>
    </section>
  );
}
