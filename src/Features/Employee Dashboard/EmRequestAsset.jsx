import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';

const EmRequestAsset = () => {
    const { user } = useAuth();
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [note, setNote] = useState('');

    const { data: assets = [] } = useQuery({
        queryKey: ['available-assets'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/all-available-assets', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data;
        }
    });

    const handleRequest = async () => {
        const requestData = {
            assetId: selectedAsset._id,
            assetName: selectedAsset.productName,
            assetType: selectedAsset.productType,
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            hrEmail: selectedAsset.hrEmail,
            companyName: selectedAsset.companyName,
            requestDate: new Date().toISOString(),
            status: 'pending',
            note: note
        };

        const res = await axios.post('http://localhost:5000/asset-requests', requestData, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('access-token')}`
            }
        });
        if (res.data.insertedId) {
            toast.success("Request sent successfully!");
            setSelectedAsset(null);
            setNote('');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Request an Asset</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {assets.map((asset) => (
                    <div key={asset._id} className="bg-white p-6 rounded-xl shadow-md border">
                        <img src={asset.image} className="w-20 h-20 object-cover mb-4 rounded" alt="" />
                        <h3 className="font-bold text-lg">{asset.productName}</h3>
                        <p className="text-sm text-gray-500">{asset.productType}</p>
                        <p className={`text-sm font-semibold ${asset.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            Available: {asset.quantity}
                        </p>
                        <button
                            disabled={asset.quantity === 0}
                            onClick={() => setSelectedAsset(asset)}
                            className="btn btn-primary btn-sm w-full mt-4"
                        >
                            Request
                        </button>
                    </div>
                ))}
            </div>

            {/* Request Modal */}
            {selectedAsset && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Request for {selectedAsset.productName}</h3>
                        <textarea
                            className="textarea textarea-bordered w-full mt-4"
                            placeholder="Add a note (optional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                        <div className="modal-action">
                            <button onClick={handleRequest} className="btn btn-primary">Submit Request</button>
                            <button onClick={() => setSelectedAsset(null)} className="btn">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmRequestAsset;