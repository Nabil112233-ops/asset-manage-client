import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const EmployeeNavbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/login');
            })
            .catch(error => console.log(error));
    };

    const linkClass = ({ isActive }) =>
        `block px-4 py-2 rounded-md text-sm transition ${isActive
            ? "bg-teal-700 text-white"
            : "text-gray-200 hover:bg-teal-800"
        }`;
    return (
        <div className="navbar bg-teal-900 text-white px-4 md:px-6 shadow-md">

            {/* Left: Brand & Mobile Menu */}
            <div className="navbar-start">
                <div className="md:hidden dropdown">
                    <label tabIndex={0} className="btn btn-ghost text-xl">
                        ☰
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu mt-3 w-56 rounded-xl bg-teal-800 p-2 shadow-lg z-[50]">
                        <li><NavLink to="/dashboard/employee" end={true} className={linkClass}>My Assets</NavLink></li>
                        <li><NavLink to="/dashboard/employee/employee_request" className={linkClass}>Request Asset</NavLink></li>
                        <li><NavLink to="/dashboard/employee/employee_team" className={linkClass}>My Team</NavLink></li>
                        <li><NavLink to="/dashboard/employee/employee_profile" className={linkClass}>Profile</NavLink></li>
                    </ul>
                </div>
                <h1 className="text-lg md:text-xl font-bold tracking-wide hidden lg:block">
                    AssetVerse <span className="text-teal-300">• Employee</span>
                </h1>
            </div>

            {/* Middle: Home Button */}
            <div className="navbar-center">
                <NavLink to="/" className="btn btn-ghost normal-case text-lg font-medium hover:text-teal-300">
                    Home
                </NavLink>
            </div>

            {/* Right: Employee Info & Logout Dropdown */}
            <div className="navbar-end gap-3">
                <div className="hidden sm:block text-right text-sm">
                    <p className="font-semibold leading-tight">{user?.displayName || "Employee"}</p>
                    <p className="text-gray-300 text-xs">{user?.email}</p>
                </div>

                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full border-2 border-teal-400">
                            <img
                                src={user?.photoURL || "https://i.ibb.co/2kR5k0M/user.png"}
                                alt="employee-profile"
                            />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-teal-800 rounded-box w-40">
                        <li className="sm:hidden p-2 text-xs border-b border-teal-700 text-gray-300">
                            {user?.email}
                        </li>
                        <li><NavLink to="employee_profile">Profile</NavLink></li>
                        <li>
                            <button
                                onClick={handleLogOut}
                                className="text-red-300 hover:text-red-500 font-semibold"
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EmployeeNavbar;