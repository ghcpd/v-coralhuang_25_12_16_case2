# Online Courses Platform

A professional demo application for an online courses website built with React.js and React Router.

## Features

### Course Management
- Browse available courses with detailed descriptions
- View individual course details including full descriptions and pricing
- Navigate seamlessly between course listings and detail pages

### Feedback System
- Submit feedback for each course with name, rating, and comments
- Feedback is stored locally per course using localStorage
- View all submitted feedback with ratings displayed as stars
- Anonymous submissions supported

### Enhanced Pages
- **Home**: Hero section with call-to-action, platform benefits, and featured courses
- **About**: Detailed information about the platform's purpose and target audience
- **Courses**: Interactive course cards with hover effects
- **Contact**: Contact form with validation and mock submission

### UI/UX Improvements
- Responsive design for mobile and desktop
- Consistent color scheme with blue accent (#007bff)
- Modern styling with shadows, rounded corners, and smooth transitions
- Clear visual hierarchy and typography
- Interactive elements with hover effects

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory.
3. Install dependencies:
   ```
   npm install
   ```

## Running the Project

Start the development server:
```
npm start
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Courses.jsx
│   ├── CourseDetail.jsx
│   └── Contact.jsx
├── App.jsx
├── index.jsx
└── styles.css
```

## Technologies Used

- React 18
- React Router DOM 6
- Vite (build tool)
- CSS3 for styling
- localStorage for client-side data persistence

## Feedback System Explanation

The feedback system allows users to leave reviews for individual courses:

1. **Storage**: Feedback is stored in the browser's localStorage, keyed by course ID (e.g., `feedbacks-1`).
2. **Data Structure**: Each feedback entry includes name (defaulting to "Anonymous"), rating (1-5), comment, and timestamp.
3. **Display**: Feedback is shown immediately after submission and persists across browser sessions.
4. **UI**: Ratings are displayed using star characters (★☆), with individual feedback entries clearly separated.

## UI Improvements Summary

- **Color Scheme**: Professional blue and gray palette with green accents for CTAs
- **Typography**: Improved font hierarchy and readability
- **Layout**: Grid-based responsive layouts for course cards and sections
- **Interactions**: Hover effects on cards, buttons, and links
- **Forms**: Styled input fields with validation feedback
- **Responsiveness**: Mobile-first design with breakpoints for tablets and desktops
- **Shadows and Depth**: Subtle shadows to create visual depth and modern appearance