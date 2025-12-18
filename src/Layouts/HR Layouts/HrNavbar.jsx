import React from 'react';

const HrNavbar = () => {
    return (
        <div className="navbar bg-teal-900 text-white px-6 shadow-md">
            <div className="flex-1">
                <h1 className="text-xl font-bold">AssetVerse • HR Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
                <div className="text-right text-sm">
                    <p className="font-semibold">HR Manager</p>
                    <p className="text-gray-300">manager@company.com</p>
                </div>
                <img
                    className="w-10 h-10 rounded-full border-2 border-teal-400"
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                />
            </div>
        </div>
    );
};

export default HrNavbar;