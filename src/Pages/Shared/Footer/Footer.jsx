import React from 'react';
import { Link } from 'react-router';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaEnvelope,
    FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-teal-900 text-gray-200 mt-16">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold tracking-wide mb-4">
                        <span className="text-teal-300">Asset</span>Verse
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        A professional B2B asset management platform designed for
                        enterprises to manage assets, teams, and workflows efficiently.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link to="/" className="hover:text-teal-300 transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/join-employee" className="hover:text-teal-300 transition">
                                Join as Employee
                            </Link>
                        </li>
                        <li>
                            <Link to="/join-hr" className="hover:text-teal-300 transition">
                                Join as HR Manager
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-teal-300" />
                            support@assetverse.com
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-teal-300" />
                            +880 1XXX-XXXXXX
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex gap-4">
                        <a
                            href="#"
                            className="p-3 rounded-full bg-teal-800 hover:bg-teal-700 transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="p-3 rounded-full bg-teal-800 hover:bg-teal-700 transition"
                        >
                            <FaLinkedinIn />
                        </a>
                        <a
                            href="#"
                            className="p-3 rounded-full bg-teal-800 hover:bg-teal-700 transition"
                        >
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-teal-800">
                <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} AssetVerse. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;