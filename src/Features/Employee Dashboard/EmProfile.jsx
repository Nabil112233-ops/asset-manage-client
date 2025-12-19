import React from 'react';

const EmProfile = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
            <h2 className="text-xl font-semibold mb-6">My Profile</h2>

            <div className="flex items-center gap-4 mb-6">
                <img
                    src="https://i.pravatar.cc/100"
                    className="w-20 h-20 rounded-full"
                />
                <button className="btn btn-outline">Upload Photo</button>
            </div>

            <form className="space-y-4">
                <input className="input input-bordered w-full" defaultValue="John Doe" />
                <input className="input input-bordered w-full" value="john@mail.com" readOnly />
                <input type="date" className="input input-bordered w-full" />
                <button className="btn btn-primary w-full">Update Profile</button>
            </form>

            <div className="mt-6">
                <h3 className="font-semibold mb-2">Company Affiliations</h3>
                <p className="text-sm text-gray-500">ABC Ltd, XYZ Corp</p>
            </div>
        </div>
    );
};

export default EmProfile;