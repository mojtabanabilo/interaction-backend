import React from 'react';
import { Link } from "react-router-dom";

export default function Main() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <ul>
                <Link to={'/sign-in'}>
                    <li>sign-in</li>
                </Link>
                <Link to={'/log-in'}>
                    <li>log-in</li>
                </Link>
            </ul>
        </div>
    );
};

