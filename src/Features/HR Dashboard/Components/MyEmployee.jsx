import React from 'react';

const MyEmployee = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-2">My Employees</h2>
            <p className="text-sm text-gray-500 mb-4">3 / 5 employees used</p>

            <table className="table">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Assets</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img className="w-10 rounded-full" src="https://i.pravatar.cc/50" /></td>
                        <td>Jane Smith</td>
                        <td>jane@mail.com</td>
                        <td>2</td>
                        <td>
                            <button className="btn btn-xs btn-error">Remove</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MyEmployee;