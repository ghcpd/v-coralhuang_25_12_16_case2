import React from "react";
import { Link } from "react-router-dom";

const courses = [
  { id: 1, title: "React 101", price: 49, description: "Dive into the world of React with this comprehensive beginner's course. Learn how to build dynamic user interfaces using components, state, and props. By the end of this course, you'll be able to create interactive web applications that engage users and provide a seamless experience." },
  { id: 2, title: "JavaScript Fundamentals", price: 39, description: "Master the basics of JavaScript, the language of the web. This course covers variables, functions, loops, and object-oriented programming. Gain the foundational skills needed to write efficient, clean code and prepare for advanced web development topics." },
  { id: 3, title: "UI Basics", price: 29, description: "Learn the principles of user interface design. Explore color theory, typography, layout, and usability. This course will teach you how to create visually appealing and user-friendly interfaces that enhance the overall user experience." },
  { id: 4, title: "Web Accessibility", price: 35, description: "Ensure your websites are accessible to everyone. This course covers WCAG guidelines, screen readers, keyboard navigation, and inclusive design practices. Make the web a better place by creating digital experiences that work for all users, regardless of ability." }
];

function Courses() {
  return (
    <div>
      <section className="courses-header">
        <h1>Our Courses</h1>
        <p>Discover a wide range of courses designed to help you advance your skills and career.</p>
      </section>
      <section className="courses-grid">
        {courses.map((course) => (
          <Link to={`/courses/${course.id}`} key={course.id} className="course-card-link">
            <div className="course-card">
              <h3>{course.title}</h3>
              <p className="course-description">{course.description.substring(0, 100)}...</p>
              <p className="price">${course.price}</p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export { courses };
export default Courses;