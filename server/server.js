require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path'); // Ensure this is present and correct

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer file filter for validation (type and size)
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

// Mongoose Schema with Validations
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
        // Basic regex for 10-15 digits, allowing optional + at start
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid contact number']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures email is unique in the database
        // Basic regex for email format
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/, 'Please enter a valid email address']
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
        required: function() { return this.applicationType === 'Job'; }, // Required only if applicationType is 'Job'
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
}, { timestamps: true }); // Add timestamps for created/updated info

const Resume = mongoose.model('Resume', resumeSchema);

// API Endpoint for Form Submission
app.post('/submit', upload.single('resume'), async (req, res) => {
    try {
        // Multer errors are caught here (e.g., file type, size)
        if (req.fileValidationError) {
            return res.status(400).send(req.fileValidationError);
        }
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
            resumePath: req.file.path // Multer stores path here
        });

        await newResume.save();
        res.status(201).send('Resume submitted successfully!');

    } catch (error) {
        // Mongoose validation errors
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation failed', errors });
        }
        // Duplicate email error (E11000)
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists.', errors: { email: 'This email has already been used.' } });
        }
        // Multer errors (e.g., file size exceeded)
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send('File size too large. Max 5MB allowed.');
            }
            return res.status(400).send(error.message);
        }

        console.error('Error submitting resume:', error);
        res.status(500).send('An unexpected error occurred.');
    }
});

// Global error handler for Multer fileFilter errors
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).send('File size too large. Max 5MB allowed.');
        }
    } else if (err) {
        // This is for the custom error from fileFilter
        return res.status(400).send(err.message);
    }
    next(err);
});

// server/server.js
const cors = require('cors');

// This allows requests from your local React app AND your future deployed frontend
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Use the options here


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});