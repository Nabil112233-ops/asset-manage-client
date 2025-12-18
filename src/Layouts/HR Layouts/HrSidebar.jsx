import React from 'react';
import { NavLink } from 'react-router';

const Sidebar = () => {
    const linkClass = ({ isActive }) =>
        `block px-5 py-3 rounded-lg transition ${isActive
            ? "bg-teal-700 text-white"
            : "text-gray-200 hover:bg-teal-800"
        }`;
    return (
        <aside className="w-64 bg-teal-900 min-h-screen p-4 hidden md:block">
            <nav className="space-y-2">
                <NavLink to="/hr/assets" className={linkClass}>Asset List</NavLink>
                <NavLink to="/hr/add-asset" className={linkClass}>Add Asset</NavLink>
                <NavLink to="/hr/requests" className={linkClass}>All Requests</NavLink>
                <NavLink to="/hr/employees" className={linkClass}>My Employee List</NavLink>
                <NavLink to="/hr/upgrade" className={linkClass}>Upgrade Package</NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;