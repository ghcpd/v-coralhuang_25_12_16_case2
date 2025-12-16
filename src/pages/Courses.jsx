import React from "react";
import { courses } from "../data/courses.js";

export default function Courses() {
  return (
    <section>
      <h1 className="h1">Courses</h1>
      <p className="p">All available courses (baseline: title + price only).</p>

      <div className="grid">
        {courses.map((c) => (
          <div className="card" key={c.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong>{c.title}</strong>
              <span>${c.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
