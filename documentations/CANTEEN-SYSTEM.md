# Canteen Management System

This document outlines the functionality of the Canteen Management module.

## Core Concepts

The system is designed to manage daily meal payments for students, based on a flexible fee structure that can be defined per department.

### Fee Structure

- **`classesFee`**: A compulsory fee determined by the student's department.
- **`canteenFee`**: A compulsory fee determined by the student's department.
- **`breakfastFee`**: An optional fee, also determined by the student's department.
- **`otherFee`**: An additional, ad-hoc fee that can be added at the time of payment.
- **Effective Date**: Each fee structure has an `effectiveDate`, allowing for historical and future fee changes. The system always uses the most recent fee structure for a department based on the current date.

### Payment Process

1.  **Student Selection**: The user selects a student to make a payment for.
2.  **Fee Calculation**: The system automatically calculates the `totalFee` for the student:
    - It fetches the student's department.
    - It finds the current `feeStructure` for that department.
    - It sums the `classesFee`, `canteenFee`, `breakfastFee`, and any user-entered `otherFee`.
3.  **Payment Recording**: The system records a payment for the calculated `totalFee`.
    - It prevents duplicate payments for the same student on the same day.
    - The payment method (e.g., cash, mobile money) and any notes are saved.

## Features

### 1. Dashboard

- **Daily Summary**: Displays key metrics for the current day:
    - Total number of payments.
    - Total amount collected.
    - Number of students who have paid.
    - Number of students who have not paid.
- **Today's Payments**: A list of all payments made on the current day, showing student name, department, and amount paid.
- **Add Payment**: A form to record a new payment for a student.

### 2. Fee Structures

- A dedicated section to manage the fee structures for each department.
- Users can **Create, Read, Update, and Delete** fee structures.
- Each structure includes the department, `classesFee`, `breakfastFee`, and an `effectiveDate`.

### 3. Reports

- The system can generate several types of reports:
    - **Daily Summary**: A summary of all payments for a selected date.
    - **Department Summary**: A breakdown of payments by department for a selected date.
    - **Payment History**: A detailed list of all payments within a specified date range.
    - **Aggregated Reports**: The ability to group payments by day, week, or department over a date range to see trends.

## Technical Implementation

- **`canteenService.js`**: Handles all direct communication with the Firestore database for canteen-related data (fee structures, payments).
- **`useCanteen.js`**: Contains React hooks that provide the canteen data and business logic to the UI components. This includes hooks for managing fee structures, processing payments, and generating reports.
- **`CanteenModuleScreen.jsx`**: The main UI component that renders the dashboard, fee structure management, and reporting tabs.rgarten
