import React from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import EmployeeSidebar from './EmployeeSidebar';
import { Outlet } from 'react-router';

const EmployeeDashboardLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <EmployeeNavbar></EmployeeNavbar>
            <div className="flex">
                <EmployeeSidebar></EmployeeSidebar>
                <main className="flex-1 p-6 overflow-x-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default EmployeeDashboardLayout;