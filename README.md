# MERN Stack - Resume Collector 🚀

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Now-2ea44f?style=for-the-badge&logo=vercel)](https://resume-collector-website.vercel.app)[![API Status](https://img.shields.io/badge/API-Live_on_Render-4D88FF?style=for-the-badge&logo=render)](https://resume-collector-website.onrender.com)[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)[![Node.js](https://img.shields.io/badge/Node.js-20-43853d?style=for-the-badge&logo=node.js)](https://nodejs.org/)

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that provides a clean, user-friendly interface for collecting user resumes. The application features robust validation on both the client and server, secure file handling, and a decoupled architecture deployed on modern cloud platforms.

---

## 🎬 Live Demo

**Check out the live application hosted on Vercel:**

### 👉 [https://resume-collector-website.vercel.app](https://resume-collector-website.vercel.app)

*(Note: The backend is hosted on Render's free tier, so it may take a moment to "wake up" and process the first submission.)*

---

## ✨ Key Features

-   **Seamless Resume Submission:** A modern, single-page application for users to enter their details and upload a resume with ease.
-   **Dual-Layer Validation:** Implements immediate **client-side** validation for a great UX and robust **server-side** validation using Mongoose for data integrity.
-   **Secure File Uploads:** Uses **Multer** to handle `multipart/form-data`, enforcing strict rules on file types (PDF, DOC, DOCX) and size limits.
-   **Decoupled MERN Architecture:** The **React** frontend and **Node.js/Express** backend operate as two separate applications, communicating via a REST API.
-   **Cloud-Native Deployment:** Fully deployed on industry-standard platforms (**Vercel** & **Render**) and connected to a **MongoDB Atlas** cloud database.

---

## 🛠️ Technology Stack & Architecture

This project follows a standard decoupled MERN stack architecture, deployed as two distinct microservices.

-   **Frontend (Client):** Built with **React** and **Axios** for creating a dynamic user interface and making asynchronous API calls to the backend. Styled with pure **CSS**.
-   **Backend (Server):** An **Express.js** server running on **Node.js** that exposes a REST API endpoint for form submissions and file handling.
-   **Database:** **MongoDB Atlas** (a fully-managed cloud database) stores all user data. **Mongoose** is used as the Object Data Modeling (ODM) library to define schemas and interact with the database.
-   **Deployment:**
    -   The **frontend** is deployed on **Vercel** for optimal performance and fast global delivery.
    -   The **backend** is deployed as a web service on **Render**.

---

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later) & npm
-   Git
-   A MongoDB Atlas account and your [connection string](https://www.mongodb.com/docs/atlas/getting-started/).

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/prachiprashar/Resume-Collector-Website.git
    cd Resume-Collector-Website
    ```

2.  **Set up and run the Backend (Server):**
    ```sh
    # Navigate to the server directory
    cd server
    
    # Install server dependencies
    npm install
    
    # Create a .env file and add your database connection string
    MONGODB_URI="mongodb+srv://YourUser:YourPassword@cluster..."
    
    # Start the server (in its own terminal)
    npm start
    ```
    The backend will now be running on `http://localhost:5000`.

3.  **Set up and run the Frontend (Client):**
    ```sh
    # Open a NEW terminal and navigate to the client directory from the root
    cd ../client 
    
    # Install client dependencies
    npm install
    
    # Start the React development server
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.

---
