import React from 'react';
import { Link } from 'react-router';

const EmployeeNavbar = () => {
    return (
        <div className="navbar bg-teal-900 text-white px-6 shadow-md">
            <div className="flex-1">
                <h1 className="text-xl font-bold">AssetVerse • Employee</h1>
            </div>

            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost">
                    Menu
                </label>
                <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-teal-800 text-white rounded-box w-52 mt-3 p-2 shadow"
                >
                    <li><Link to="." end>My Assets</Link></li>
                    <li><Link to="employee_request">Request Asset</Link></li>
                    <li><Link to="employee_team">My Team</Link></li>
                    <li><Link to="employee_profile">Profile</Link></li>
                </ul>
            </div>

            {/* Profile */}
            <img
                className="w-10 h-10 rounded-full border-2 border-teal-400 ml-4"
                src="https://i.pravatar.cc/100"
                alt="profile"
            />
        </div>
    );
};

export default EmployeeNavbar;