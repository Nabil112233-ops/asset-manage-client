import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const Packages = () => {
    const [packages, setPackages] = useState([])
    useEffect(() => {
        // Fetch from backend
        axios.get("https://asset-manage-server-git-main-junayed-al-nur-nabils-projects.vercel.app/packages")
            .then(res => setPackages(res.data))
    }, []);
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
                Our Packages
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {packages.map((pkg, i) => (
                    <motion.div
                        key={pkg._id}
                        className="bg-teal-800/80 backdrop-blur-md p-6 rounded-2xl text-center hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-teal-300">{pkg.name}</h3>
                        <p className="text-gray-100 text-lg font-bold mb-4">${pkg.price}/month</p>
                        <ul className="text-gray-100 mb-4 space-y-2">
                            {pkg.features.map((f, index) => (
                                <li key={index}>• {f}</li>
                            ))}
                        </ul>
                        <button className="btn bg-teal-600 hover:bg-teal-500 border-none text-white px-6">
                            Choose Plan
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Packages;