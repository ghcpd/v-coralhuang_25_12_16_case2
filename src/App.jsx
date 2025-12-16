import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  NavLink,
  Link,
  useParams,
  useNavigate
} from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React 101",
    price: 49,
    short: "A friendly introduction to React.",
    description:
      "React 101 teaches you the fundamentals of React.js and how to build reusable components. You'll learn JSX, component composition, state and props, and practical patterns used in real projects. By the end of the course you'll be able to create small interactive applications and confidently read React codebases."
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    price: 39,
    short: "Core JavaScript — the language of the web.",
    description:
      "This course covers the essential JavaScript concepts every developer needs: types, functions, closures, asynchronous programming and the browser APIs. It focuses on practical examples and exercises so you can apply what you learn immediately."
  },
  {
    id: 3,
    title: "UI Basics",
    price: 29,
    short: "Design and build pleasant interfaces.",
    description:
      "UI Basics introduces layout, visual hierarchy, spacing, and simple animation to help you build clean, usable interfaces. The course includes hands-on practice with modern CSS techniques and component thinking for UI development."
  },
  {
    id: 4,
    title: "Web Accessibility",
    price: 35,
    short: "Make sites accessible to everyone.",
    description:
      "Learn accessibility fundamentals that improve the experience for all users: semantic HTML, keyboard navigation, ARIA basics, and testing strategies. The course mixes guidelines with practical fixes that you can apply to any existing project."
  }
];

