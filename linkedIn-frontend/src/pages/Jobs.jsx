import React from "react";
import profileImage from "../assets/profile-picture.png";
import Navbar from "../components/Navbar";
import UserProfile from "../components/dashbooard/UserProfile";
import toast from "react-hot-toast";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    experience: "2-4 Years",
    salary: "₹18-25 LPA",
    type: "Full Time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Microsoft",
    location: "Hyderabad, India",
    experience: "3-5 Years",
    salary: "₹22-30 LPA",
    type: "Full Time",
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "MERN Stack Developer",
    company: "Amazon",
    location: "Remote",
    experience: "1-3 Years",
    salary: "₹15-22 LPA",
    type: "Remote",
    posted: "4 hours ago",
  },
  {
    id: 4,
    title: "React Developer",
    company: "Adobe",
    location: "Noida, India",
    experience: "Freshers",
    salary: "₹8-12 LPA",
    type: "Full Time",
    posted: "Today",
  },
  {
    id: 5,
    title: "Node.js Developer",
    company: "Flipkart",
    location: "Bangalore, India",
    experience: "2+ Years",
    salary: "₹14-20 LPA",
    type: "Hybrid",
    posted: "3 days ago",
  },
];

function Jobs() {
  const handleApply = (title, company) => {
    toast.success(`Applied for ${title} at ${company}!`);
  };

  return (
    <div className="w-full min-h-screen bg-[#f4f2ee]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Profile Sidebar */}
        <div className="w-full lg:w-[225px] flex-shrink-0 lg:sticky lg:top-20">
          <UserProfile />
        </div>

        {/* Middle Column: Jobs List */}
        <div className="flex-1 w-full bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h1 className="text-sm font-semibold text-gray-800 border-b border-gray-100 pb-3 mb-5">
            Recommended Jobs for You
          </h1>

          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex gap-4 items-start min-w-0">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded flex-shrink-0 flex items-center justify-center font-bold text-gray-700 text-sm">
                    {job.company.substring(0, 2).toUpperCase()}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h2 className="text-sm font-semibold text-gray-900 hover:underline hover:text-blue-600 cursor-pointer truncate">
                      {job.title}
                    </h2>
                    <p className="text-xs text-gray-700 font-medium mt-0.5">
                      {job.company}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {job.location}
                    </p>

                    <div className="flex gap-2.5 mt-2.5 flex-wrap items-center">
                      <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold border border-blue-100">
                        {job.experience}
                      </span>
                      <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-100">
                        {job.salary}
                      </span>
                      <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-semibold border border-gray-200">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-[9.5px] text-gray-400 mt-2 font-normal">
                      Posted {job.posted}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleApply(job.title, job.company)}
                  className="w-full sm:w-auto text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs py-1.5 px-4 rounded-full transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
