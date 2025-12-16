import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink, Link, useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React 101",
    price: 49,
    short: "Build modern user interfaces with React.",
    description:
      "React 101 covers the fundamentals of React including components, props, state, and hooks. You will build several practical projects and learn best practices for structuring React applications. By the end, you'll be comfortable building interactive UIs and thinking in components."
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    price: 39,
    short: "Master the language of the web.",
    description:
      "A thorough introduction to JavaScript focusing on modern syntax, asynchronous programming, and core browser APIs. The course includes exercises on DOM manipulation, fetch API, and practical tips for debugging and performance."
  },
  {
    id: 3,
    title: "UI Basics",
    price: 29,
    short: "Design better user interfaces.",
    description:
      "UI Basics teaches layout, visual hierarchy, and accessible patterns for building intuitive UIs. Learn spacing, typography, color use, and how to craft interfaces that communicate clearly and work well across devices."
  },
  {
    id: 4,
    title: "Web Accessibility",
    price: 35,
    short: "Make web content accessible to everyone.",
    description:
      "Learn principles and techniques to make websites usable by people with disabilities. The course covers semantic HTML, ARIA, keyboard navigation, and testing tools to ensure inclusive experiences."
  }
];

function Home() {
  return (
    <section>
      <div className="hero">
        <div className="hero-inner">
          <h1>Learn Practical Skills Online</h1>
          <p className="tagline">Flexible, project-based courses taught by industry practitioners. Learn at your own pace and build real work-ready skills.</p>
          <Link to="/courses" className="btn primary">Browse Courses</Link>
        </div>
      </div>

      <section className="features">
        <h2>Why Learn With Us</h2>
        <div className="grid">
          <div className="card small">
            <h3>Flexible Learning</h3>
            <p>Self-paced lessons, bite-sized videos, and downloadable resources.</p>
          </div>
          <div className="card small">
            <h3>Expert Instructors</h3>
            <p>Courses designed and delivered by practitioners with real-world experience.</p>
          </div>
          <div className="card small">
            <h3>Affordable Pricing</h3>
            <p>High-quality content at competitive prices with no surprise fees.</p>
          </div>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Courses</h2>
        <div className="grid">
          {courses.slice(0, 3).map((c) => (
            <Link to={`/courses/${c.id}`} className="card featured" key={c.id}>
              <h3>{c.title}</h3>
              <p>{c.short}</p>
              <p className="price">${c.price}</p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About Our Platform</h1>
      <p>We help learners gain practical skills that prepare them for real-world projects and career growth. Our content focuses on hands-on, project-driven learning combined with best-practice guidance.</p>

      <h2>Who Is This For?</h2>
      <ul>
        <li>Beginners starting their journey into web development</li>
        <li>Professionals looking to sharpen practical skills</li>
        <li>Designers wanting to improve implementation collaboration</li>
      </ul>

      <h2>Our Values</h2>
      <p>Quality education should be accessible, relevant, and practical. We focus on clarity, inclusivity, and measurable outcomes for our students.</p>
    </section>
  );
}

function Courses() {
  return (
    <section>
      <div className="page-head">
        <h1>Courses</h1>
        <p>Explore our curated selection of short, practical courses.</p>
      </div>

      <div className="grid course-grid">
        {courses.map((c) => (
          <Link to={`/courses/${c.id}`} className="card course-card" key={c.id}>
            <div>
              <h3>{c.title}</h3>
              <p className="muted">{c.short}</p>
            </div>
            <div className="card-footer">
              <span className="price">${c.price}</span>
              <span className="chev">›</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all required fields (Name, Email, Message).");
      return;
    }
    setSuccess("Thanks! Your message has been received (mock). We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section>
      <h1>Contact</h1>
      <p>If you have questions about courses or need help, send us a message and we'll respond shortly.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name (required)
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        <label>
          Email (required)
          <input name="email" value={form.email} onChange={handleChange} type="email" />
        </label>
        <label>
          Message (required)
          <textarea name="message" value={form.message} onChange={handleChange} rows={5} />
        </label>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="form-actions">
          <button type="submit" className="btn primary">Send Message</button>
        </div>
      </form>
    </section>
  );
}

function Stars({ value = 0 }) {
  return (
    <div className="stars" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? "star on" : "star"}>★</span>
      ))}
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === id);
  const [feedback, setFeedback] = useState([]);
  const [form, setForm] = useState({ name: "", rating: 5, comment: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const key = `feedback_course_${id}`;
    const raw = localStorage.getItem(key);
    setFeedback(raw ? JSON.parse(raw) : []);
  }, [id]);

  if (!course) return <Navigate to="/courses" replace />;

  function saveFeedback(next) {
    const key = `feedback_course_${id}`;
    localStorage.setItem(key, JSON.stringify(next));
    setFeedback(next);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRating(v) {
    setForm({ ...form, rating: v });
  }

  function submitFeedback(e) {
    e.preventDefault();
    setMessage("");
    if (!form.comment.trim()) {
      setMessage("Please add a comment to submit feedback.");
      return;
    }
    const entry = {
      id: Date.now(),
      name: form.name.trim() || "Anonymous",
      rating: Number(form.rating),
      comment: form.comment.trim(),
      createdAt: new Date().toISOString()
    };
    const next = [entry, ...feedback];
    saveFeedback(next);
    setForm({ name: "", rating: 5, comment: "" });
  }

  function buyCourse() {
    alert(`Thanks for choosing \"${course.title}\" — this is a mock purchase.`);
  }

  return (
    <section>
      <div className="page-head">
        <h1>{course.title}</h1>
        <p className="muted">{course.short}</p>
      </div>

      <div className="detail">
        <div className="card">
          <p>{course.description}</p>
          <div className="buy-row">
            <span className="price large">${course.price}</span>
            <button className="btn primary" onClick={buyCourse}>Buy Course</button>
          </div>
        </div>

        <div className="feedback">
          <h2>Feedback</h2>
          <form className="feedback-form" onSubmit={submitFeedback}>
            <label>
              Name (optional)
              <input name="name" value={form.name} onChange={handleChange} placeholder="Anonymous" />
            </label>

            <label>
              Rating
              <div className="rating-input">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    className={i + 1 <= form.rating ? "rating-btn on" : "rating-btn"}
                    onClick={() => handleRating(i + 1)}
                    aria-label={`Rate ${i + 1}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </label>

            <label>
              Comment
              <textarea name="comment" value={form.comment} onChange={handleChange} rows={4} />
            </label>

            {message && <p className="error">{message}</p>}

            <div className="form-actions">
              <button type="submit" className="btn">Submit Feedback</button>
            </div>
          </form>

          <div className="feedback-list">
            {feedback.length === 0 && <p className="muted">No feedback yet — be the first to comment.</p>}
            {feedback.map((f) => (
              <div className="fb-item" key={f.id}>
                <div className="fb-head">
                  <strong>{f.name}</strong>
                  <Stars value={f.rating} />
                </div>
                <p className="fb-comment">{f.comment}</p>
                <div className="fb-meta"><small>{new Date(f.createdAt).toLocaleString()}</small></div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} CourseSite</div>
          <div className="muted">Built as a demo project</div>
        </div>
      </footer>
    </div>
  );
}
