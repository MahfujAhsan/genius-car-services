import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate("/login")
    };
    const handleRegister = e => {
        e.prevent.default();
    }
    return (
        <div className='register-form'>
            <h2 className='text-primary text-center mt-2'>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Your Name'/>
                
                <input type="email" name="email" id="" placeholder='Your Email' required/>
                
                <input type="password" name="password" id="" placeholder='Your Password' required/>
                <input type="submit" value="Register" />
            </form>
            <p>Already Have an Account? <Link to="/login" className='text-danger fw-bold pe-auto text-decoration-none' onClick={navigateLogin}>Please Login.</Link></p>
        </div>
    );
};

export default Register;