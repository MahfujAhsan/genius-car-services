import React from 'react';
import google from "../../../images/social/google.png"
import facebook from "../../../images/social/facebook.png"
import github from "../../../images/social/github.png"
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, gitHubLoading, githubError] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    let errorElement;

    if(googleLoading || gitHubLoading) {
        return <Loading></Loading>
    }
    if (googleError || githubError) {
        errorElement = <p className='text-danger'>Error: {googleError?.message} {githubError?.message}</p>
    }
    if (googleUser || githubUser) {
        navigate(from, { replace: true });
    }
    return (
        <div>
            <div className='d-flex align-items-center'>
                <div style={{ height: '1px' }} className="bg-primary w-50"></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className="bg-primary w-50"></div>
            </div>
            {errorElement}
            <div className=''>
                <button onClick={() => signInWithGoogle()} className='btn btn-light w-50 d-block mx-auto border border-2 border-dark'>
                    <img style={{ width: "30px" }} src={google} alt="" />
                    <span className='px-3'>GooGle Sign In</span>
                </button>
                <button className='btn btn-light my-3 w-50 d-block mx-auto border border-2 border-dark'>
                    <img style={{ width: "30px" }} src={facebook} alt="" />
                    <span className='px-3'>Facebook Sign In</span>
                </button>
                <button onClick={() => signInWithGithub()} className='btn btn-light w-50 d-block mx-auto border border-2 border-dark'>
                    <img style={{ width: "30px" }} src={github} alt="" />
                    <span className='px-3'>GitHub Sign In</span>
                </button>
            </div>
        </div>

    );
};

export default SocialLogin;