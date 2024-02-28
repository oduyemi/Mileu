import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";


export const SignInForm = () => {
    const { handleLogin, flashMessage } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true); 
        handleLogin(formData.email, formData.password)
    };

    console.log("flashMessage:", flashMessage); 

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4 rounded-md shadow-lg">
                <h1 className="text-center text-dark text-uppercase mb-4">Sign in</h1>
                <form onSubmit={handleSubmit}>
                    {formSubmitted && flashMessage && (
                        <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage.message}
                        </div>
                    )}
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
                    <Link to="/forgot-password" className="text-decoration-none">
                        <small className="text-lightblu">Forget Password?</small>
                    </Link>
                    <div className="mt-4">
                        <button type="submit" className="btn btn-warning w-100">Login</button>
                    </div>
                </form>
                <p className="mt-4 text-center text-gray-700">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}



