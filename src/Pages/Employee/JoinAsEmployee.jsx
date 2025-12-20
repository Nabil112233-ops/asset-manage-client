import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { uploadImage } from '../../Hooks/uploadImage';

const JoinAsEmployee = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        try {

            const imageFile = data.profileImage[0];
            toast.loading("Uploading profile image...");
            const photoURL = await uploadImage(imageFile);
            toast.dismiss();

            await createUser(data.email, data.password);
            await updateUserProfile(data.name, photoURL)
            const payload = {
                name: data.name,
                email: data.email,
                role: "employee",
                photo: photoURL,
                dateOfBirth: data.dateOfBirth,
                createdAt: new Date(),
            };

            await axios.post("http://localhost:5000/users/employee", payload);

            toast.success("Employee account created successfully 🎉");

            navigate("/dashboard/employee");
        } catch (error) {
            toast.error(error.message || "Registration failed");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-teal-950 px-4">
            <div className="max-w-md w-full bg-teal-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg">

                {/* Title */}
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                    Join as Employee
                </h2>
                <p className="text-gray-300 mb-8 text-center text-sm">
                    Create your employee account and request assets from companies
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
                        {errors.name && (
                            <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                        )}
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
                            placeholder="personal@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Profile Image *</label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("profileImage", { required: "Profile Image is required" })}
                            className="file-input file-input-bordered file-input-accent w-full bg-teal-800 text-white"
                        />
                        {errors.profileImage && <p className="text-red-400 text-xs mt-1">{errors.profileImage.message}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-gray-200 text-sm mb-1">Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                            placeholder="Minimum 6 characters"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-10 text-gray-300"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-gray-200 text-sm mb-1">Date of Birth *</label>
                        <input
                            type="date"
                            {...register("dateOfBirth", { required: "Date of Birth is required" })}
                            className="w-full p-3 rounded-lg bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        {errors.dateOfBirth && (
                            <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition"
                    >
                        Register
                    </button>
                </form>

                {/* Join as Manager */}
                <p className="text-gray-300 mt-4 text-center text-sm">
                    Are you an HR Manager?{" "}
                    <Link to="/join_as_manager" className="text-teal-300 hover:underline">
                        Join as Manager
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default JoinAsEmployee;