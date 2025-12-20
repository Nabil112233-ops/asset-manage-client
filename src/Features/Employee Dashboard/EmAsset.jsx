import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';

const EmAsset = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const { data: myAssets = [], refetch } = useQuery({
        queryKey: ['my-assets', user?.email],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/my-assets/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    });

    const filtered = myAssets.filter(item => {
        const matchesSearch = item.assetName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || item.assetType === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">My Assigned Assets</h2>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    className="input input-bordered w-full"
                    placeholder="Search by asset name"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="select select-bordered" onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
                <button onClick={() => window.print()} className="btn btn-outline">Print Report</button>
            </div>

            <table className="table w-full">
                <thead>
                    <tr className="bg-gray-50">
                        <th>Asset Name</th>
                        <th>Type</th>
                        <th>Company</th>
                        <th>Request Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(item => (
                        <tr key={item._id}>
                            <td className="font-semibold">{item.assetName}</td>
                            <td>{item.assetType}</td>
                            <td>{item.companyName}</td>
                            <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                            <td>
                                <span className={`badge ${item.status === 'approved' ? 'badge-success' : 'badge-ghost'}`}>
                                    {item.status}
                                </span>
                            </td>
                            <td>
                                {item.status === 'approved' && item.assetType === 'Returnable' ? (
                                    <button className="btn btn-xs btn-warning">Return</button>
                                ) : (
                                    <span className="text-xs text-gray-400">No Action</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmAsset;