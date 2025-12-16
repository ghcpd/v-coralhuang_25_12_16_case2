# CourseSite (Enhanced Demo)

This is an enhanced demo React application (small, single-page app) that showcases an online courses site. The baseline project was extended to add course detail pages, a local feedback system, richer page content, and improved UI styling — all without a backend.

## Install

1. Ensure Node.js (>=14) is installed.
2. In the project folder run:

```bash
npm install
npm start
# (or: npm run dev)
```

Either `npm start` or `npm run dev` will run the Vite dev server.

The app will start (Vite) and show the local dev URL in the terminal (usually http://localhost:5173).

## Summary of improvements

- Course data now includes full descriptions and short summaries.
- Course detail pages at `/courses/:id` showing title, multi-sentence description, price and a prominent "Buy Course" button (mock behavior).
- Clickable course cards on the Courses page navigate to their detail pages.
- Feedback system on each course detail page:
  - Users can submit name (optional, defaults to "Anonymous"), rating (1-5 stars), and comment text.
  - Feedback is stored in `localStorage` per course using the key `feedback_<courseId>`.
  - New feedback displays immediately and previous feedback entries are shown below the form.
- Contact page with a working (mock) contact form and basic validation for email and message.
- Richer content on Home and About pages (hero, benefits, mission, featured courses).
- Polished visual design: consistent color scheme, buttons, shadows, responsive layout, and subtle hover effects.

## Feedback storage details

Feedback entries are saved to `localStorage` with keys like `feedback_1`, `feedback_2`, etc. Each entry is an array of objects with properties: `id`, `name`, `rating`, `comment`, and `date` (ISO string). Since storage is local to your browser, feedback will not be shared across devices or users.

## Notes

- No backend or payment processing is implemented — "Buy" actions are simulated for demo purposes.
- The project keeps a simple structure and focuses on clarity and maintainability.

If you want additional improvements (tests, internationalization, or server persistence), I can add them next.