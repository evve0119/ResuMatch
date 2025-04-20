import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CreateResume() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBlob, setPdfBlob] = useState(null)
  const [resumeTitle, setResumeTitle] = useState(''); // ✅ Added
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

      const {
        name,
        surname,
        phone,
        email,
        github,
        linkedin,
        city,
        state,
        education,
        experience,
        technicalSkills,
        projects
      } = accountRes.data;

      const resumeJson = {
        personal_information: {
          name,
          surname,
          phone,
          email,
          github,
          linkedin,
          city,
          state
        },
        education_details: education,
        experience_details: experience,
        technical_skills: technicalSkills,
        projects
      };

      // Step 3: Call backend to generate PDF & title
      const response = await api.post(
        '/resume/generate',
        {
          resumeJson,
          jobDescription: jobDescription.trim()
        },
        {
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Response headers:', response.headers);
      // Get title from header if sent, or fallback
      const titleFromHeader = response.headers['x-resume-title'];
      console.log('X-Resume-Title from headers:', titleFromHeader);

      const contentDisposition = response.headers['content-disposition'];
      const match = contentDisposition?.match(/filename="(.+)\.pdf"/);
      const fallbackTitle = match ? match[1] : 'Generated_Resume';
      console.log('Fallback title:', fallbackTitle);

      const title = titleFromHeader || fallbackTitle;
      console.log('Final title used:', title);
      setResumeTitle(title);

      const blob = new Blob([response.data], { type: 'application/pdf' });
      setPdfBlob(blob);
      setPdfUrl(URL.createObjectURL(blob));
      setHasGenerated(true);
    } catch (err) {
      console.error('Error generating resume:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (pdfUrl && resumeTitle) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${resumeTitle}.pdf`;
      link.click();
    }
  };

  const handleSave = async () => {
    if (!pdfUrl || saving || !resumeTitle) return;
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
        {
          buffer: base64String,
          resumeTitle: resumeTitle,
        },
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
        <Button
          onClick={handleGenerate}
          disabled={loading || !isAccountAvailable}
          className={`mt-6 px-6 py-3 rounded-md text-white font-medium shadow transition duration-200 ${
            loading || !isAccountAvailable ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#320C8A] hover:bg-[#5a3ddd]'
          }`}
        >
          {loading 
          ? 'Generating...' 
          : hasGenerated 
          ? 'Regenerate Resume' 
          : 'Generate Resume'}
        </Button>

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

            <p className="text-sm font-medium text-gray-600">
              Filename: <span className="text-gray-800">{resumeTitle}.pdf</span>
            </p>

            <div className="flex gap-4 py-10 justify-between">
              <Button
                onClick={handleDownload}
                className="bg-[#4CAF50] hover:bg-[#3e8e41] text-white px-4 py-2 rounded shadow transition"
              >
                Download
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className={`bg-[#FFA500] hover:bg-[#e69500] text-white px-4 py-2 rounded shadow transition${
                  saving ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
