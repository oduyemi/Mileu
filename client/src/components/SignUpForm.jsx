import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



export const SignUpForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match");
            }
    
            const response = await axios.post("http://localhost:8000/sign-up", formData, {
                headers: { "Content-Type": "application/json" }
            });
    
            console.log(response.data);
    
            setFlashMessage({
                type: "success",
                message: "Registration successful. Please login to view your API key",
            });
    
            setFormSubmitted(true);
    
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
    
        } catch (error) {
            console.error("Error:", error);
    
            let errorMessage;
            if (error.response) {
                console.log("Response Data:", error.response.data);
                errorMessage = error.response.data.detail || error.response.data.message;
            } else {
                console.error("Request Error:", error.request);
                errorMessage = "No response received from the server. Please try again later.";
            }
    
            setFlashMessage({ type: "error", message: errorMessage });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mb-5 up">
            <div className="card p-4 shadow">
                <h1 className="text-center text-dark text-uppercase mb-2">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {formSubmitted && (
                        <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage?.message}
                        </div>
                    )}
                    <div className="mb-2">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName} 
                        onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text"
                        className="form-control" 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email"
                         className="form-control" 
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange} />
                    </div>
                    <div className="mb-2">
                        <button type="submit" className="btn btn-lg btn-warning w-100">Sign Up</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-decoration-none">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
