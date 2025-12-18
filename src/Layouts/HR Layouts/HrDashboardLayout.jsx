import React from 'react';
import HrNavbar from './HrNavbar';
import HrSidebar from './HrSidebar';
import { Outlet } from 'react-router';

const HrDashboardLayout = () => {
    return (
        <div className='min-h-screen bg-gray-100'>
            <HrNavbar></HrNavbar>
            <div className='flex'>
                <HrSidebar></HrSidebar>
                <main className='flex-1 p-7'>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default HrDashboardLayout;