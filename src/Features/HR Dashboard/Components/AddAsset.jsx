import React from 'react';

const AddAsset = () => {
    return (
        <div className="bg-white rounded-xl shadow p-6 max-w-xl">
            <h2 className="text-xl font-semibold mb-4">Add New Asset</h2>

            <form className="space-y-4">
                <input className="input input-bordered w-full" placeholder="Product Name" />
                <input className="input input-bordered w-full" placeholder="Image URL (ImgBB)" />

                <select className="select select-bordered w-full">
                    <option>Returnable</option>
                    <option>Non-returnable</option>
                </select>

                <input type="number" className="input input-bordered w-full" placeholder="Quantity" />

                <button className="btn btn-primary w-full">Add Asset</button>
            </form>
        </div>
    );
};

export default AddAsset;