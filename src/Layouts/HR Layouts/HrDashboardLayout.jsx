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
                <main className='flex-1 p-0 mt-4 md:p-6 overflow-x-auto w-full'>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default HrDashboardLayout;