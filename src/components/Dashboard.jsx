import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/employer/jobs/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete job
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await axios.delete(`http://localhost:8000/employer/jobs/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      fetchJobs(); // Refresh list
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Job Posts</h1>
        <button
          onClick={() => navigate("/jobs/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="border rounded-lg shadow-lg p-4 bg-white max-h-96 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-3">Your Job Posts</h2>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border p-3 rounded-md shadow-sm bg-gray-50">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-900">{job.company_name}</p>

                <p className="text-gray-600 line-clamp-2">{job.description}</p>

                <p className="text-green-700 font-bold">${job.salary}</p>

                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => navigate(`/jobs/${job.id}/edit`)}
                    className="bg-purple-500 text-white px-3 py-1 rounded">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
