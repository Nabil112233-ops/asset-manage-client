import React from 'react';

const UpgradePackage = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Upgrade Package</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {["Basic", "Standard", "Premium"].map((pkg, i) => (
                    <div key={i} className="border rounded-xl p-6 text-center">
                        <h3 className="text-lg font-bold">{pkg}</h3>
                        <p className="text-3xl font-bold my-3">${(i + 1) * 10}</p>
                        <button className="btn btn-primary w-full">Upgrade</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradePackage;