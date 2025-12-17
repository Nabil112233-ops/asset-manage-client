import React from 'react';
import { FaCogs, FaTasks, FaMobileAlt, FaDatabase, FaSyncAlt, FaCloud } from "react-icons/fa";
import { motion } from "framer-motion";

const Features = () => {
    const features = [
        { icon: <FaCogs />, title: "Automated Workflows", desc: "Reduce manual tasks and boost productivity." },
        { icon: <FaTasks />, title: "Task Management", desc: "Assign and track assets easily across teams." },
        { icon: <FaMobileAlt />, title: "Mobile Access", desc: "Manage assets anytime, anywhere with mobile support." },
        { icon: <FaDatabase />, title: "Centralized Database", desc: "All asset information in one secure location." },
        { icon: <FaSyncAlt />, title: "Real-time Updates", desc: "Stay informed with instant notifications and status updates." },
        { icon: <FaCloud />, title: "Cloud Backup", desc: "Reliable cloud backup to ensure data safety." },
    ];
    return (
        <section className="bg-teal-950 text-white py-20 px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="bg-teal-800/70 backdrop-blur-md p-6 rounded-2xl text-center hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <div className="flex justify-center mb-4 text-teal-400 text-3xl">{f.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-gray-100 text-sm">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Features;