function Home() {
  return (
    <section>
      <div className="hero">
        <div>
          <h1>Learn Practical Skills Online</h1>
          <p className="lead">
            Short, focused, and affordable courses taught by industry practitioners. Learn by building real projects and advance your career — at your own pace.
          </p>
          <p>
            <Link to="/courses" className="btn primary">Browse Courses</Link>
            <Link to="/about" className="btn ghost" style={{ marginLeft: 12 }}>
              Learn More
            </Link>
          </p>
        </div>
        <div className="hero-feat">
          <h4>Featured</h4>
          <div className="card small">
            <strong>React 101</strong>
            <div className="muted">From $49 — 6 lessons</div>
          </div>
          <div className="card small" style={{ marginTop: 12 }}>
            <strong>JavaScript Fundamentals</strong>
            <div className="muted">From $39 — 8 lessons</div>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 28 }}>
        <h2>Why learn with us?</h2>
        <div className="grid benefits">
          <div className="card">
            <h3>Practical learning</h3>
            <p className="muted">Hands-on lessons and small projects you can finish in a weekend.</p>
          </div>
          <div className="card">
            <h3>Expert instructors</h3>
            <p className="muted">Instructors with real industry experience and clear explanations.</p>
          </div>
          <div className="card">
            <h3>Affordable pricing</h3>
            <p className="muted">Transparent prices and frequent updates — no surprise subscriptions.</p>
          </div>
        </div>
      </section>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About CourseSite</h1>
      <p className="lead">We help developers learn practical web skills through short, focused courses.</p>

      <div className="grid" style={{ marginTop: 18 }}>
        <div className="card">
          <h3>Our mission</h3>
          <p>
            We believe learning should be accessible and project-focused. Our courses are curated to teach the most useful skills for building modern web apps.
          </p>
        </div>

        <div className="card">
          <h3>Who it's for</h3>
          <p>
            Whether you're starting out, switching careers, or upskilling for your job, our courses give practical steps and clear explanations so you progress quickly.
          </p>
        </div>

        <div className="card">
          <h3>Values</h3>
          <ul className="muted">
            <li>Clarity over complexity</li>
            <li>Practical outcomes</li>
            <li>Continuous improvement</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Courses</h1>
        <div className="muted">{courses.length} courses available</div>
      </div>

      <p style={{ marginTop: 8, marginBottom: 8 }}>
        Explore our catalog. Click any card to view full details, read feedback from other learners, or buy a course.
      </p>

      <div className="grid">
        {courses.map((c) => (
          <Link to={`/courses/${c.id}`} key={c.id} className="card card-link">
            <div>
              <h3>{c.title}</h3>
              <p className="muted">{c.short}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="price">${c.price}</div>
              <div className="muted" style={{ marginTop: 8 }}>View details →</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Feedback({ courseId }) {
  const storageKey = `feedback_${courseId}`;
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {}
  }, [items, storageKey]);

  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!comment.trim()) {
      setError("Please enter a comment.");
      return;
    }
    if (!rating || rating < 1 || rating > 5) {
      setError("Please provide a rating between 1 and 5.");
      return;
    }
    const entry = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString()
    };
    setItems([entry, ...items]);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <section style={{ marginTop: 20 }}>
      <h3>Feedback</h3>
      <p className="muted">Share your experience with this course. Feedback is stored locally in your browser.</p>

      <form onSubmit={submit} className="form feedback-form">
        <div className="form-row">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
        </div>

        <div className="form-row">
          <label>Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={n <= rating ? "star active" : "star"}
                onClick={() => setRating(n)}
                aria-label={`Rate ${n}`}>
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label>Comment</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} placeholder="What did you like? Anything to improve?" />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div style={{ marginTop: 10 }}>
          <button className="btn primary" type="submit">Submit Feedback</button>
        </div>
      </form>

      <div style={{ marginTop: 18 }}>
        {items.length === 0 && <div className="muted">No feedback yet — be the first to leave a comment.</div>}

        {items.map((it) => (
          <div className="card feedback" key={it.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{it.name}</strong>
                <div className="muted" style={{ fontSize: 13 }}>{new Date(it.date).toLocaleString()}</div>
              </div>
              <div className="rating small" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < it.rating ? "star active" : "star"}>★</span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 10 }}>{it.comment}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => String(c.id) === String(id));
  const [purchased, setPurchased] = useState(false);

  if (!course) {
    return (
      <section>
        <h1>Course not found</h1>
        <p className="muted">We couldn't find that course. Return to the courses list.</p>
        <p style={{ marginTop: 12 }}>
          <button className="btn" onClick={() => navigate('/courses')}>Back to courses</button>
        </p>
      </section>
    );
  }

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h1>{course.title}</h1>
          <div className="muted" style={{ marginBottom: 12 }}>{course.short}</div>
          <p style={{ lineHeight: 1.7 }}>{course.description}</p>

          <div style={{ marginTop: 18, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="price large">${course.price}</div>

            {!purchased ? (
              <button
                className="btn primary"
                onClick={() => {
                  setPurchased(true);
                  setTimeout(() => alert('Thank you — purchase simulated (no payment processed).'), 80);
                }}>
                Buy Course
              </button>
            ) : (
              <button className="btn" disabled>Purchased ✓</button>
            )}

            <Link to="/courses" className="btn ghost">Back to courses</Link>
          </div>

          <Feedback courseId={course.id} />
        </div>

        <aside style={{ width: 260 }}>
          <div className="card">
            <h4>Course summary</h4>
            <div className="muted">Price: <strong>${course.price}</strong></div>
            <div className="muted" style={{ marginTop: 8 }}>Duration: 4–8 hours (self-paced)</div>
            <div className="muted" style={{ marginTop: 8 }}>Level: Beginner → Intermediate</div>
            <div style={{ marginTop: 14 }}>
              <button className="btn primary" onClick={() => { setPurchased(true); alert('Thank you — purchase simulated.'); }}>Buy now</button>
            </div>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h4>Support</h4>
            <p className="muted">Have questions? Visit our contact page and we'll get back to you within 48 hours.</p>
            <Link to="/contact" className="btn ghost" style={{ marginTop: 8, display: 'inline-block' }}>Contact support</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email.trim() || !message.trim()) {
      setError("Please provide your email and a message.");
      return;
    }
    // mock submit
    setTimeout(() => setSuccess("Thanks — your message has been received (mock)."), 300);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section>
      <h1>Contact</h1>
      <p className="lead">Have a question or need help? Send us a message and we'll respond as soon as we can.</p>

      <div className="grid" style={{ marginTop: 18 }}>
        <div className="card" style={{ flex: 1 }}>
          <h3>Send us a message</h3>

          <form onSubmit={submit} className="form">
            <div className="form-row">
              <label>Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>

            <div className="form-row">
              <label>Email *</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>

            <div className="form-row">
              <label>Message *</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
            </div>

            {error && <div className="form-error">{error}</div>}
            {success && <div className="form-success">{success}</div>}

            <div style={{ marginTop: 10 }}>
              <button className="btn primary" type="submit">Send message</button>
            </div>
          </form>
        </div>

        <div style={{ width: 320 }}>
          <div className="card">
            <h4>Contact info</h4>
            <p className="muted">Email us at <strong>support@coursesite.example</strong> or use the form — we'll reply within 48 hours.</p>
            <p className="muted" style={{ marginTop: 10 }}>Follow us on social media for updates and new courses.</p>
          </div>

          <div className="card" style={{ marginTop: 12 }}>
            <h4>Office hours</h4>
            <p className="muted">Mon–Fri, 9am–5pm (support response times may vary).</p>
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
        <span>© {new Date().getFullYear()} CourseSite — Built for demos</span>
      </footer>
    </div>
  );
}
