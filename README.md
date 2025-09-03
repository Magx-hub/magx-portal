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





# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------
# --------------------------------------------------------------------------------------------


## **1. Navigation Principles**

* **Mobile-First**:

  * Bottom navigation bar (quick access to main modules).
  * Floating Action Button (FAB) for global “Add” operations.
* **Tablet/Desktop**:

  * Side navigation drawer (persistent).
  * Expandable menu sections for sub-modules.
* **Consistency**:

  * Every module screen follows the same structure: **Header → Actions → Analytics**.



---

## **Layout Structure**

1. **Header Section**

   * **Background Color**: Blue (used for consistency and visual hierarchy).
   * **Title**: Bold module name (e.g., *Teacher Module*).
   * **Icons**:

     * **Search Icon** (top right) for quick lookup.
     * **Menu Icon (hamburger)** for navigation drawer access.

2. **Main Functional Section**

   * **Title**: "Management" or module-specific heading (e.g., *Teacher Management*).
   * **Action Buttons (CRUD)**:

     * **Add Record** (e.g., Add Teacher).
     * **View Records** (e.g., View Teachers).
     * **Edit Record** (e.g., Edit Teacher).
     * **Delete Record** (e.g., Delete Teacher).
   * **Style**:

     * White background cards with soft rounded corners.
     * Clear black text for accessibility.
     * Vertical stacking for readability on mobile.

3. **Analytics Section**

   * **Title**: "Analytics".
   * **Charts/Widgets**:

     * **Line Chart** (trend visualization).
     * **Pie Chart** (distribution visualization).
   * **Layout**: Two side-by-side cards with equal spacing.

---

## **Design Principles**

* **Mobile-First**: Layout optimized for single-column display, expandable for larger screens.
* **Consistency**: Each module follows the same **CRUD + Analytics** structure.
* **Accessibility**: High contrast (blue header, black text, white background).
* **Modularity**: Components (header, buttons, analytics) are reusable across modules.

---

## **Adaptation for Other Modules**

* **Staff Attendance Module**:

  * Header: *Staff Attendance Module*.
  * CRUD: Add Attendance, View Attendance, Edit, Delete.
  * Analytics: Bar chart for daily/weekly attendance + Pie chart for percentage breakdown.

* **Friday Allowance Module**:

  * Header: *Friday Allowance*.
  * CRUD: Add Allowance, View Records, Edit, Delete.
  * Analytics: Line chart for allowance trends, Pie chart for distribution by staff.

* **Student Module**:

  * Header: *Student Management*.
  * CRUD: Add Student, View Students, Edit, Delete.
  * Analytics: Enrollment trend line chart, Pie chart by gender/class.

* **Canteen Module**:

  * Header: *Canteen Management*.
  * CRUD: Add Item, View Menu, Edit Item, Delete Item.
  * Analytics: Sales line chart, Pie chart of items sold.

---

## **Template Reusability**

This template should be reused for all modules by:

1. Replacing the **header title** with the module name.
2. Updating **CRUD labels** to match the module’s entities.
3. Configuring the **analytics visualizations** (charts) for the module’s KPIs.

---
# =========================================================
# COMPONENT WIREFAMES
# COMPONENT WIREFAMES
# COMPONENT WIREFAMES
# =========================================================
---

# **Navigation System for CRUD + Analytics PWA**

## **1. Navigation Principles**

* **Mobile-First**:

  * Bottom navigation bar (quick access to main modules).
  * Floating Action Button (FAB) for global “Add” operations.
* **Tablet/Desktop**:

  * Side navigation drawer (persistent).
  * Expandable menu sections for sub-modules.
* **Consistency**:

  * Every module screen follows the same structure: **Header → Actions → Analytics**.

---

## **2. Navigation Structure**

### **Global Navigation**

* **Modules as Primary Routes**:

  * Teacher Module
  * Staff Attendance
  * Friday Allowance
  * Student Module
  * Canteen Module
* **Global Actions**:

  * Dashboard (overview across modules).
  * Settings (user, permissions, app preferences).
  * Notifications (optional).

---

### **Navigation Patterns**

