import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import { uploadImage } from '../../Hooks/uploadImage';
import useAxiosSecure from '../../Hooks/axiosSecure';

const JoinAsManager = () => {

    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useAuth()

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {
            const imageFile = data.companyLogo[0];
            const logoURL = await uploadImage(imageFile);
            //  Firebase Signup
            await createUser(data.email, data.password);
            await updateUserProfile(data.name, logoURL)
            //  Backend payload
            const payload = {
                name: data.name,
                email: data.email,
                role: "hr",
                companyName: data.companyName,
                companyLogo: logoURL,
                packageLimit: 5,
                currentEmployees: 0,
                subscription: "basic",
                dateOfBirth: data.dateOfBirth,
                createdAt: new Date(),
            };

            //  Save to DB
            await axios.post("https://asset-manage-server-blue.vercel.app/users/hr", payload);

            //  SUCCESS TOAST
            toast.success("HR account created successfully 🎉");

            navigate("/dashboard/hr");

        } catch (error) {
            console.error(error);

            // ERROR TOAST
            toast.error(error.message || "Registration failed");
        }
    };;

    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-950 px-4">
            <div className="max-w-md w-full bg-teal-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">
                {/* Title */}
                <h2 className="text-3xl font-bold text-white mb-2 text-center">Join as HR Manager</h2>
                <p className="text-gray-300 mb-8 text-center text-sm">
                    Register your company and start managing assets efficiently
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Full Name *</label>
                        <input
                            type="text"
                            {...register("name", { required: "Full Name is required" })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Your full name"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Company Name *</label>
                        <input
                            type="text"
                            {...register("companyName", { required: "Company Name is required" })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Company Name"
                        />
                        {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName.message}</p>}
                    </div>

                    {/* Company Logo URL */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Company Logo URL *</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("companyLogo", { required: "Company Logo URL is required" })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.companyLogo && <p className="text-red-400 text-xs mt-1">{errors.companyLogo.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Email *</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                            })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="email@company.com"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-200 text-sm mb-1">Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
                            })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Minimum 6 characters"
                        />
                        {
                            errors.password?.type === 'required' && <p className='text-red-400'>Password is required.</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-400'>Password must be 6 characters.</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-400'>Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.</p>
                        }
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-300"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Date of Birth</label>
                        <input
                            type="date"
                            {...register("dateOfBirth")}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                {/* Link to Join as Employee */}
                <p className="text-gray-300 mt-4 text-center text-sm">
                    Or <Link to="/join_as_employee" className="text-teal-300 hover:underline">Join as Employee</Link>
                </p>
            </div>
        </div>
    );
};

export default JoinAsManager;