import React from 'react';

const AssetList = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Company Assets</h2>

            <input
                type="text"
                placeholder="Search asset..."
                className="input input-bordered w-full mb-4"
            />

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Qty</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src="https://via.placeholder.com/40" /></td>
                            <td>Laptop</td>
                            <td>Returnable</td>
                            <td>12</td>
                            <td>2025-01-01</td>
                            <td className="space-x-2">
                                <button className="btn btn-xs btn-info">Edit</button>
                                <button className="btn btn-xs btn-error">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetList;