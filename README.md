# MagX Portal

A comprehensive school management system built with React and Firebase. This project is a Progressive Web App (PWA) designed to be a central portal for managing various aspects of a school, including teachers, students, attendance, allowances, and canteen operations.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Design Pattern](#design-pattern)
- [Modules](#modules)
  - [Teacher Module](#teacher-module)
  - [Student Module](#student-module)
  - [Attendance Module](#attendance-module)
  - [Allowance Module](#allowance-module)
  - [Canteen Module](#canteen-module)

## Features

- **Progressive Web App (PWA):** Installable on mobile and desktop devices for an app-like experience.
- **Responsive Design:** Mobile-first design that adapts to various screen sizes.
- **Modular Architecture:** Each major feature is encapsulated in its own module.
- **CRUD Operations:** Create, Read, Update, and Delete operations for all modules.
- **Analytics:** Each module includes an analytics section with charts and stats.
- **Real-time Database:** Uses Firebase Firestore for real-time data synchronization.
- **GitHub Pages Deployment:** Easily deployable to GitHub Pages.

## Tech Stack

- **Frontend:** React, React Hooks, React Router
- **Bundler:** Vite
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **PWA:** `vite-plugin-pwa`
- **Charts:** Recharts
- **Deployment:** GitHub Pages

## Project Structure

```
magx-portal/
├── public/               # Public assets
├── src/                  # Source code
│   ├── assets/           # Images and other assets
│   ├── components/       # Reusable React components
│   ├── firebase/         # Firebase configuration
│   ├── hooks/            # Custom React hooks
│   ├── screens/          # Main screen components for each module
│   ├── services/         # Firebase service functions
│   └── utils/            # Utility functions
├── .gitignore
├── DESIGN-PATTERN.md     # Project design pattern documentation
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your machine.
- A Firebase project set up.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Magx-hub/magx-portal.git
    cd magx-portal
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up Firebase:**
    -   Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    -   Copy your Firebase project configuration and replace the placeholder in `src/firebase/config.js`.

4.  **Run the development server:**
    ```bash
    yarn dev
    ```

## Available Scripts

-   `yarn dev`: Starts the development server.
-   `yarn build`: Builds the app for production.
-   `yarn lint`: Lints the code.
-   `yarn preview`: Previews the production build locally.
-   `yarn deploy`: Deploys the app to GitHub Pages.

## Deployment

This project is configured to be deployed to GitHub Pages. To deploy your own version:

1.  Update the `homepage` field in `package.json` to your GitHub Pages URL.
2.  Run the deploy script:
    ```bash
    yarn deploy
    ```

## Design Pattern

The project follows a modular design pattern described in `DESIGN-PATTERN.md`. Each module is designed to have:

-   **CRUD (Create, Read, Update, Delete) functionality:** For managing the module's data.
-   **Analytics:** For visualizing data and gaining insights.

## Modules

### Teacher Module

-   **Features:**
    -   Add, view, edit, and delete teachers.
    -   Search for teachers.
    -   View teacher statistics, including total teachers and department distribution.
-   **Components:** `screens/TeacherModuleScreen.jsx`
-   **Hooks:** `hooks/useTeachers.js`
-   **Services:** `services/teacherService.js`

### Student Module

-   **Features:**
    -   Add, view, edit, and delete students.
    -   Search for students by name or department.
    -   View student statistics, including total students, gender distribution, and department distribution.
-   **Components:** `screens/StudentModuleScreen.jsx`, `components/StudentForm.jsx`, `components/StudentList.jsx`, `components/StudentSearch.jsx`, `components/StudentStats.jsx`
-   **Hooks:** `hooks/useStudents.js`
-   **Services:** `services/studentService.js`

### Attendance Module

-   **Features:**
    -   Mark teacher attendance (check-in and check-out).
    -   View attendance records by date.
    -   View daily and weekly attendance statistics.
-   **Components:** `screens/AttendanceModuleScreen.jsx`
-   **Hooks:** `hooks/useAttendance.js`
-   **Services:** `services/attendanceService.js`, `services/attendanceFirebaseService.js`

### Allowance Module

-   **Features:**
    -   Calculate teacher allowances based on various inputs.
    -   Save and view historical allowance calculations.
    -   Generate PDF reports of allowances.
-   **Components:** `screens/AllowanceModuleScreen.jsx`
-   **Hooks:** `hooks/useAllowance.js`
-   **Services:** `services/allowanceService.js`

### Canteen Module

-   **Features:** This module is currently a placeholder and can be extended to manage canteen-related operations.
-   **Components:** `screens/CanteenModuleScreen.jsx`
-   **Hooks:** `hooks/useCanteen.js`
-   **Services:** `services/canteenService.js`






## **1. Navigation Principles**

* **Mobile-First**:

  * Bottom navigation bar (quick access to main modules).
  * Floating Action Button (FAB) for global “Add” operations.
* **Tablet/Desktop**:

  * Side navigation drawer (persistent).
  * Expandable menu sections for sub-modules.
* **Consistency**:

  * Every module screen follows the same structure: **Header → Actions → Analytics**.
