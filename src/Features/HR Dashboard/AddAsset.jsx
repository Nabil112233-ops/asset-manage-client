import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../Hooks/uploadImage';
import useAuth from '../../Hooks/useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddAsset = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth()
    console.log(user)
    // React Hook Form initialization
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const imageFile = data.image[0];
            // upload to img bb
            const imageUrl = await uploadImage(imageFile);

            if (imageUrl) {
                const finalData = {
                    productName: data.productName,
                    productType: data.productType,
                    quantity: parseInt(data.quantity),
                    hrEmail: user?.email,
                    companyName: user?.companyName,
                    image: imageUrl,
                    createdAt: new Date().toISOString()
                };
                // data send to backend
                const response = await axios.post('http://localhost:5000/assets', finalData, {
                    headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
                });
                console.log("Final Asset Data:", finalData);
                if (response.data.insertedId) {
                    toast.success("Asset Added Successfully!");
                    reset();
                }
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">Add New Asset</h2>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Product Name */}
                    <div className="form-control">
                        <label className="label font-medium text-gray-700">Product Name</label>
                        <input
                            {...register("productName", { required: "Product name is required" })}
                            className={`input input-bordered w-full focus:input-primary ${errors.productName && 'border-red-500'}`}
                            placeholder="e.g. MacBook Pro M3"
                        />
                        {errors.productName && <span className="text-red-500 text-sm mt-1">{errors.productName.message}</span>}
                    </div>

                    {/* Image Upload Field */}
                    <div className="form-control">
                        <label className="label font-medium text-gray-700">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("image", { required: "Image is required" })}
                            className={`file-input file-input-bordered w-full ${errors.image && 'border-red-500'}`}
                        />
                        {errors.image && <span className="text-red-500 text-sm mt-1">{errors.image.message}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Product Type */}
                        <div className="form-control text-gray-700">
                            <label className="label font-medium">Type</label>
                            <select
                                {...register("productType", { required: true })}
                                className="select select-bordered w-full focus:select-primary"
                            >
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                        </div>

                        {/* Quantity */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-700">Quantity</label>
                            <input
                                type="number"
                                {...register("quantity", { required: "Required", min: 1 })}
                                className={`input input-bordered w-full focus:input-primary ${errors.quantity && 'border-red-500'}`}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn btn-primary w-full text-white text-lg font-semibold mt-4 ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Uploading...' : 'Add Asset'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;