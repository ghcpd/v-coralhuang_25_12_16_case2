# Courses Demo

This is an enhanced demo React application for an online courses platform. It builds on a baseline project and adds feature and visual improvements.

## What I changed ✅

- Added course `description` and `short` fields to course data
- Implemented **Course Detail** pages at `/courses/:id` that show title, full description, price, and a **Buy Course** button (mock behavior)
- Added a **Feedback** system on each Course Detail page:
  - Accepts name (optional), rating (1–5), and comment
  - Feedback stored in `localStorage` per course under `feedback_course_<id>`
  - Shows previously submitted feedback and updates immediately on submit
- Improved content on **Home**, **About**, **Courses**, and **Contact** pages (hero, platform benefits, featured courses)
- Reworked **Contact** form with basic validation and mock success message
- Visual polish: consistent color scheme, shadows, rounded cards, hover transitions, responsive layout

## How feedback works 📝

- When a user submits feedback on a course page, the entry is saved to `localStorage` using key `feedback_course_<id>` (e.g. `feedback_course_1`).
- Feedback is read from `localStorage` when the course page loads and displayed immediately after submitting.

## Install & Run

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm start
```

3. Open http://localhost:5173 (or the port Vite reports) to view the app.

## Notes

- No backend is required — this is a purely front-end demo using local state and `localStorage`.
- The Buy Course and contact actions are mocked (no real payment or email sent).

---

Enjoy exploring the demo! If you want any further refinements (e.g. persisting also to a JSON file, adding edit/delete feedback, or improving accessibility), I can extend it further.