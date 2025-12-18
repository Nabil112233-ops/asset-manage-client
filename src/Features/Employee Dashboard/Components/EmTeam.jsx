import React from 'react';

const EmTeam = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">My Team</h2>

            <select className="select select-bordered mb-6">
                <option>Select Company</option>
                <option>ABC Ltd</option>
                <option>XYZ Corp</option>
            </select>

            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow text-center">
                        <img
                            src="https://i.pravatar.cc/100"
                            className="w-16 h-16 rounded-full mx-auto mb-3"
                        />
                        <h3 className="font-semibold">John Doe</h3>
                        <p className="text-sm text-gray-500">john@mail.com</p>
                        <p className="text-xs text-gray-400 mt-2">Developer</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-2">🎂 Upcoming Birthdays</h3>
                <p className="text-sm text-gray-500">Jane Smith — 24 Feb</p>
            </div>
        </div>
    );
};

export default EmTeam;