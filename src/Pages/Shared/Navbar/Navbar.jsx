import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import useRole from '../../../Hooks/useRole';

const Navbar = () => {

    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [role, isRoleLoading] = useRole()

    if (isRoleLoading) {
        return <span className="loading loading-spinner"></span>;
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch(error => console.log(error));
    }
    const navLinkClass = ({ isActive }) =>
        `relative px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300
     ${isActive
            ? "bg-teal-800 text-white"
            : "text-white hover:bg-teal-700"
        }`;

    const dashboardPath = role === 'hr' ? '/dashboard/hr' : '/dashboard/employee';
    return (
        <div className="navbar sticky top-0 z-50 bg-teal-800/80 backdrop-blur-lg border-b border-teal-100/20 text-white px-4 md:px-10 shadow-md">
            {/* LEFT */}
            <div className="navbar-start">
                {/* Mobile menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-teal-900 rounded-box w-52">
                        <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                        {user && <li><NavLink to={dashboardPath} className={navLinkClass}>Dashboard</NavLink></li>}
                        {!user && (
                            <>
                                <li><NavLink to="/join_as_employee" className={navLinkClass}>Join as Employee</NavLink></li>
                                <li><NavLink to="/join_as_manager" className={navLinkClass}>Join as HR Manager</NavLink></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="text-2xl font-bold tracking-wide">
                    <span className="text-teal-300">Asset</span>Verse
                </Link>
            </div>

            {/* CENTER - Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-2">
                    <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
                    {user && <li><NavLink to={dashboardPath} className={navLinkClass}>Dashboard</NavLink></li>}
                    {!user && (
                        <>
                            <li><NavLink to="/join_as_employee" className={navLinkClass}>Join as Employee</NavLink></li>
                            <li><NavLink to="/join_as_manager" className={navLinkClass}>Join as HR Manager</NavLink></li>
                        </>
                    )}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
                {!user?.email ? (
                    <Link to='login' className="btn btn-sm bg-teal-700 hover:bg-teal-600 border-none text-white">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-teal-500 ring-offset-2">
                                <img src={user?.photoURL} alt="profile" />
                            </div>
                        </label>

                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-teal-900 rounded-box w-56">
                            {/* Role based menu */}
                            {role === "employee" && (
                                <>
                                    <li><Link to="/dashboard/employee">My Assets</Link></li>
                                    <li><Link to="/dashboard/employee/my_employee">My Team</Link></li>
                                    <li><Link to="/dashboard/employee/employee_request">Request Asset</Link></li>
                                </>
                            )}

                            {role === "hr" && (
                                <>
                                    <li><Link to="/dashboard/hr">Asset List</Link></li>
                                    <li><Link to="/dashboard/hr/add_asset">Add Asset</Link></li>
                                    <li><Link to="/dashboard/hr/request">All Requests</Link></li>
                                    <li><Link to="/dashboard/hr/my_employee">Employee List</Link></li>
                                </>
                            )}

                            <li className="border-t border-teal-700 mt-1">
                                <Link to={role === 'manager' ? "/dashboard/hr/profile/hr_profile" : "/dashboard/employee/employee_profile"}>Profile</Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="text-red-400 font-bold">Logout</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;