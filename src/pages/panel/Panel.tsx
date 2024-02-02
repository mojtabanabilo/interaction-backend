import React from 'react';

// components
import Header from '../../components/header/Header';
import Users from '../users/Users';

export default function Panel() {
    return (
        <section className='w-full h-full flex flex-col justify-start items-center'>
            <Header />
            <Users />
        </section>
    );
};

