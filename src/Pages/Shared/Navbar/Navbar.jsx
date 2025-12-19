import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {

    const user = true;
    const role = "employee";

    const navLinkClass = ({ isActive }) =>
        `relative px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300
     ${isActive
            ? "bg-teal-800 text-white"
            : "text-white hover:bg-teal-700"
        }`;

    return (
        <div className="navbar sticky top-0 z-50  bg-teal-800/80 backdrop-blur-lg  border-b
         border-teal-100/20 text-white px-4 md:px-10 shadow-md">
            {/* LEFT */}
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-teal-900 rounded-box w-52"
                    >
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        <li><NavLink to="/join_as_employee" className={navLinkClass}>Join as Employee</NavLink></li>
                        <li><NavLink to="/join_as_manager" className={navLinkClass}>Join as HR Manager</NavLink></li>
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    <span className="text-teal-300">Asset</span>Verse
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2">
                    <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                    <li><NavLink to="/join_as_employee" className={navLinkClass}>Join as Employee</NavLink></li>
                    <li><NavLink to="/join_as_manager" className={navLinkClass}>Join as HR Manager</NavLink></li>
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
                {!user ? (
                    <Link to='login' className="btn btn-sm bg-teal-700 hover:bg-teal-600 border-none text-white">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-teal-500 ring-offset-2">
                                <img
                                    src="https://i.ibb.co/2kR5k0M/user.png"
                                    alt="profile"
                                />
                            </div>
                        </label>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-teal-900 rounded-box w-56"
                        >
                            {role === "employee" && (
                                <>
                                    <li><Link>My Assets</Link></li>
                                    <li><Link>My Team</Link></li>
                                    <li><Link>Request Asset</Link></li>
                                </>
                            )}

                            {role === "hr" && (
                                <>
                                    <li><Link>Asset List</Link></li>
                                    <li><Link>Add Asset</Link></li>
                                    <li><Link>All Requests</Link></li>
                                    <li><Link>Employee List</Link></li>
                                </>
                            )}

                            <li className="border-t border-teal-700 mt-1">
                                <Link>Profile</Link>
                            </li>
                            <li>
                                <button className="text-red-400">Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;