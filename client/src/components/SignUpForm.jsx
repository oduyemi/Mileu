import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CopyOutline } from "react-ionicons";

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
    const [apiKey, setApiKey] = useState(""); 
    const [copied, setCopied] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.password !== formData.confirmPassword) {
                throw new Error("Passwords do not match");
            }

            const response = await axios.post("https://mileu.onrender.com/sign-up", formData, {
                headers: { "Content-Type": "application/json" }
            });

            console.log(response.data);

            setApiKey(response.data.api_key); 

            setFlashMessage({
                type: "success",
                message: "Registration successful. Your API key is displayed below. Copy it now.",
            });

            setFormSubmitted(true);

            setTimeout(() => {
                window.location.href = "/signin";
            }, 4000);

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center mb-5 up">
            <div className="card p-4 shadow">
                <h1 className="text-center text-dark text-uppercase mb-2">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    {formSubmitted && (
                        <div>
                            <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                                {flashMessage?.message}
                            </div>
                            {apiKey && (
                                <div className="mx-auto mb-5">
                                    <h4 className="text-3xl fw-bold mb-3">
                                        API Key
                                    </h4>
                                    <p className="my-3">
                                        {apiKey}
                                        &emsp;
                                        <span onClick={copyToClipboard} style={{ cursor: "pointer" }}>
                                            <CopyOutline
                                                color={"#023047"}
                                                height="20px"
                                                width="20px"
                                            />
                                        </span>
                                    </p>
                                    {copied && <p className="text-warning">Copied!</p>}
                                </div>
                            )}
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
};
