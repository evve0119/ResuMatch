import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function CreateResume() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); // ✅ Added this
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isAccountAvailable, setIsAccountAvailable] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await api.get('/account', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.status === 200 && res.data) {
          setIsAccountAvailable(true);
        }
      } catch (err) {
        console.warn('No existing account found');
        setIsAccountAvailable(false);
      }
    };
    fetchAccount();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setHasGenerated(false);
    try {
      const accountRes = await api.get('/account', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const resumeRes = await api.post(
        '/resume/generate',
        {
          ...accountRes.data,
          jobDescription: jobDescription.trim(),
        },
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const blob = new Blob([resumeRes.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setPdfBlob(blob);
      setPdfUrl(url);
      setHasGenerated(true);
    } catch (err) {
      console.error('Error generating resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'resume.pdf';
      link.click();
    }
  };

  const handleSave = async () => {
    if (!pdfUrl || saving) return;
    setSaving(true);

    try {
      const blob = await fetch(pdfUrl).then((res) => res.blob());

      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      const response = await api.post(
        '/resume/save',
        { buffer: base64String },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        alert('✅ Resume saved to Azure successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('❌ Error saving resume:', error);
      alert('❌ Failed to save resume. Check console for details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#320C8A] mb-6">Generate Resume</h1>

        {/* Job Description Input */}
        <div className="mt-6">
          <label htmlFor="jobDescription" className="block text-left text-lg font-medium text-gray-700 mb-2">
            Job Description (optional)
          </label>
          <textarea
            id="jobDescription"
            rows={5}
            className="w-full border border-gray-300 rounded-md p-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6B4EFF]"
            placeholder="Paste the job description here to tailor your resume..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !isAccountAvailable}
          className={`mt-6 px-6 py-3 rounded-md text-white font-medium shadow transition duration-200 ${
            loading || !isAccountAvailable ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6B4EFF] hover:bg-[#5a3ddd]'
          }`}
        >
          {loading ? 'Generating...' : hasGenerated ? 'Regenerate Resume' : 'Generate Resume'}
        </button>

        {loading && (
          <div className="mt-8">
            <p className="mt-2 text-gray-600">Generating your resume. Please wait...</p>
          </div>
        )}

        {pdfUrl && (
          <div className="mt-10 space-y-4">
            <iframe
              src={pdfUrl}
              title="Resume Preview"
              className="w-full h-[700px] border rounded shadow"
              onError={() => alert('⚠️ Failed to preview PDF. Try downloading instead.')}
            ></iframe>

            <div className="flex gap-4 py-10 justify-between">
              <button
                onClick={handleDownload}
                className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white px-4 py-2 rounded"
              >
                Download
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`bg-[#FFA500] hover:bg-[#e69500] text-white px-4 py-2 rounded ${
                  saving ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
