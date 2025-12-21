import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {

    const { logInUser } = useAuth()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setAuthError("");

        try {
            // Firebase login
            const result = await logInUser(data.email, data.password);
            const email = result.user.email;

            // Get JWT
            const jwtRes = await axios.post("https://asset-manage-server-git-main-junayed-al-nur-nabils-projects.vercel.app/jwt", { email });
            localStorage.setItem("access-token", jwtRes.data.token);

            // Get user role
            const roleRes = await axios.get(
                `https://asset-manage-server-git-main-junayed-al-nur-nabils-projects.vercel.app/users/role/${email}`,
                {
                    headers: {
                        authorization: `Bearer ${jwtRes.data.token}`,
                    },
                }
            );

            toast.success("Login successful 🚀");

            // Role based redirect
            if (roleRes.data.role === "hr") {
                navigate("/dashboard/hr");
            } else {
                navigate("/dashboard/employee");
            }

        } catch (error) {
            console.error(error);
            toast.error("Invalid email or password");
            setAuthError("Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-950 via-slate-900 to-black flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back to <span className="text-teal-400">AssetVerse</span>
                    </h1>
                    <p className="text-gray-300 text-sm mt-2">
                        Securely manage your company assets
                    </p>
                </div>

                {/* Error */}
                {authError && (
                    <p className="bg-red-500/20 border border-red-400 text-red-300 text-sm p-3 rounded-lg mb-4">
                        {authError}
                    </p>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type="email"
                                placeholder="you@company.com"
                                {...register("email", { required: "Email is required" })}
                                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-300 text-sm mb-1 block">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters",
                                    },
                                })}
                                className="w-full pl-11 pr-11 py-3 rounded-xl bg-black/40 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold shadow-lg transition disabled:opacity-60"
                    >
                        {isSubmitting ? "Signing In..." : "Sign In"}
                    </motion.button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-gray-300">
                    <p>
                        New to AssetVerse?{" "}
                        <Link
                            to="/join_as_manager"
                            className="text-teal-400 hover:underline"
                        >
                            Join as HR
                        </Link>{" "}
                        or{" "}
                        <Link
                            to="/join_as_employee"
                            className="text-teal-400 hover:underline"
                        >
                            Employee
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;