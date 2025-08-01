require('dotenv').config(); // This should always be at the very top
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// --- Middleware Setup ---

// 1. Define CORS options for production and local development
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
};

// 2. Use CORS with your options. This is the ONLY place app.use(cors) should appear.
app.use(cors(corsOptions));

// 3. Other middleware
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve files from the 'uploads' directory

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// --- Multer Configuration for File Uploads ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'), false);
        }
    }
});

// --- Mongoose Schema ---
const resumeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact Number is required'],
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid contact number']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/, 'Please enter a valid email address']
    },
    applicationType: {
        type: String,
        required: [true, 'Application type is required'],
        enum: {
            values: ['Job', 'Internship'],
            message: 'Application type must be either Job or Internship'
        }
    },
    jobTitle: {
        type: String,
        required: function() { return this.applicationType === 'Job'; },
        maxlength: [100, 'Job Title cannot exceed 100 characters']
    },
    interestedAreas: {
        type: String,
        maxlength: [200, 'Interested Areas cannot exceed 200 characters']
    },
    resumePath: {
        type: String,
        required: [true, 'Resume file is required']
    }
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

// --- API Endpoint for Form Submission ---
app.post('/submit', (req, res, next) => {
    // This wrapper ensures Multer errors are caught properly before hitting the main async block
    const uploadMiddleware = upload.single('resume');
    uploadMiddleware(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send('File size too large. Max 5MB allowed.');
            }
            return res.status(400).send(err.message);
        } else if (err) {
            // This catches the custom fileFilter error (e.g., 'Invalid file type')
            return res.status(400).send(err.message);
        }
        // If no error, proceed to the next middleware (the async route handler)
        next();
    });
}, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Resume file is required.');
        }

        const newResume = new Resume({
            name: req.body.name,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            applicationType: req.body.applicationType,
            jobTitle: req.body.jobTitle,
            interestedAreas: req.body.interestedAreas,
            resumePath: req.file.path
        });

        await newResume.save();
        res.status(201).send('Resume submitted successfully!');

    } catch (error) {
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.', errors: { email: 'This email has already been used.' } });
        }

        console.error('Error submitting resume:', error);
        res.status(500).send('An unexpected error occurred.');
    }
});

// --- Server Listener ---
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});