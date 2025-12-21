import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const AssetList = () => {
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [editingAsset, setEditingAsset] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = axios.create({
        baseURL: 'http://localhost:5000',
        headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
    });

    // Data fetching
    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['assets', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${user?.email}`);
            return res.data;
        }
    });

    // Delete Logic
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this asset?")) {
            const res = await axiosSecure.delete(`/assets/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success("Asset deleted!");
                refetch();
            }
        }
    };

    // Update edit logic
    const onEditSubmit = async (data) => {
        const updatedDoc = {
            productName: data.productName,
            productType: data.productType,
            quantity: parseInt(data.quantity)
        };
        const res = await axiosSecure.put(`/assets/${editingAsset._id}`, updatedDoc);
        if (res.data.modifiedCount > 0) {
            toast.success("Asset updated!");
            setEditingAsset(null);
            refetch();
        }
    };

    // Chart data
    const returnableCount = assets.filter(a => a.productType === 'Returnable').length;
    const nonReturnableCount = assets.filter(a => a.productType === 'Non-returnable').length;

    const pieData = [
        { name: 'Returnable', value: returnableCount },
        { name: 'Non-returnable', value: nonReturnableCount },
    ];
    const COLORS = ['#0D9488', '#FACC15'];

    const barData = assets.slice(0, 5).map(item => ({
        name: item.productName,
        stock: item.quantity
    }));

    // Filter
    const filteredAssets = assets.filter(item =>
        item.productName.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="text-center p-20"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="max-w-[100vw] overflow-hidden space-y-6 p-0 sm:p-2 md:p-6">
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border h-[300px] sm:h-[350px]">
                    <h3 className="text-lg font-bold mb-4">Asset Distribution (Returnable vs Non)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value">
                                {pieData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border h-[350px]">
                    <h3 className="text-lg font-bold mb-4">Top 5 Asset Stock</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="stock" fill="#0D9488" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold">Company Assets</h2>
                    <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-50">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Qty</th>
                                <th>Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map(asset => (
                                <tr key={asset._id}>
                                    <td><img src={asset.image} className="w-10 h-10 rounded shadow" /></td>
                                    <td className="font-medium">{asset.productName}</td>
                                    <td>{asset.productType}</td>
                                    <td className="font-bold text-teal-600">{asset.quantity}</td>
                                    <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                                    <td className="flex flex-wrap justify-center gap-2">
                                        <button onClick={() => { setEditingAsset(asset); reset(asset); }} className="btn btn-sm btn-info text-white">Edit</button>
                                        <button onClick={() => handleDelete(asset._id)} className="btn btn-sm btn-error text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {editingAsset && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Edit Asset: {editingAsset.productName}</h3>
                        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
                            <input {...register("productName")} className="input input-bordered w-full" placeholder="Product Name" />
                            <select {...register("productType")} className="select select-bordered w-full">
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                            <input type="number" {...register("quantity")} className="input input-bordered w-full" placeholder="Quantity" />
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <button type="button" onClick={() => setEditingAsset(null)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetList;