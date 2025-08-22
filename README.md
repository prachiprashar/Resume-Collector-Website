# Patient Information Form 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2ea44f?style=for-the-badge&logo=github)](https://prachi-prashar.github.io/patient-information-form/)[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)[![Ant Design](https://img.shields.io/badge/Ant_Design-UI-1677FF?style=for-the-badge&logo=ant-design)](https://ant.design/)

A modern, responsive, and user-friendly web application for collecting patient information. Built with a fast Vite + React frontend and the professional Ant Design component library, this project demonstrates a clean, single-page application architecture focused on excellent user experience and robust form handling.

---

## 🎬 Live Demo

**Check out the live application hosted on GitHub Pages:**

### 👉 [https://prachi-prashar.github.io/patient-information-form/](https://prachi-prashar.github.io/patient-information-form/)

---

## ✨ Key Features

-   **Automatic BMI Calculation:** The Body Mass Index (BMI) is calculated and displayed in real-time as the user enters their height and weight, providing instant feedback.
-   **Rich UI Components:** Leverages the powerful Ant Design library for high-quality inputs, date pickers, and select dropdowns, ensuring a professional and accessible interface.
-   **Comprehensive Form Validation:** Implements client-side validation to guide users, ensuring all required fields are filled correctly before submission.
-   **Fully Responsive Design:** The layout is built to be mobile-first, providing a seamless user experience on any device, from desktops to smartphones.
-   **Clear Submission Feedback:** After a successful submission, the form is replaced with a success message, confirming that the data has been processed and allowing the user to submit another entry.

---

## 📂 Data Handling & Submission

This project is a **frontend-only application** designed to demonstrate UI/UX and client-side logic.

### 1. How Data is Handled

Upon clicking the "Submit" button, the application performs the following actions:
1.  Validates all form fields to ensure the data is complete and correct.
2.  Collects all the data into a single JavaScript object.
3.  **Logs this object to the browser's developer console.**

### 2. Viewing the Output

To see the captured data:
1.  Open the live demo link.
2.  Open your browser's Developer Tools (usually by pressing `F12` or `Ctrl+Shift+I`).
3.  Click on the **"Console"** tab.
4.  Fill out the form and click "Submit".
5.  The complete form data object will appear in the console.

> **Note on Production Use:** This console-logging approach is for demonstration purposes only. A production-ready application would send this data via a secure API request to a backend server, which would then store it in a database.

---

## 🛠️ Technology Stack & Architecture

This project is a client-side application built with a modern frontend toolchain.

-   **Frontend:** Built with **React** for creating a dynamic, component-based user interface.
-   **Build Tool:** **Vite** is used for its blazing-fast development server and optimized production builds.
-   **UI Framework:** **Ant Design** provides a comprehensive library of enterprise-class UI components that ensures a polished and consistent look and feel.
-   **Deployment:** The application is deployed as a static site on **GitHub Pages**, with an automated deployment process managed by the `gh-pages` package.

---

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v16 or later) & npm
-   Git

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/prachi-prashar/patient-information-form.git
    cd patient-information-form
    ```

2.  **Install project dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will open automatically in your browser at `http://localhost:5173`.

---
