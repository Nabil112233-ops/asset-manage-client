import React from 'react';
import { NavLink } from 'react-router';

const HrNavbar = () => {

    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-md text-sm transition ${isActive
            ? "bg-teal-700 text-white"
            : "text-gray-200 hover:bg-teal-800"
        }`;

    return (
        <div className="navbar bg-teal-900 text-white px-4 md:px-6 shadow-md">

            {/* Left: Brand */}
            <div className="flex-1 flex items-center gap-3">

                {/* Mobile Menu Button */}
                <div className="md:hidden dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-xl">
                        ☰
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu mt-3 w-56 rounded-xl bg-teal-800 p-2 shadow-lg z-[50]"
                    >
                        <li>
                            <NavLink to="." end className={linkClass}>
                                Asset List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="add_asset" className={linkClass}>
                                Add Asset
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="request" className={linkClass}>
                                All Requests
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="my_employee" className={linkClass}>
                                My Employee List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="upgrade_package" className={linkClass}>
                                Upgrade Package
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <h1 className="text-lg md:text-xl font-bold tracking-wide">
                    AssetVerse <span className="text-teal-300">• HR Dashboard</span>
                </h1>
            </div>

            {/* Right: HR Info */}
            <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right text-sm">
                    <p className="font-semibold leading-tight">HR Manager</p>
                    <p className="text-gray-300 text-xs">manager@company.com</p>
                </div>
                <img
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-teal-400"
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                />
            </div>
        </div>
    );
};

export default HrNavbar;