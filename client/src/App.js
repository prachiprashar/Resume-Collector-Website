import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the new CSS file

function App() {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        applicationType: 'Job',
        jobTitle: '',
        interestedAreas: '',
    });
    const [resumeFile, setResumeFile] = useState(null);
    const [fileName, setFileName] = useState('Click to upload PDF, DOC, or DOCX');
    const [errors, setErrors] = useState({});
    const [submitMessage, setSubmitMessage] = useState('');

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/;
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact Number is required';
        if (formData.contactNumber.trim() && !phoneRegex.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Please enter a valid contact number';
        }
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (formData.email.trim() && !emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (formData.applicationType === 'Job' && !formData.jobTitle.trim()) {
            newErrors.jobTitle = 'Job Title is required for Job applications';
        }
        if (!resumeFile) {
            newErrors.resume = 'Resume file is required.';
        } else {
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(resumeFile.type)) {
                newErrors.resume = 'Invalid file type. Only PDF, DOC, and DOCX are allowed.';
            }
            if (resumeFile.size > 5 * 1024 * 1024) { // 5 MB
                newErrors.resume = 'File size too large. Max 5MB allowed.';
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResumeFile(file);
            setFileName(file.name);
            if (errors.resume) {
                setErrors(prev => ({ ...prev, resume: '' }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage('');

        if (!validate()) {
            setSubmitMessage({ type: 'error', text: 'Please correct the errors in the form.' });
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        data.append('resume', resumeFile);

        // *** THIS IS THE CRITICAL CHANGE FOR DEPLOYMENT ***
        // It uses an environment variable for the API URL.
        // On your local machine, it will be undefined, so we can fall back to the localhost URL.
        // On Vercel, you will set REACT_APP_API_URL to your live Render backend URL.
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

        try {
            const response = await axios.post(`${apiUrl}/submit`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setSubmitMessage({ type: 'success', text: response.data });
            // Reset form
            setFormData({ name: '', contactNumber: '', email: '', applicationType: 'Job', jobTitle: '', interestedAreas: '' });
            setResumeFile(null);
            setFileName('Click to upload PDF, DOC, or DOCX');
            setErrors({});
            e.target.reset();
        } catch (error) {
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                if (errorData.errors) {
                    setErrors(errorData.errors);
                    setSubmitMessage({ type: 'error', text: errorData.message || 'Validation failed on server.' });
                } else {
                    setSubmitMessage({ type: 'error', text: errorData });
                }
            } else {
                setSubmitMessage({ type: 'error', text: 'An unexpected error occurred while submitting.' });
            }
        }
    };

    return (
        <div className="app-container">
            <h1 className="app-header">Resume Collector</h1>
            
            {submitMessage.text && (
                <div className={`submit-message ${submitMessage.type}`}>
                    {submitMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="resume-form" noValidate>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} required />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input id="contactNumber" type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                    {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="applicationType">Application Type</label>
                    <select id="applicationType" name="applicationType" value={formData.applicationType} onChange={handleChange}>
                        <option value="Job">Job Application</option>
                        <option value="Internship">Internship Application</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <input id="jobTitle" type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                    {errors.jobTitle && <p className="error-message">{errors.jobTitle}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="interestedAreas">Interested Areas (Optional)</label>
                    <input id="interestedAreas" type="text" name="interestedAreas" value={formData.interestedAreas} onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label>Resume (PDF/DOC/DOCX - Max 5MB)</label>
                    <label htmlFor="resume" className="file-input-label">
                        {fileName}
                    </label>
                    <input id="resume" type="file" name="resume" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                    {errors.resume && <p className="error-message">{errors.resume}</p>}
                </div>

                <button type="submit" className="submit-btn">Submit Application</button>
            </form>
        </div>
    );
}

export default App;