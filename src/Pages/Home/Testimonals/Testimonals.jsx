import React from 'react';
import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaStar } from "react-icons/fa";

const Testimonals = () => {
    const testimonials = [
        {
            name: "Jane Doe, CTO",
            company: "TechCorp",
            feedback: "AssetVerse transformed our asset management, saving hours every week!",
        },
        {
            name: "John Smith, HR Manager",
            company: "BizSolutions",
            feedback: "Managing requests and approvals has never been easier.",
        },
        {
            name: "Mary Johnson, Operations Lead",
            company: "Global Enterprises",
            feedback: "Professional, reliable, and very easy to use platform.",
        },
    ];

    const stats = [
        { icon: <FaBuilding />, value: "100+", label: "Companies Trust Us" },
        { icon: <FaUsers />, value: "5000+", label: "Active Users" },
        { icon: <FaStar />, value: "4.9/5", label: "Customer Satisfaction" },
    ];
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        className="bg-teal-800/70 backdrop-blur-md p-6 rounded-2xl shadow hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <p className="text-gray-100 mb-4">"{t.feedback}"</p>
                        <h4 className="font-semibold">{t.name}</h4>
                        <span className="text-teal-300 text-sm">{t.company}</span>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        className="bg-teal-800/70 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <div className="text-teal-400 text-4xl mb-2">{s.icon}</div>
                        <h3 className="text-2xl font-bold">{s.value}</h3>
                        <p className="text-gray-100">{s.label}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonals;