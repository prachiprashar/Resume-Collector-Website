MERN Stack - Resume Collector 🚀
![alt text](https://img.shields.io/badge/Live_Demo-Visit_Now-2ea44f?style=for-the-badge&logo=vercel)

![alt text](https://img.shields.io/badge/API-Live_on_Render-4D88FF?style=for-the-badge&logo=render)

![alt text](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)

![alt text](https://img.shields.io/badge/Node.js-20-43853d?style=for-the-badge&logo=node.js)

![alt text](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) that provides a clean, user-friendly interface for collecting user resumes. The application features robust validation on both the client and server, secure file handling, and a decoupled architecture deployed on modern cloud platforms.
🎬 Live Demo
Check out the live application hosted on Vercel:
👉 https://resume-collector-website.vercel.app
(Note: The backend is hosted on Render's free tier, so it may take a moment to "wake up" and process the first submission.)
✨ Key Features
Seamless Resume Submission: A modern, single-page application for users to enter their details and upload a resume.
Client-Side Validation: Provides immediate feedback to the user for required fields and correct formatting (email, phone number) before submission.
Robust Server-Side Validation: Ensures data integrity by validating all incoming data on the backend using Mongoose schemas.
Secure File Uploads: Uses Multer to handle multipart/form-data, accepting only specific file types (PDF, DOC, DOCX) and size limits.
Decoupled Architecture: The frontend (React) and backend (Node.js/Express) are two separate applications, communicating via a REST API.
Cloud-Powered: Deployed on industry-standard platforms (Vercel & Render) and connected to a cloud-native database (MongoDB Atlas).
🛠️ Technology Stack & Architecture
This project follows a standard MERN stack architecture, deployed as two distinct services.
Frontend (Client): Built with React and Axios for making asynchronous API calls to the backend. Styled with pure CSS for a clean, professional look.
Backend (Server): An Express.js server running on Node.js that exposes a REST API endpoint for form submissions.
File Handling: Multer middleware processes file uploads and saves them to the server.
Database: MongoDB Atlas (a fully-managed cloud database) stores all user data. Mongoose is used as the Object Data Modeling (ODM) library to define schemas and interact with the database.
Deployment:
The frontend is deployed on Vercel for optimal performance and fast global delivery.
The backend is deployed as a web service on Render.
🚀 How to Run Locally
To get a local copy up and running, follow these simple steps.
Prerequisites
Node.js (v18 or later) & npm
Git
A MongoDB Atlas account and your connection string.
Installation
Clone the repository:
Generated sh
git clone https://github.com/prachiprashar/Resume-Collector-Website.git
cd Resume-Collector-Website
Use code with caution.
Sh
Set up the Backend (Server):
Generated sh
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create the environment variables file
# Create a new file named .env and add your MongoDB Atlas connection string:
MONGODB_URI="mongodb+srv://YourUser:YourPassword@cluster..."

# Start the server (in one terminal)
npm start
Use code with caution.
Sh
The backend will be running on http://localhost:5000.
Set up the Frontend (Client):
Generated sh
# Open a new terminal window
# Navigate to the client directory from the root
cd client

# Install dependencies
npm install

# Start the React development server
npm start
Use code with caution.
Sh
The application will open automatically in your browser at http://localhost:3000.
💡 Challenges & Learnings
Building and deploying this project provided several valuable real-world learning experiences:
Deploying a Monorepo: I learned how to deploy a single repository containing two separate applications (client and server) to two different cloud services. This involved mastering the "Root Directory" setting on both Vercel and Render to ensure each platform built the correct part of the project.
Solving CORS Issues: I troubleshooted and resolved Cross-Origin Resource Sharing (CORS) errors, which are common in decoupled applications. The solution involved correctly configuring the Express server to only accept requests from the deployed frontend URL using environment variables for security.
Handling Ephemeral Filesystems: I encountered the ENOENT: no such file or directory error on Render and learned about its ephemeral filesystem, where uploaded files are not permanent. I implemented a solution to programmatically create the uploads directory on server startup, while also understanding that the professional, long-term solution is to use a dedicated cloud storage service like AWS S3.
Debugging Production Database Connectivity: I diagnosed a 500 Internal Server Error by analyzing server logs on Render, which pointed to a MongooseServerSelectionError. This taught me the critical importance of whitelisting server IP addresses in MongoDB Atlas by setting Network Access to "Allow Access From Anywhere" (0.0.0.0/0) for a deployed application.
