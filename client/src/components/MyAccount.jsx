import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { CopyOutline } from "react-ionicons";



const apiKey = "kudt378649i5rfytyu5rui4";

export const MyAccount = () => {
    const { user } = useContext(UserContext);
    const [copied, setCopied] = useState(false);

    console.log("User object:", user);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

   
    return(
        <div>
            <div className="container">
                <div className="section-title row text-center">
                    <div className="text-center">
                    <h1 className="text-4l text-center fw-light mt-5 d-inline">
                        User &nbsp;
                        <span>
                            <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                Account
                            </h1>
                        </span> 
                    </h1>
                    </div>
                </div>

                <hr />

                <div className="my-5 d-flex flex-wrap justify-content-between shadow mx-auto">
                    <div className="mx-auto mb-5">
                        <h4 className="text-3xl fw-bold">
                            Personal Information
                        </h4>
                        <p>
                            First Name: &emsp;
                            <span>John</span>
                        </p>
                        <p>Last Name: &emsp; 
                            <span>Doe</span>
                        </p>
                        <p>Email Address: &emsp; 
                            <span>johndoe@gmail.com</span>
                        </p>

                        <div className="mx-auto">
                            <button className="btn btn-lg btn-warning">Edit</button>
                        </div>
                    </div>

                    <div className="mx-auto mb-5">
                        <h4 className="text-3xl fw-bold">
                            API Key
                        </h4>
                        <p className="my-3">
                            {apiKey.substring(0, 6) + '...' + apiKey.substring(apiKey.length - 5)}
                            &emsp; 
                            <span onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
                                <CopyOutline
                                    color={'#ffffff'}
                                    height="20px"
                                    width="20px"
                                />
                            </span>
                        </p>
                        {copied && <p className="text-warning">Copied!</p>}
                    </div>

                    
                </div>


            </div>

    </div>
    )
}