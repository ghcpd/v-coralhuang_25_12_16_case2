import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, NavLink, useParams } from "react-router-dom";

const coursesData = [
  {
    id: 1,
    title: "React 101",
    price: 49,
    description: "Learn the fundamentals of React.js and build interactive user interfaces. This course covers components, hooks, state management, and best practices for modern React development."
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    price: 39,
    description: "Master core JavaScript concepts including variables, functions, asynchronous programming, and DOM manipulation. Perfect for beginners looking to build a solid foundation."
  },
  {
    id: 3,
    title: "UI Basics",
    price: 29,
    description: "Create beautiful and responsive user interfaces with HTML, CSS, and design principles. Learn layout techniques, typography, color theory, and accessibility standards."
  },
  {
    id: 4,
    title: "Web Accessibility",
    price: 35,
    description: "Build inclusive web applications that work for everyone. Learn WCAG standards, semantic HTML, ARIA attributes, and testing techniques for accessible websites."
  }
];

function Home() {
  return (
    <section className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Learn Practical Skills Online</h1>
          <p className="tagline">Master web development with expert-led courses designed for all levels</p>
          <NavLink to="/courses" className="btn btn-primary">Explore Courses</NavLink>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Practical Skills</h3>
            <p>Learn skills you can use immediately in real-world projects</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🏫</div>
            <h3>Expert Instructors</h3>
            <p>Learn from industry professionals with years of experience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Affordable Pricing</h3>
            <p>Quality education at prices that won't break the bank</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Flexible Learning</h3>
            <p>Learn at your own pace, whenever and wherever you want</p>
          </div>
        </div>
      </section>

      <section className="featured">
        <h2>Featured Courses</h2>
        <div className="courses-preview">
          {coursesData.slice(0, 3).map((course) => (
            <NavLink to={`/courses/${course.id}`} key={course.id} className="preview-card">
              <h3>{course.title}</h3>
              <p className="price">${course.price}</p>
            </NavLink>
          ))}
        </div>
      </section>
    </section>
  );
}

function About() {
  return (
    <section className="about">
      <div className="about-header">
        <h1>About Our Platform</h1>
        <p className="subtitle">Empowering learners worldwide</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>We believe that quality education should be accessible to everyone, regardless of location or background. Our platform provides comprehensive, hands-on courses designed to help you master in-demand web development skills and advance your career.</p>
        </div>

        <div className="about-section">
          <h2>Who We Serve</h2>
          <p>Our courses are designed for:</p>
          <ul className="about-list">
            <li><strong>Beginners</strong> starting their web development journey</li>
            <li><strong>Career changers</strong> looking to transition into tech</li>
            <li><strong>Professionals</strong> wanting to expand their skillset</li>
            <li><strong>Students</strong> supplementing their formal education</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>Our Values</h2>
          <ul className="about-list">
            <li><strong>Practical Learning:</strong> Every course focuses on real-world applications and projects</li>
            <li><strong>Accessibility:</strong> We strive to make education affordable and inclusive</li>
            <li><strong>Quality:</strong> Our instructors are industry experts committed to your success</li>
            <li><strong>Community:</strong> We foster a supportive learning environment for all students</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Courses() {
  return (
    <section className="courses-section">
      <h1>Our Courses</h1>
      <p className="section-subtitle">Choose from our collection of comprehensive web development courses</p>
      <div className="grid">
        {coursesData.map((course) => (
          <NavLink to={`/courses/${course.id}`} key={course.id} className="course-card">
            <div className="card-content">
              <h3>{course.title}</h3>
              <p className="card-description">{course.description.substring(0, 80)}...</p>
              <p className="price">${course.price}</p>
              <div className="card-footer">
                <span className="learn-more">View Details →</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
}

function CourseDetail() {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id));
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    comment: ""
  });

  useEffect(() => {
    const storedFeedback = localStorage.getItem(`feedback-${id}`);
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
  }, [id]);

  const handleBuyCourse = () => {
    alert(`Great! You've added "${course.title}" to your cart. Proceed to checkout to complete your purchase.`);
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rating" ? parseInt(value) : value
    });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!formData.comment.trim()) {
      alert("Please enter a comment");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: formData.name || "Anonymous",
      rating: formData.rating,
      comment: formData.comment,
      date: new Date().toLocaleDateString()
    };

    const updatedFeedback = [newFeedback, ...feedback];
    setFeedback(updatedFeedback);
    localStorage.setItem(`feedback-${id}`, JSON.stringify(updatedFeedback));

    setFormData({
      name: "",
      rating: 5,
      comment: ""
    });
  };

  if (!course) {
    return <section><h1>Course not found</h1></section>;
  }

  return (
    <section className="course-detail">
      <div className="detail-header">
        <h1>{course.title}</h1>
        <p className="detail-price">${course.price}</p>
      </div>

      <div className="detail-content">
        <div className="detail-main">
          <h2>Course Description</h2>
          <p className="full-description">{course.description}</p>

          <button onClick={handleBuyCourse} className="btn btn-primary btn-large">
            Buy Course
          </button>
        </div>

        <div className="detail-sidebar">
          <div className="course-summary">
            <h3>Course Details</h3>
            <div className="summary-item">
              <span className="label">Price</span>
              <span className="value">${course.price}</span>
            </div>
            <div className="summary-item">
              <span className="label">Level</span>
              <span className="value">Beginner to Intermediate</span>
            </div>
            <div className="summary-item">
              <span className="label">Duration</span>
              <span className="value">8-12 weeks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <h2>Student Feedback</h2>

        <form className="feedback-form" onSubmit={handleSubmitFeedback}>
          <div className="form-group">
            <label htmlFor="name">Your Name (optional)</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFeedbackChange}
              placeholder="Enter your name or leave blank for Anonymous"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleFeedbackChange}
              className="form-input"
            >
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleFeedbackChange}
              placeholder="Share your thoughts about this course..."
              className="form-textarea"
              rows="4"
            />
          </div>

          <button type="submit" className="btn btn-secondary">Submit Feedback</button>
        </form>

        <div className="feedback-list">
          {feedback.length === 0 ? (
            <p className="no-feedback">No feedback yet. Be the first to share your thoughts!</p>
          ) : (
            feedback.map((entry) => (
              <div key={entry.id} className="feedback-entry">
                <div className="feedback-header">
                  <strong>{entry.name}</strong>
                  <span className="feedback-rating">{"⭐".repeat(entry.rating)}</span>
                </div>
                <p className="feedback-date">{entry.date}</p>
                <p className="feedback-comment">{entry.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="contact">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p className="subtitle">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className="form-textarea"
              rows="5"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large">Send Message</button>

          {submitted && (
            <div className="success-message">
              Thank you! Your message has been sent successfully. We'll get back to you soon.
            </div>
          )}
        </form>

        <div className="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <div className="info-item">
            <strong>Email:</strong>
            <p>support@coursesite.com</p>
          </div>
          <div className="info-item">
            <strong>Phone:</strong>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <strong>Address:</strong>
            <p>123 Learning Street<br />Knowledge City, KC 12345</p>
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
        <span>&copy; 2025 CourseSite. All rights reserved.</span>
      </footer>
    </div>
  );
}
