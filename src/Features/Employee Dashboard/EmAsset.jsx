import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../Hooks/axiosSecure';

const EmAsset = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');
    // console.log(filter)

    const { data: myAssets = [], refetch } = useQuery({
        queryKey: ['my-assets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-assets/${user?.email}`);
            return res.data;
        }
    });

    const handleReturn = async (id, assetId) => {
        if (!window.confirm("Are you sure you want to return this asset?")) return;

        try {
            const res = await axiosSecure.patch(`/return-asset/${id}`, { assetId })
            if (res.data.success) {
                toast.success("Asset returned successfully!");
                refetch();
            }
        } catch (error) {
            toast.error("Failed to return asset.");
        }
    };

    const handlePrint = () => {
        window.print();
    };

    const filtered = myAssets.filter(item => {
        const matchesSearch = item.assetName.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'All' || item.assetType === filter;
        return matchesSearch && matchesFilter;
    });

    // console.log(myAssets)
    return (
        <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-sm border">
            {/* Header - Non-printable during normal view if needed, but we'll style it */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6 no-print">
                <h2 className="text-2xl font-bold text-gray-800">My Assigned Assets</h2>
                <button onClick={handlePrint} className="btn btn-primary btn-sm bg-teal-600 border-none">
                    🖨️ Print Report (PDF)
                </button>
            </div>

            {/* Filter Section */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8 no-print">
                <input
                    className="input input-bordered w-full md:w-1/2"
                    placeholder="Search by asset name..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="select select-bordered" onChange={(e) => setFilter(e.target.value)}>
                    <option value="All">All Assets</option>
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Print Header */}
            <div className="hidden print:block mb-8 border-b-2 pb-4">
                <h1 className="text-3xl font-bold text-teal-700">Asset Assignment Report</h1>
                <p className="text-gray-600 mt-2">Employee: {user?.name}</p>
                <p className="text-gray-600">Company: {user?.companyName}</p>
                <p className="text-gray-600">Report Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="overflow-x-auto">
                <table className="table w-full text-sm sm:text-base">
                    <thead className="bg-gray-50">
                        <tr>
                            <th>Asset Name</th>
                            <th>Type</th>
                            <th>Company</th>
                            <th>Status</th>
                            <th className="no-print">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(item => (
                            <tr key={item._id} className="hover:bg-gray-50 border-b">
                                <td className="font-semibold text-gray-700">{item.assetName}</td>
                                <td>{item.assetType}</td>
                                <td>{item.companyName}</td>
                                <td>
                                    <span className={`badge badge-sm font-bold ${item.status === 'approved' ? 'badge-success' :
                                            item.status === 'returned' ? 'badge-info' : 'badge-ghost'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="no-print">
                                    {item.status === 'approved' && item.assetType === 'Returnable' && (
                                        <button
                                            onClick={() => handleReturn(item._id, item.assetId)}
                                            className="btn btn-xs btn-outline btn-warning"
                                        >
                                            Return
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* CSS for Professional PDF Printing */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print { display: none !important; }
                    body { font-size: 12pt; color: black; background: white; }
                    .table { width: 100%; border-collapse: collapse; }
                    .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    .badge { border: none; padding: 0; font-weight: bold; }
                }
            `}} />
        </div>
    );
};

export default EmAsset;