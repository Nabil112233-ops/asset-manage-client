import React from 'react';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const UpgradePackage = () => {
    const { user, profileRefetch } = useAuth();

    const packages = [
        { name: "Basic", members: 5, price: 5 },
        { name: "Standard", members: 10, price: 8 },
        { name: "Premium", members: 20, price: 15 },
    ];

    const handleUpgrade = async (limit) => {
        if (limit <= user?.packageLimit) {
            return toast.error("You cannot downgrade or choose the same package!");
        }

        const res = await axios.patch('http://localhost:5000/upgrade-package',
            { email: user?.email, newLimit: limit },
            { headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` } }
        );

        if (res.data.modifiedCount > 0) {
            toast.success(`Successfully upgraded to ${limit} members limit!`);
            profileRefetch()
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Choose Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {packages.map((pkg, i) => (
                    <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-sm hover:border-teal-500 transition-all text-center">
                        <h3 className="text-xl font-bold text-gray-700">{pkg.name}</h3>
                        <p className="text-5xl font-extrabold my-6 text-teal-600">${pkg.price}</p>
                        <div className="divider text-xs text-gray-400">BENEFITS</div>
                        <ul className="mb-8 text-gray-600 space-y-2">
                            <li>Maximum <b>{pkg.members}</b> Employees</li>
                            <li>Full Admin Dashboard</li>
                            <li>Inventory Management</li>
                        </ul>
                        <button
                            onClick={() => handleUpgrade(pkg.members)}
                            disabled={user?.packageLimit >= pkg.members}
                            className={`btn w-full ${user?.packageLimit === pkg.members ? 'btn-disabled' : 'btn-primary'}`}
                        >
                            {user?.packageLimit === pkg.members ? 'Current Plan' : 'Buy Now'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackage;