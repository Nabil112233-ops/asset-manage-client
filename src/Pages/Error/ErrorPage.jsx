import React from 'react';
import { Link, useRouteError } from 'react-router';
import { motion } from 'framer-motion';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {/* animated 404 text */}
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-9xl font-black text-teal-600/20 absolute inset-0 flex items-center justify-center -z-10 select-none"
                >
                    404
                </motion.h1>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <p className="text-base font-semibold text-teal-600 uppercase tracking-wide">Error {error?.status || "404"}</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        {error?.statusText || "Page not found"}
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600 max-w-lg mx-auto">
                        Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you might have typed the address incorrectly.
                    </p>
                </motion.div>

                <motion.div 
                    className="mt-10 flex items-center justify-center gap-x-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link
                        to="/"
                        className="rounded-full bg-teal-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg hover:bg-teal-500 hover:shadow-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 transition-all active:scale-95"
                    >
                        Go back home
                    </Link>
                    <Link to="/contact" className="text-sm font-semibold text-gray-900 hover:text-teal-600 transition-colors">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </motion.div>

                {/* Decorative Elements */}
                <div className="mt-16 flex justify-center gap-4 opacity-20">
                    <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 rounded-full bg-teal-600 animate-bounce [animation-delay:-.5s]"></div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;