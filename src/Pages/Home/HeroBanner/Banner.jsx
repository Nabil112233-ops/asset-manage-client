import React from 'react';
import { motion } from "framer-motion";

const Banner = () => {
    return (
        <section className="bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                        Enterprise Asset Management,
                        <span className="block text-teal-300 mt-2">
                            Simplified & Scalable
                        </span>
                    </h1>

                    <p className="mt-6 text-gray-300 max-w-xl text-lg leading-relaxed">
                        AssetVerse helps organizations manage assets, employees, and
                        workflows efficiently — built for growing enterprises and modern
                        corporate teams.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="btn bg-teal-600 hover:bg-teal-500 border-none text-white px-8">
                            Get Started
                        </button>
                        <button className="btn btn-outline border-teal-400 text-teal-300 hover:bg-teal-800 px-8">
                            Request a Demo
                        </button>
                    </div>
                </motion.div>

                {/* RIGHT VISUAL */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Decorative Blur */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-500/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-56 h-56 bg-teal-400/20 rounded-full blur-3xl"></div>

                    {/* Corporate Image Card */}
                    <div className="relative bg-teal-900/60 backdrop-blur-xl border border-teal-700 rounded-2xl shadow-2xl p-6">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                            alt="Corporate Team"
                            className="rounded-xl object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;