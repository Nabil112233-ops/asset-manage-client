import React from 'react';

const AllRequest = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Asset Requests</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Asset</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John Doe</td>
                        <td>Laptop</td>
                        <td>2025-02-01</td>
                        <td><span className="badge badge-warning">Pending</span></td>
                        <td className="space-x-2">
                            <button className="btn btn-xs btn-success">Approve</button>
                            <button className="btn btn-xs btn-error">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AllRequest;