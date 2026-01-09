import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { courses } from "./Courses";

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === parseInt(id));

  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const storedFeedbacks = localStorage.getItem(`feedbacks-${id}`);
    if (storedFeedbacks) {
      setFeedbacks(JSON.parse(storedFeedbacks));
    }
  }, [id]);

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const newFeedback = {
      name: name || "Anonymous",
      rating,
      comment,
      date: new Date().toISOString()
    };
    const updatedFeedbacks = [...feedbacks, newFeedback];
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem(`feedbacks-${id}`, JSON.stringify(updatedFeedbacks));
    setName("");
    setRating(5);
    setComment("");
  };

  const handleBuyCourse = () => {
    alert(`Thank you for your interest in "${course.title}"! This is a demo, so no actual purchase was made.`);
  };

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <section className="course-detail">
        <Link to="/courses" className="back-link">← Back to Courses</Link>
        <h1>{course.title}</h1>
        <p className="course-description-full">{course.description}</p>
        <p className="price">Price: ${course.price}</p>
        <button onClick={handleBuyCourse} className="buy-button">Buy Course</button>
      </section>
      <section className="feedback-section">
        <h2>Feedback</h2>
        <form onSubmit={handleSubmitFeedback} className="feedback-form">
          <div className="form-group">
            <label htmlFor="name">Name (optional):</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anonymous"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Feedback</button>
        </form>
        <div className="feedback-list">
          {feedbacks.map((fb, index) => (
            <div key={index} className="feedback-item">
              <div className="feedback-header">
                <strong>{fb.name}</strong>
                <span className="rating">{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</span>
              </div>
              <p>{fb.comment}</p>
              <small>{new Date(fb.date).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default CourseDetail;