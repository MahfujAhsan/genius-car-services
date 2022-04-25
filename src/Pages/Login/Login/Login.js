import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import SocialLogin from '../SocialLogin/SocialLogin';
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorElement;

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (loading || sending) {
        return <Loading></Loading>
    }


    if (user) {
        // navigate(from, { replace: true });
    };

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password)
        const {data} = await axios.post('http://localhost:5000/login', {email})
        localStorage.setItem('accessToken', data.accessToken)
        navigate(from, { replace: true });
    };
    const navigateRegister = () => {
        navigate('/register');
    };
    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Check Your Email');
        }
        else {
            toast('Please Enter Your Email')
        }
    }

    return (
        <div className='container w-75 mx-auto'>
            <h2 className='text-center text-primary my-4'>Please Log In</h2>
            <Form className='login-form' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control className='' ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Button className='w-50 mx-auto d-block my-4 text-uppercase fw-bold' variant="primary" type="submit">
                    Log In
                </Button>
                {errorElement}
                <p>New To Genius Car? <Link to="/register" className='text-danger fw-bold pe-auto text-decoration-none' onClick={navigateRegister}>Please Register.</Link></p>
                <p className='text-primary'>Forget Password? <button className='btn btn-link text-danger fw-bold pe-auto text-decoration-none' onClick={resetPassword}>Reset Password</button></p>
                <SocialLogin></SocialLogin>
                <ToastContainer />
            </Form>
        </div>
    );
};

export default Login;