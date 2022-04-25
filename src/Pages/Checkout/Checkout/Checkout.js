import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useServiceDetail from '../../../hooks/useServiceDetail';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value,
        }
        axios.post('http://localhost:5000/order', order)
            .then(res => {
                const {data} = res;
                if(data.insertedId) {
                    toast('Your Order Is Booked')
                    e.target.reset()
                }
            })
    }
    return (
        <div className='w-50 mx-auto text-center'>
            <h2>Please PaY: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" name="name" value={user?.displayName} placeholder='Name' id="" required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="email" name="email" value={user?.email} placeholder='Email Address' id="" required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name="service" placeholder='Service' id="" required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" autoComplete='off' name="address" placeholder='Address' id="" required/>
                <input className='w-100 mb-2' type="tel" name="phone" placeholder='Phone' id="" required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;