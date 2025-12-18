import React from 'react';
import { NavLink } from 'react-router';

const EmployeeSidebar = () => {
    const linkClass = ({ isActive }) =>
        `block px-5 py-3 rounded-lg transition ${isActive
            ? "bg-teal-700 text-white"
            : "text-gray-200 hover:bg-teal-800"
        }`;
    return (
        <aside className="w-64 bg-teal-900 min-h-screen p-4 hidden md:block">
            <nav className="space-y-2">
                <NavLink to="." end className={linkClass}>My Assets</NavLink>
                <NavLink to="employee_request" className={linkClass}>Request Asset</NavLink>
                <NavLink to="/employee/team" className={linkClass}>My Team</NavLink>
                <NavLink to="/employee/profile" className={linkClass}>Profile</NavLink>
            </nav>
        </aside>
    );
};

export default EmployeeSidebar;