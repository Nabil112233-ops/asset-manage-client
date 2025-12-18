import React from 'react';

const EmAsset = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">My Assets</h2>

            <div className="flex gap-4 mb-4">
                <input className="input input-bordered w-full" placeholder="Search by asset name" />
                <select className="select select-bordered">
                    <option>All</option>
                    <option>Returnable</option>
                    <option>Non-returnable</option>
                </select>
                <button className="btn">Print</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Request</th>
                            <th>Approved</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Laptop</td>
                            <td>Returnable</td>
                            <td>ABC Ltd</td>
                            <td>2025-01-10</td>
                            <td>2025-01-11</td>
                            <td><span className="badge badge-success">Approved</span></td>
                            <td>
                                <button className="btn btn-xs btn-warning">Return</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmAsset;