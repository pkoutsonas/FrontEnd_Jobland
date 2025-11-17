import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobEdit = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/employer/jobs/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setJob(res.data);
      } catch (err) {
        console.error("Failed to fetch job", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Job: {job.title}</h1>
      {/* Εδώ μπορείς να βάλεις φόρμα για επεξεργασία */}
    </div>
  );
};

export default JobEdit;
