import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadImage } from '../../Hooks/uploadImage';

const HrProfile = () => {
    const { user, profileRefetch, updateUserProfile } = useAuth();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let logoURL = user?.companyLogo || user?.photoURL;

            if (data.logo && data.logo[0]) {
                const uploadedUrl = await uploadImage(data.logo[0]);
                if (uploadedUrl) {
                    logoURL = uploadedUrl;
                }
            }

            await updateUserProfile(data.name, logoURL);

            const updateInfo = {
                name: data.name,
                companyName: data.companyName,
                companyLogo: logoURL
            };

            const res = await axios.patch(`https://asset-manage-server-git-main-junayed-al-nur-nabils-projects.vercel.app/update-hr-profile/${user?.email}`, updateInfo, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });

            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                toast.success("Company profile updated!");
                profileRefetch();
            }
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Brand Header */}
                <div className="h-40 bg-gradient-to-r from-slate-800 to-teal-700 flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-white tracking-widest opacity-20 uppercase">
                        {user?.companyName || "Your Company"}
                    </h1>
                </div>

                <div className="px-10 pb-10">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative -mt-20 mb-8 flex flex-col items-center md:items-start gap-4">
                            <div className="avatar">
                                <div className="w-40 h-40 rounded-3xl border-8 border-white shadow-2xl bg-gray-50">
                                    <img src={user?.companyLogo || user?.photoURL || "https://via.placeholder.com/150"} alt="Logo" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label py-1 text-xs font-bold text-gray-500 uppercase">Change Company Logo</label>
                                <input
                                    type="file"
                                    {...register("logo")}
                                    className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">HR Manager Name</label>
                                <input
                                    {...register("name")}
                                    defaultValue={user?.name || user?.displayName}
                                    className="input input-bordered focus:border-teal-500 bg-gray-50 font-semibold"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">Company Name</label>
                                <input
                                    {...register("companyName")}
                                    defaultValue={user?.companyName}
                                    className="input input-bordered focus:border-teal-500 bg-gray-50 font-semibold"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">Admin Email (Static)</label>
                                <input
                                    value={user?.email}
                                    readOnly
                                    className="input input-bordered bg-gray-100 cursor-not-allowed text-gray-500"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label text-xs font-bold uppercase text-gray-400">Subscription Plan</label>
                                <div className="flex items-center gap-2">
                                    <span className="badge badge-lg badge-primary py-4 px-6 font-bold uppercase tracking-wider">
                                        {user?.packageLimit} Members
                                    </span>
                                </div>
                            </div>

                            <div className="md:col-span-2 mt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn btn-block bg-slate-800 hover:bg-slate-900 text-white border-none shadow-lg h-14"
                                >
                                    {loading ? <span className="loading loading-spinner"></span> : "Save Company Profile"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HrProfile;