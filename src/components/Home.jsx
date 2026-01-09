import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Learn Practical Skills Online</h1>
        <p>Unlock your potential with our comprehensive online courses. From web development to design, gain the skills you need to succeed in today's digital world.</p>
        <Link to="/courses" className="cta-button">Explore Courses</Link>
      </section>
      <section className="benefits">
        <h2>Why Choose Us?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h3>Flexible Learning</h3>
            <p>Learn at your own pace with lifetime access to course materials.</p>
          </div>
          <div className="benefit-card">
            <h3>Expert Instructors</h3>
            <p>Our courses are taught by industry professionals with years of experience.</p>
          </div>
          <div className="benefit-card">
            <h3>Affordable Pricing</h3>
            <p>High-quality education at prices that won't break the bank.</p>
          </div>
        </div>
      </section>
      <section className="featured-courses">
        <h2>Featured Courses</h2>
        <div className="featured-grid">
          <div className="featured-card">
            <h3>React 101</h3>
            <p>Master the fundamentals of React and build dynamic web applications.</p>
            <span className="price">$49</span>
          </div>
          <div className="featured-card">
            <h3>JavaScript Fundamentals</h3>
            <p>Learn the core concepts of JavaScript to become a proficient developer.</p>
            <span className="price">$39</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;