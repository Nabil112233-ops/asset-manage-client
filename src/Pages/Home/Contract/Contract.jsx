import React from 'react';

const Contract = () => {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800 text-white text-center rounded-xl mx-6 md:mx-20 mt-12">
            <h2 className="text-4xl font-bold mb-4">Ready to streamline your asset management?</h2>
            <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Contact us today and see how AssetVerse can improve accountability, efficiency, and visibility in your company.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="btn bg-teal-600 hover:bg-teal-500 border-none text-white px-8">
                    Request a Demo
                </button>
                <button className="btn btn-outline border-teal-400 text-teal-300 hover:bg-teal-800 px-8">
                    Contact Us
                </button>
            </div>
        </section>
    );
};

export default Contract;