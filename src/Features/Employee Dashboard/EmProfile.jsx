import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadImage } from '../../Hooks/uploadImage'; 
import useAxiosSecure from '../../Hooks/axiosSecure';

const EmProfile = () => {
    const axiosSecure = useAxiosSecure()
    const { user, profileRefetch, updateUserProfile } = useAuth();
    const { register, handleSubmit } = useForm();
    const [uploading, setUploading] = useState(false);

    const onSubmit = async (data) => {
        setUploading(true);

        try {
            let photoURL = user?.photo || user?.photoURL;
            if (data.photo && data.photo[0]) {
                const uploadedUrl = await uploadImage(data.photo[0]);
                if (uploadedUrl) {
                    photoURL = uploadedUrl;
                }
            }

            await updateUserProfile(data.name, photoURL);

            const updateInfo = {
                name: data.name,
                dob: data.dob,
                photo: photoURL
            };

            const dbRes = await axiosSecure.patch(`/update-profile/${user?.email}`, updateInfo);

            if (dbRes.data.modifiedCount > 0 || dbRes.data.matchedCount > 0) {
                toast.success("Profile updated successfully!");
                profileRefetch(); 
            }
        } catch (error) {
            console.error("Update Error:", error);
            toast.error("Failed to update profile");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="h-32 bg-gradient-to-r from-teal-600 to-teal-400"></div>

                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-end gap-4">
                            <div className="avatar">
                                <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg">
                                    <img src={user?.photo || user?.photoURL || "https://i.pravatar.cc/150"} alt="Profile" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold text-gray-400 uppercase">Change Avatar</label>
                                <input
                                    type="file"
                                    {...register("photo")}
                                    className="file-input file-input-bordered file-input-teal file-input-sm w-full max-w-xs"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-500">Full Name</label>
                                <input
                                    {...register("name")}
                                    defaultValue={user?.name || user?.displayName}
                                    className="input input-bordered focus:border-teal-500 w-full bg-gray-50"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-500">Email Address</label>
                                <input
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered w-full bg-gray-100 text-gray-400 cursor-not-allowed"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-500">Date of Birth</label>
                                <input
                                    type="date"
                                    {...register("dob")}
                                    defaultValue={user?.dob}
                                    className="input input-bordered focus:border-teal-500 w-full bg-gray-50"
                                />
                            </div>

                            <div className="md:col-span-2 mt-4 text-right">
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="btn bg-teal-600 hover:bg-teal-700 text-white px-8 border-none"
                                >
                                    {uploading ? <span className="loading loading-spinner"></span> : "Update Profile"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmProfile;