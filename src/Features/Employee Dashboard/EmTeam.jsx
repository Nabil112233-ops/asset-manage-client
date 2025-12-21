import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/axiosSecure';

const EmTeam = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: teamData = {}, isLoading } = useQuery({
        queryKey: ['my-team', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-team/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="p-10 text-center"><span className="loading loading-spinner"></span></div>;

    if (teamData.noCompany) {
        return (
            <div className="text-center p-20 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold text-gray-400">You are not affiliated with any company yet.</h2>
                <p className="text-gray-500">Please contact your HR manager to add you to the team.</p>
            </div>
        );
    }

    const { teamMembers, companyName } = teamData;

    const currentMonth = new Date().getMonth();
    const birthdayMembers = teamMembers.filter(member => {
        if (!member.dob) return false;
        return new Date(member.dob).getMonth() === currentMonth;
    });

    return (
        <div className="p-4 md:p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">My Team: <span className="text-teal-600">{companyName}</span></h2>
                <div className="badge badge-outline p-4 font-semibold">Total Members: {teamMembers.length}</div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                    <div key={member._id} className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all text-center">
                        <div className="avatar mb-3">
                            <div className="w-20 h-20 rounded-full ring ring-teal-500 ring-offset-base-100 ring-offset-2 mx-auto">
                                <img src={member.photo || "https://i.pravatar.cc/100"} alt={member.name} />
                            </div>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                        <div className="mt-3 capitalize">
                            <span className="badge badge-ghost badge-sm font-semibold">{member.role}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upcoming Birthdays Section */}
            <div className="mt-10 bg-gradient-to-r from-teal-50 to-white p-6 rounded-2xl border border-teal-100 shadow-sm">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    🎂 Upcoming Birthdays (This Month)
                </h3>
                {birthdayMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {birthdayMembers.map(member => (
                            <div key={member._id} className="flex items-center gap-3 bg-white p-3 rounded-xl border">
                                <img src={member.photo} className="w-10 h-10 rounded-full" alt="" />
                                <div>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(member.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 italic">No birthdays found this month.</p>
                )}
            </div>
        </div>
    );
};

export default EmTeam;