#### **A. Bottom Navigation (Mobile)**

* **Tabs**:

  * Dashboard
  * Teachers
  * Students
  * Attendance
  * Canteen
* **FAB**:

  * Add (+) → Context-sensitive (e.g., Add Teacher if on Teacher Module).

Example:

```
[Dashboard] [Teachers] [Students] [Attendance] [Canteen]
             (FAB +) floating above
```

---

#### **B. Side Drawer (Tablet/Desktop)**

* Persistent drawer on the left:

  * **Dashboard**
  * **Modules** (expandable list)

    * Teacher Module
    * Staff Attendance
    * Friday Allowance
    * Student Module
    * Canteen Module
  * **Settings**
  * **Help**
* Content area displays the active `ModuleScreen`.

---

### **C. In-Module Navigation**

Each module (e.g., Teacher Module) has:

1. **Header** with search + menu.
2. **ActionGrid** (Add, View, Edit, Delete).
3. **AnalyticsGrid** (charts).

If user taps **View**, it navigates to a **ListScreen** (with pagination + filters).
If user taps **Add**, it navigates to a **FormScreen**.

---

## **3. Navigation Implementation (Example with React Router / Expo Router)**

```tsx
// AppRoutes.tsx
const routes = [
  { path: "/", component: DashboardScreen },
  { path: "/teachers", component: TeacherModuleScreen },
  { path: "/students", component: StudentModuleScreen },
  { path: "/attendance", component: AttendanceModuleScreen },
  { path: "/allowance", component: AllowanceModuleScreen },
  { path: "/canteen", component: CanteenModuleScreen },
  { path: "/settings", component: SettingsScreen },
];
```

* On **mobile**, these routes are wrapped in a **BottomTabNavigator**.
* On **desktop**, they are wrapped in a **DrawerNavigator**.

---

## **4. Recommended UX Enhancements**

* **Breadcrumbs (Desktop)**: Show hierarchy like *Home > Teachers > View Teacher*.
* **Search Everywhere**: Global search in the header for quick record lookup.
* **Role-Based Access**: Admin sees all modules, staff may see limited ones.
* **Offline-First Navigation**: Cache frequently used routes (important for PWA).

---

✅ This gives you a **navigation skeleton** where each module plugs into the same system.


```
magx-portal
├─ cmd
│  └─ main.go
├─ configs
│  └─ config.yaml
├─ DESIGN-PATTERN.md
├─ eslint.config.js
├─ go.mod
├─ index.html
├─ internal
│  ├─ model
│  ├─ repository
│  └─ service
├─ package.json
├─ pkg
│  └─ utils
├─ public
│  ├─ apple-touch-icon.png
│  ├─ favicon.svg
│  ├─ mask-icon.svg
│  ├─ pwa-192x192.png
│  ├─ pwa-512x512.png
│  ├─ teachers.png
│  └─ wireframe.png
├─ pwa-assets.config.js
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ Feature.jsx
│  │  ├─ Interface.jsx
│  │  ├─ Navigation.jsx
│  │  └─ Typography.js
│  ├─ firebase
│  │  └─ config.js
│  ├─ hooks
│  │  ├─ useAllowance.js
│  │  ├─ useAttendance.js
│  │  ├─ useCanteen.js
│  │  ├─ useStudents.js
│  │  └─ useTeachers.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ PWABadge.css
│  ├─ PWABadge.jsx
│  ├─ services
│  │  ├─ allowanceService.js
│  │  ├─ attendanceFirebaseService.js
│  │  ├─ attendanceService.js
│  │  ├─ canteenService.js
│  │  ├─ database.js
│  │  ├─ firebaseService.js
│  │  └─ studentService.js
│  ├─ sw.js
│  └─ utils
│     ├─ attendanceMenu.js
│     ├─ attendanceUtils.js
│     ├─ designUtils.js
│     ├─ helpers.js
│     ├─ pdfGenerator.js
│     ├─ styles.js
│     └─ teacherMenu.js
├─ vite.config.js
└─ yarn.lock

```


// git add .
// git commit -m "Add student statistics component"
// git push origin master
// npm run deploy