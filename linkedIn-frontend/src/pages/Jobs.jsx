import React from "react";
import profileImage from "../assets/profile-picture.png";
import Navbar from "../components/Navbar";

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
  return (
    <div>
        <Navbar/>
        <div className="w-full max-w-4xl mx-auto">
    
      <div className="bg-white rounded-xl shadow-md p-5">
        <h1 className="text-2xl font-bold mb-6">Recommended Jobs</h1>

        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-xl p-5 hover:shadow-lg transition"
            >
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img
                    src={profileImage}
                    alt="company"
                    className="h-14 w-14 rounded-lg"
                  />

                  <div>
                    <h2 className="text-lg font-semibold">{job.title}</h2>

                    <p className="text-gray-700">{job.company}</p>

                    <p className="text-sm text-gray-500">{job.location}</p>

                    <div className="flex gap-3 mt-3 flex-wrap">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        {job.experience}
                      </span>

                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        {job.salary}
                      </span>

                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                      Posted {job.posted}
                    </p>
                  </div>
                </div>

                <button className="h-fit bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Jobs;
