import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import "./Register.css";
import auth from "../../../firebase.init"
import SocialLogin from '../SocialLogin/SocialLogin';
import { async } from '@firebase/util';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
    const [agree, setAgree] = useState(false);
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating, profileError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate("/login")
    };

    if(loading || updating) {
        return <Loading></Loading>
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        // const agree = e.target.terms.checked;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: name});
          alert('Updated profile');
          navigate('/home');
    }
    return (
        <div className='register-form'>
            <h2 className='text-primary text-center my-4'>Please Register</h2>
            <form className='w-75 mx-auto' onSubmit={handleRegister}>
                <input type="text" name="name" id="" placeholder='Your Name' />

                <input type="email" name="email" id="" placeholder='Your Email' required />

                <input type="password" name="password" id="" placeholder='Your Password' required />
                <input onClick={() => setAgree(!agree)} type="checkbox" name="terms" id="terms" />
                <label className={`ps-2 ${agree ? 'fw-bold' : 'text-danger'}`} htmlFor="terms">Accept Terms & Conditions</label>
                <input disabled={!agree} className='bg-dark text-white fw-bold text-uppercase w-50 mx-auto rounded my-4' type="submit" value="Register" />
                <p className='mt-3'>Already Have an Account? <Link to="/login" className='text-danger fw-bold pe-auto text-decoration-none' onClick={navigateLogin}>Please Login.</Link></p>
                <SocialLogin></SocialLogin>
            </form>

        </div>
    );
};

export default Register;