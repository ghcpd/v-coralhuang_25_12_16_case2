# Course Site Demo (Improved)

## What this is

This is an improved demo React application for an online courses platform. The
baseline (single `App.jsx` + simple styles) was extended with the requested
features:

- Course detail pages (description + buy button)
- Feedback system stored in `localStorage` per course
- Helpful content on Home, About and Contact pages
- A contact form with basic validation and mocked submit
- Visual polish: color palette, cards, hover effects, buttons, responsive grid

The app is intentionally small and self-contained so it can be run locally
without any backend.

## Getting started

1. Install dependencies

```bash
npm ci
```

2. Run the development server

```bash
npm start
```

Open <http://localhost:5173> in your browser (Vite dev server default).

## Notes on implemented features

* **Course Detail** — Each course can be visited at `/courses/:id` where the
  full description, price and a "Buy Course" (mock) button are shown.
* **Feedback** — On the detail page users can leave feedback (name, rating 1–5,
  comment). Feedback is stored in `localStorage` under `feedback_course_{id}` and
  displayed for the course. New feedback shows immediately.
* **Pages** — Home, About and Contact now have richer content and simple
  styling.
* **Styling** — Buttons, cards, hero and benefit sections are styled with a
  consistent accent color and responsive layout.

If you'd like to extend this further you could add real backend APIs, data
fetching, or more course details. The project demonstrates a clean, minimal
client-side implementation.
