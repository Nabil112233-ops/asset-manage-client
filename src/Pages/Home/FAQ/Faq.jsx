import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Faq = () => {
    const faqs = [
        {
            question: "Can employees belong to multiple companies?",
            answer: "Yes, AssetVerse supports employees working with multiple companies simultaneously.",
        },
        {
            question: "How are assets tracked?",
            answer: "Assets are tracked from inventory → assignment → return (optional). The system maintains proper visibility of all assets.",
        },
        {
            question: "What happens if an asset is lost?",
            answer: "The system improves accountability by tracking asset assignments, reducing the chance of loss.",
        },
        {
            question: "Is there a subscription fee?",
            answer: "Companies get a default subscription package for 5 employees. Additional packages may require payment.",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <section className="py-20 px-6 max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
                Frequently Asked Questions
            </h2>

            <div className="space-y-4">
                {faqs.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-teal-800/70 backdrop-blur-md p-4 rounded-xl cursor-pointer transition hover:shadow-lg"
                        onClick={() => toggleFAQ(i)}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-100">{faq.question}</h3>
                            {openIndex === i ? <FaChevronUp className="text-teal-300" /> : <FaChevronDown className="text-teal-300" />}
                        </div>
                        {openIndex === i && (
                            <p className="mt-2 text-gray-100 text-sm">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Faq;