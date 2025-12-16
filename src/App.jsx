import React from "react";
import { Routes, Route, Navigate, NavLink, Link, useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React 101",
    price: 49,
    description: "Learn the fundamentals of React, including JSX, components, state, and props. A hands-on introduction to building interactive single-page applications."
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    price: 39,
    description: "Master core JavaScript concepts: variables, functions, arrays, objects, and asynchronous code. Perfect for beginners and seasoned developers.",
  },
  {
    id: 3,
    title: "UI Basics",
    price: 29,
    description: "Explore the principles of user interface design, layout, typography, and color. Build accessible, clean, and usable UIs.",
  },
  {
    id: 4,
    title: "Web Accessibility",
    price: 35,
    description: "Learn how to make the web accessible for users of all abilities. ARIA roles, semantic markup, and accessibility testing practices.",
  },
];

function Home() {
  return (
    <section>
      <div className="hero">
        <h1>Learn Practical Skills Online</h1>
        <p className="tagline">
          Hands-on courses taught by experts — learn at your own pace and build real-world skills.
        </p>
        <Link to="/courses" className="primary btn-hero">
          View Courses
        </Link>
      </div>

      <div className="benefits">
        <h2>Why choose us?</h2>
        <div className="grid">
          <div className="card benefit-card">
            <h3>Flexible Learning</h3>
            <p>Access courses anytime, anywhere — learn at your own pace.</p>
          </div>
          <div className="card benefit-card">
            <h3>Expert Instructors</h3>
            <p>Courses created and taught by industry professionals.</p>
          </div>
          <div className="card benefit-card">
            <h3>Affordable Prices</h3>
            <p>High-quality courses at prices you can afford.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About Us</h1>
      <p>
        Our mission is to make practical skills accessible to learners everywhere. We provide
        courses that focus on real-world projects and hands-on experience.
      </p>

      <div className="about-section">
        <h2>Who is this for?</h2>
        <p>
          Whether you are a beginner wanting to start a new career, a developer looking to
          expand your skillset, or a hobbyist curious about technology — our courses are designed
          to help you progress.
        </p>
      </div>

      <div className="about-section">
        <h2>Our values</h2>
        <ul>
          <li>Quality content by real practitioners</li>
          <li>Community and support</li>
          <li>Continuous learning mindset</li>
        </ul>
      </div>
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
          <Link to={`/courses/${c.id}`} key={c.id} className="card">
            <h3>{c.title}</h3>
            <p className="price">${c.price}</p>
            <p className="desc">{c.description.slice(0, 80)}{c.description.length > 80 ? "…" : ""}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !msg.trim()) {
      alert("Please fill out the required fields.");
      return;
    }
    setSubmitted(true);
    // Mock submission
    setTimeout(() => {
      alert("Thanks for contacting us. We'll get back shortly.");
      setName("");
      setEmail("");
      setMsg("");
      setSubmitted(false);
    }, 500);
  };
  return (
    <section>
      <h1>Contact</h1>
      <p>We would love to hear from you. Use the form below and we'll get back to you shortly.</p>

      <form onSubmit={submit} className="contact-form">
        <div>
          <label>Name (optional):</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <label>Email (required):</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label>Message (required):</label>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} required />
        </div>
        <button type="submit" className="primary" disabled={submitted}>
          {submitted ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return (
      <section>
        <h1>Course Not Found</h1>
        <p>The requested course does not exist.</p>
      </section>
    );
  }

  const [bought, setBought] = React.useState(false);

  return (
    <section>
      <h1>{course.title}</h1>
      <p className="price">${course.price}</p>
      <p>{course.description}</p>
      <button
        className="primary"
        onClick={() => {
          setBought(true);
          alert(`Thanks for purchasing ${course.title}!`);
        }}
      >
        {bought ? "Purchased" : "Buy Course"}
      </button>

      <FeedbackSection courseId={course.id} />
    </section>
  );
}

function FeedbackSection({ courseId }) {
  const storageKey = `feedback_course_${courseId}`;
  const [feedback, setFeedback] = React.useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");

  const addFeedback = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      rating,
      comment: comment.trim(),
      date: new Date().toISOString()
    };
    const updated = [newEntry, ...feedback];
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch {
      // ignore
    }
    setFeedback(updated);
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="feedback">
      <h3>Feedback</h3>
      <form onSubmit={addFeedback} className="feedback-form">
        <div>
          <label>Name (optional):</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Anonymous" />
        </div>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1,2,3,4,5].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? 'star' : 'stars'}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </div>
        <button type="submit" className="secondary">Submit Feedback</button>
      </form>

      {feedback.length > 0 ? (
        <div className="feedback-list">
          {feedback.map((f) => (
            <div key={f.id} className="feedback-item">
              <div className="feedback-header">
                <strong>{f.name}</strong> - {"★".repeat(f.rating)}
              </div>
              <p className="feedback-comment">{f.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No feedback yet. Be the first to leave a review!</p>
      )}
    </div>
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
        <span>Courses Demo</span>
      </footer>
    </div>
  );
}
