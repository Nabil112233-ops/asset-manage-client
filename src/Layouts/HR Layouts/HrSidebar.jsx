import React from 'react';
import { NavLink } from 'react-router';

const HrSidebar = () => {
    const linkClass = ({ isActive }) =>
        `block px-5 py-3 rounded-lg transition ${isActive
            ? "bg-teal-700 text-white"
            : "text-gray-200 hover:bg-teal-800"
        }`;
    return (
        <aside className="w-64 bg-teal-900 min-h-screen p-4 hidden md:block">
            <nav className="space-y-2">
                <NavLink to="." end className={linkClass}>Asset List</NavLink>
                <NavLink to="add_asset" className={linkClass}>Add Asset</NavLink>
                <NavLink to="request" className={linkClass}>All Requests</NavLink>
                <NavLink to="my_employee" className={linkClass}>My Employee List</NavLink>
                <NavLink to="upgrade_package" className={linkClass}>Upgrade Package</NavLink>
            </nav>
        </aside>
    );
};

export default HrSidebar;