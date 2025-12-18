import React from 'react';
import { motion } from "framer-motion";
import { FaBuilding, FaUserAlt, FaBoxOpen } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaBuilding className="text-teal-300 text-4xl" />,
            title: "Company Registration",
            desc: "HR Managers register their company, get a default subscription package (5 employees), and manage assets efficiently.",
        },
        {
            icon: <FaUserAlt className="text-teal-300 text-4xl" />,
            title: "Employee Onboarding",
            desc: "Employees register independently, request assets, and get affiliated with companies automatically.",
        },
        {
            icon: <FaBoxOpen className="text-teal-300 text-4xl" />,
            title: "Asset Tracking",
            desc: "Assets are tracked from inventory → assignment → return (optional). Employees can work with multiple companies simultaneously.",
        },
    ];
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
                How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        className="bg-teal-800/80 backdrop-blur-md p-6 rounded-2xl text-center hover:shadow-lg transition"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                    >
                        <div className="flex justify-center mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-100 text-sm">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;