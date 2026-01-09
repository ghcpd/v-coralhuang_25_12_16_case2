import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink, Link, useParams } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React 101",
    price: 49,
    short: "A practical introduction to React and component-based UI.",
    description:
      "React 101 teaches the fundamentals of React: components, props, state, and hooks. Through hands-on examples you'll build small apps, learn best practices, and gain confidence creating interactive user interfaces. Perfect for developers moving from static HTML to modern SPA development."
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    price: 39,
    short: "Core JavaScript concepts you need for modern web development.",
    description:
      "This course covers variables, functions, closures, async programming, and the modern ES6+ toolset. You'll gain practical skills for debugging, building modules, and writing clean code that works across browsers and runtimes."
  },
  {
    id: 3,
    title: "UI Basics",
    price: 29,
    short: "Design and build clean, accessible UI components.",
    description:
      "UI Basics focuses on layout, responsive design, and component patterns. Learn how to structure styles, create reusable components, and ensure designs are accessible and user-friendly across devices."
  },
  {
    id: 4,
    title: "Web Accessibility",
    price: 35,
    short: "Make websites usable for everyone with inclusive design.",
    description:
      "Web Accessibility introduces ARIA, semantic HTML, keyboard navigation, and screen reader testing. You'll learn practical techniques to make websites accessible and compliant with standards."
  }
];

function Header() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">CourseSite</NavLink>
        <nav>
          <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "link active" : "link")}>About</NavLink>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? "link active" : "link")}>Courses</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "link active" : "link")}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <section>
      <div className="hero">
        <div>
          <h1>Learn Practical Skills Online</h1>
          <p className="tagline">Hands-on courses taught by industry professionals. Build real projects, learn at your pace, and join a supportive community.</p>
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
        </div>
        <div className="hero-illustration" aria-hidden>
          {/* simple illustration placeholder */}
        </div>
      </div>

      <div className="section features">
        <h2>Why choose CourseSite?</h2>
        <div className="grid">
          <div className="card small">
            <h3>Flexible Learning</h3>
            <p>Learn on your schedule with short, focused lessons and practical exercises.</p>
          </div>
          <div className="card small">
            <h3>Expert Instructors</h3>
            <p>Courses are created by professionals with real-world experience.</p>
          </div>
          <div className="card small">
            <h3>Affordable Pricing</h3>
            <p>Quality content at fair prices — invest in your skills without breaking the bank.</p>
          </div>
        </div>
      </div>

      <div className="section featured">
        <h2>Featured Courses</h2>
        <div className="grid">
          {courses.slice(0, 3).map((c) => (
            <Link to={`/courses/${c.id}`} key={c.id} className="card featured-card">
              <h3>{c.title}</h3>
              <p className="short">{c.short}</p>
              <p className="price">${c.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section>
      <h1>About CourseSite</h1>
      <p className="lead">CourseSite is a small demo platform focused on practical web development skills. We design courses to help learners get productive quickly.</p>

      <div className="grid">
        <div className="card">
          <h3>Who are our courses for?</h3>
          <p>Developers new to a topic, designers who want to build interfaces, and professionals looking to sharpen specific skills.</p>
        </div>
        <div className="card">
          <h3>Our Mission</h3>
          <p>Deliver clear, project-based learning experiences that translate directly to workplace skills.</p>
        </div>
      </div>
    </section>
  );
}

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="card course-card" aria-label={`View ${course.title}`}>
      <div>
        <h3>{course.title}</h3>
        <p className="short">{course.short}</p>
      </div>
      <div className="price">${course.price}</div>
    </Link>
  );
}

function Courses() {
  return (
    <section>
      <h1>Courses</h1>
      <p>Browse our collection of carefully crafted short courses.</p>
      <div className="grid">
        {courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </div>
    </section>
  );
}

function Stars({ value = 0 }) {
  const full = Math.round(value);
  return <span className="rating">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i < full ? 'star on' : 'star'}>★</span>)}</span>;
}

function Feedback({ courseId }) {
  const key = `feedback_course_${courseId}`;
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : [];
      setList(parsed);
    } catch (e) {
      setList([]);
    }
  }, [key]);

  function submit(e) {
    e.preventDefault();
    if (!comment.trim()) {
      setMsg("Please enter a comment.");
      return;
    }
    const entry = {
      name: name.trim() || "Anonymous",
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toISOString()
    };
    const updated = [entry, ...list];
    localStorage.setItem(key, JSON.stringify(updated));
    setList(updated);
    setName("");
    setRating(5);
    setComment("");
    setMsg("Thanks for your feedback!");
    setTimeout(() => setMsg(""), 2500);
  }

  return (
    <div className="section feedback">
      <h3>Student Feedback</h3>
      <form onSubmit={submit} className="feedback-form">
        <div className="form-row">
          <input placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
          <select value={rating} onChange={(e) => setRating(e.target.value)} aria-label="Rating">
            <option value={5}>5 - Excellent</option>
            <option value={4}>4 - Good</option>
            <option value={3}>3 - Okay</option>
            <option value={2}>2 - Poor</option>
            <option value={1}>1 - Terrible</option>
          </select>
        </div>
        <textarea placeholder="Write your comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
        <div className="form-actions">
          <button type="submit" className="btn">Submit Feedback</button>
          {msg && <div className="success">{msg}</div>}
        </div>
      </form>

      <div className="feedback-list">
        {list.length === 0 && <p className="muted">No feedback yet — be the first to leave a comment.</p>}
        {list.map((f, idx) => (
          <div className="feedback-item" key={idx}>
            <div className="meta">
              <strong>{f.name}</strong>
              <Stars value={f.rating} />
              <span className="date">{new Date(f.date).toLocaleString()}</span>
            </div>
            <p className="comment">{f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => String(c.id) === String(id));
  const [bought, setBought] = useState(false);

  if (!course) return (
    <section>
      <h1>Course not found</h1>
      <p>We couldn't find the requested course.</p>
    </section>
  );

  return (
    <section>
      <div className="course-header">
        <div>
          <h1>{course.title}</h1>
          <p className="lead">{course.short}</p>
        </div>
        <div className="cta-block">
          <div className="price large">${course.price}</div>
          <button className="btn btn-primary" onClick={() => setBought(true)}>Buy Course</button>
          {bought && <div className="success">Thank you! Purchase simulated.</div>}
        </div>
      </div>

      <div className="section">
        <h2>About this course</h2>
        <p>{course.description}</p>
      </div>

      <Feedback courseId={course.id} />
    </section>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      setStatus("Please provide your email and message.");
      return;
    }
    // simple email validation
    const validEmail = /\S+@\S+\.\S+/.test(email);
    if (!validEmail) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Thanks! Your message was sent (mock). We will reply soon.");
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus(""), 3000);
  }

  return (
    <section>
      <h1>Contact</h1>
      <p className="lead">Have questions about our courses or need support? Send us a message.</p>

      <form className="contact-form" onSubmit={submit}>
        <div className="form-row">
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <textarea placeholder="Message *" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} />
        <div className="form-actions">
          <button className="btn btn-primary" type="submit">Send Message</button>
          {status && <div className="success">{status}</div>}
        </div>
      </form>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <Header />

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
          <div>© CourseSite</div>
          <div>Made with care • Demo project</div>
        </div>
      </footer>
    </div>
  );
}
