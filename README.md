# CourseSite Demo

This is an enhanced React demo application for an online courses site.

## Install and run

1. Install dependencies

```bash
npm install
```

2. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal).

## Improvements made

- Course detail pages (/courses/:id) with full description, price, and a "Buy Course" button (mocked).
- Feedback system on each course detail page:
  - Users can submit name (optional), rating (1–5), and comment.
  - Feedback is stored in localStorage per course (key: `feedback_course_{id}`).
  - New feedback is displayed immediately and all previous entries are shown.
- Home page: hero section, tagline, benefits, and featured courses.
- About page: expanded content with sections and mission statement.
- Courses page: interactive course cards showing short description and price; cards link to detail pages.
- Contact page: enhanced contact form with validation and mock submission.
- UI updates: cohesive color scheme, rounded cards, shadows, responsive layout, and subtle hover effects.

## Feedback system details

- Feedback for course with id `N` is stored in `localStorage` under the key `feedback_course_N` as a JSON array.
- Each feedback entry: `{ name, rating, comment, date }`.
- The UI shows entries in reverse chronological order (newest first).

## Notes

- This is a frontend-only demo; purchases and contact submissions are mocked.
- No backend is required; all persistent data uses `localStorage`.

---

If you want further improvements (tests, more visual assets, or sample course images), I can add them next.