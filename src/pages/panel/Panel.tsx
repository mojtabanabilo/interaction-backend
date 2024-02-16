import React from 'react';
import { useAppSelector } from '../../utils/functions/functions';

// components
import Header from '../../components/header/Header';
import Table from '../../pages/table/Tables';

export default function Panel() {
    // redux-hooks
    const selector = useAppSelector(state => state);

    return (
        <section className='w-full min-h-screen flex flex-col justify-start items-center'>
            <Header />
            {selector ? <Table /> : <div><h2>no user</h2></div>}
        </section>
    );
};

