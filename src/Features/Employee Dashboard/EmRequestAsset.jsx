import React from 'react';

const EmRequestAsset = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Request an Asset</h2>

            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow">
                        <img src="https://via.placeholder.com/80" className="mb-4" />
                        <h3 className="font-semibold">Office Chair</h3>
                        <p className="text-sm text-gray-500">Returnable</p>
                        <p className="text-sm mb-4">Available: 5</p>
                        <button className="btn btn-primary w-full">Request</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmRequestAsset;