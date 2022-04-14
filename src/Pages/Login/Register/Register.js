import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import "./Register.css";
import auth from "../../../firebase.init"
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const navigateLogin = () => {
        navigate("/login")
    };

    if(user) {
        navigate('/home');
    }

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(email, password)     
    }
    return (
        <div className='register-form'>
            <h2 className='text-primary text-center my-4'>Please Register</h2>
            <form onSubmit={handleRegister}>
                <input  type="text" name="name" id="" placeholder='Your Name'/>
                
                <input type="email" name="email" id="" placeholder='Your Email' required/>
                
                <input type="password" name="password" id="" placeholder='Your Password' required/>
                <input className='bg-dark text-white fw-bold text-uppercase w-50 mx-auto rounded my-4' type="submit" value="Register" />
            </form>
            <p>Already Have an Account? <Link to="/login" className='text-danger fw-bold pe-auto text-decoration-none' onClick={navigateLogin}>Please Login.</Link></p>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;