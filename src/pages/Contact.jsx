import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function onChange(e) {
    setSubmitted(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    // Baseline: minimal "submit"
    setSubmitted(true);
  }

  return (
    <section>
      <h1 className="h1">Contact Us</h1>
      <p className="p">Send a message to the site administrator (baseline demo).</p>

      <form className="card" onSubmit={onSubmit}>
        <label className="label" htmlFor="name">Name</label>
        <input
          className="input"
          id="name"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
        />

        <label className="label" htmlFor="email">Email</label>
        <input
          className="input"
          id="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="you@example.com"
        />

        <label className="label" htmlFor="message">Message</label>
        <textarea
          className="textarea"
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Your message..."
        />

        <button className="button" type="submit">Submit</button>

        {submitted && (
          <p className="p" style={{ marginTop: 12 }}>
            Message submitted (baseline mock).
          </p>
        )}
      </form>
    </section>
  );
}
