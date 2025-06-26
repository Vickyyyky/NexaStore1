import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setSubmitStatus('sending');

        // Simulate API call with timeout
        setTimeout(() => {
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        }, 1500);
    };

    return (
        <div className="contact-container">
            <div className="contact-content">
                <div className="contact-left">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>

                    <div className="contact-info">
                        <div className="contact-item">
                            <div className="contact-icon">
                                <span class="material-symbols-outlined">
                                    home
                                </span>
                            </div>
                            <div className="contact-text">
                                <h3>Address</h3>
                                <p>123 Shopping Street, Market City, ST 12345</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <span class="material-symbols-outlined">
                                    call
                                </span>
                            </div>
                            <div className="contact-text">
                                <h3>Phone</h3>
                                <p>(555) 123-4567</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <span class="material-symbols-outlined">
                                    mail
                                </span>
                            </div>
                            <div className="contact-text">
                                <h3>Email</h3>
                                <p>support@yourstore.com</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>
                            </div>
                            <div className="contact-text">
                                <h3>Business Hours</h3>
                                <p>Mon-Fri: 9AM - 5PM<br />Sat-Sun: 10AM - 3PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact-right">
                    <div className="contact-form-container">
                        <h2>Send a Message</h2>
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${submitStatus === 'sending' ? 'sending' : ''}`}
                                disabled={submitStatus === 'sending'}
                            >
                                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>

                            {submitStatus === 'success' && (
                                <div className="success-message">
                                    Your message has been sent successfully!
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;