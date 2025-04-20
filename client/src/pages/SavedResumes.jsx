import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { Button } from "@/components/ui/button";

export default function SavedResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await api.get('/resume/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setResumes(
          res.data.sort(
            (a, b) => new Date(b.lastModified) - new Date(a.lastModified)
          )
        );
      } catch (err) {
        console.error('❌ Failed to fetch saved resumes:', err);
      }
    };
    fetchResumes();
  }, []);


  const handleDelete = async (blobName) => {
    const confirmDelete = window.confirm('⚠️ Are you sure you want to delete this resume?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/resume/history/${encodeURIComponent(blobName)}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setResumes((prev) => prev.filter((r) => r.name !== blobName));
    } catch (err) {
      console.error('❌ Failed to delete:', err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-18">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-[#320C8A] mb-8">Saved Resumes</h1>

        {resumes.length === 0 ? (
          <p className="text-gray-600">No resumes saved yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {resumes.map((r) => (
              <div key={r.name} className="bg-white p-4 shadow rounded border">
                <iframe
                  src={r.previewUrl}
                  title={r.filename}
                  className="w-full h-60 mb-3 border"
                ></iframe>

                {/* ✅ Show resume filename */}
                <p className="font-medium text-sm text-gray-800 truncate mb-1">
                  {r.filename}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  Last modified: {new Date(r.lastModified).toLocaleString()}
                </p>

                <div className="flex gap-2 justify-between">
                  <Button
                    onClick={() => window.open(r.previewUrl, '_blank')}
                    className="bg-blue-500 text-white px-3 py-1 rounded shadow-sm hover:bg-blue-700"
                  >
                    Preview
                  </Button>

                  <Button
                    onClick={() => handleDelete(r.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded shadow-sm hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
