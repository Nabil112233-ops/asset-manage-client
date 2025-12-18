import React from 'react';
import { motion } from "framer-motion";
import { FaUsers, FaChartLine, FaLaptopCode, FaShieldAlt } from "react-icons/fa";

const About = () => {
    const benefits = [
        {
            icon: <FaUsers className="text-teal-400 text-3xl" />,
            title: "Team Collaboration",
            desc: "Streamline your team communication and asset requests efficiently.",
        },
        {
            icon: <FaChartLine className="text-teal-400 text-3xl" />,
            title: "Analytics & Insights",
            desc: "Get real-time reporting to make informed asset management decisions.",
        },
        {
            icon: <FaLaptopCode className="text-teal-400 text-3xl" />,
            title: "Seamless Integration",
            desc: "Integrates easily with your existing tools and workflows.",
        },
        {
            icon: <FaShieldAlt className="text-teal-400 text-3xl" />,
            title: "Secure & Reliable",
            desc: "Enterprise-grade security to protect your company’s data.",
        },
    ];
    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center mb-12">
                Why Choose <span className="text-teal-300">AssetVerse</span>?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((b, i) => (
                    <motion.div
                        key={i}
                        className="bg-teal-800/80 backdrop-blur-md p-6 rounded-2xl text-center hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <div className="flex justify-center mb-4">{b.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                        <p className="text-gray-100 text-sm">{b.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default About;