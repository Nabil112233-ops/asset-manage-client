import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const UpgradePackage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const packages = [
        { name: "Basic", members: 5, price: 5 },
        { name: "Standard", members: 10, price: 8 },
        { name: "Premium", members: 20, price: 15 },
    ];

    const goToPayment = (pkg) => {
        if (pkg.members <= user?.packageLimit) {
            return toast.error("You are already on this plan or a higher one!");
        }

        navigate('/dashboard/hr/payment', { 
            state: { 
                price: pkg.price, 
                newLimit: pkg.members 
            } 
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Upgrade Your Team Capacity</h2>
                    <p className="text-gray-500">Current Limit: <span className="badge badge-secondary font-bold">{user?.packageLimit} Members</span></p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {packages.map((pkg, i) => (
                        <div 
                            key={i} 
                            className={`relative bg-white border-2 rounded-3xl p-6 md:p-8 shadow-sm transition-all flex flex-col ${
                                user?.packageLimit === pkg.members 
                                ? 'border-teal-500 ring-2 ring-teal-100 shadow-md' 
                                : 'border-gray-100 hover:border-teal-200 hover:shadow-lg'
                            }`}
                        >
                            {/* Current Plan Badge */}
                            {user?.packageLimit === pkg.members && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Active Plan
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-700">{pkg.name}</h3>
                            <div className="my-6">
                                <span className="text-5xl font-extrabold text-teal-600">${pkg.price}</span>
                                <span className="text-gray-400 font-medium ml-2">/ one-time</span>
                            </div>

                            <div className="divider text-xs text-gray-400 font-semibold tracking-wider">PLAN BENEFITS</div>
                            
                            <ul className="mb-8 text-gray-600 space-y-4 flex-grow text-left">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Add up to <b>{pkg.members}</b> Employees
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Advanced Inventory Analytics
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Priority Support
                                </li>
                            </ul>

                            <button
                                onClick={() => goToPayment(pkg)}
                                disabled={user?.packageLimit >= pkg.members}
                                className={`btn btn-lg rounded-2xl border-none font-bold transition-all ${
                                    user?.packageLimit >= pkg.members 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg hover:shadow-teal-200'
                                }`}
                            >
                                {user?.packageLimit === pkg.members ? 'Current Plan' : 'Choose Plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpgradePackage;