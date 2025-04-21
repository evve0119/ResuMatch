import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';
import PersonalSection from '../components/account/PersonalSection';
import EducationSection from '../components/account/EducationSection';
import ExperienceSection from '../components/account/ExperienceSection';
import SkillsSection from '../components/account/SkillsSection';
import ProjectsSection from '../components/account/ProjectsSection';
import api from '../api';
import { Button } from "@/components/ui/button";

const sectionList = [
  'Personal Information',
  'Education',
  'Skills',
  'Experience',
  'Projects',
];

export default function Account() {
  const [formData, setFormData] = useState({
    personal_information: {
      name: '', surname: '', phone_prefix: '', phone: '',
      email: '', github: '', linkedin: '', city: '', state: ''
    },
    education_details: [{
      education_level: '', institution: '', location: '',
      start_date: '', year_of_completion: '', final_evaluation_grade: '',
      coursework: []
    }],
    technical_skills: {
      programming_languages: [],
      frameworks_tools: []
    },
    experience_details: [{
      position: '', company: '', location: '', employment_period: '',
      key_responsibilities: [],
      skills_acquired: [],
    }],
    projects: [{ name: '', tech: '', description: [] }]
  });

  const [currentSection, setCurrentSection] = useState(0);
  const [hasAccount, setHasAccount] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // 1. Fetch account data
    const fetchAccount = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/account", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = res.data;
        if (!data) throw new Error("No account data found");
  
        setFormData({
          personal_information: {
            name: data.name || '',
            surname: data.surname || '',
            phone_prefix: data.phonePrefix || '',
            phone: data.phone || '',
            email: data.email || '',
            github: data.github || '',
            linkedin: data.linkedin || '',
            city: data.city || '',
            state: data.state || ''
          },
          education_details: data.education || [],
          experience_details: data.experience || [],
          technical_skills: data.technicalSkills || {
            programming_languages: [],
            frameworks_tools: []
          },
          projects: data.projects || []
        });
  
        setHasAccount(true);
      } catch (err) {
        console.warn("No existing account found or error fetching it.", err);
        setHasAccount(false);
      }
    };
  
    fetchAccount();
  
    // 2. Handle Enter to focus next input
    const handleEnterKey = (e) => {
      const tag = e.target.tagName.toLowerCase();
      const isInput = tag === "input" || tag === "select";
      const isTextarea = tag === "textarea";
  
      if (!isInput || isTextarea) return;
  
      if (e.key === "Enter") {
        e.preventDefault();
  
        const inputs = Array.from(
          e.target
            .closest("form, .grid, .section-block, .form-area") // fallback selectors
            ?.querySelectorAll(
              'input:not([type=hidden]):not([disabled]):not([readonly]), select, textarea'
            ) || []
        ).filter((el) => el.offsetParent !== null);
  
        const index = inputs.indexOf(e.target);
        if (index > -1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    };
  
    // 3. Warn user before leaving page with unsaved changes
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
  
    window.addEventListener("keydown", handleEnterKey);
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <PersonalSection formData={formData} setFormData={setFormData} />;
      case 1: return <EducationSection formData={formData} setFormData={setFormData} />;
      case 2: return <SkillsSection formData={formData} setFormData={setFormData} />;
      case 3: return <ExperienceSection formData={formData} setFormData={setFormData} />;
      case 4: return <ProjectsSection formData={formData} setFormData={setFormData} />;
      default: return null;
    }
  };

  const handleSave = async () => {

    setSaving(true);

    const payload = {
      personal_information: formData.personal_information,
      education_details: formData.education_details,
      experience_details: formData.experience_details,
      technical_skills: formData.technical_skills,
      projects: formData.projects
    };

    try {
      const token = localStorage.getItem('token');
      if (hasAccount) {
        await api.put('/account', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Account updated successfully.');
      } else {
        await api.post('/account', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Account created successfully.');
        setHasAccount(true);
      }
      navigate('/'); // Redirect to home page
    } catch (err) {
      alert('❌ Failed to save account. See console for details.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-trebuchet">
      <Navbar />
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[240px] bg-[#F5F3FA] border-r min-h-screen p-4 fixed z-0">
          <h2 className="text-lg font-bold text-[#320C8A] mb-4 pt-18">Sections</h2>
          <ul className="space-y-2">
            {sectionList.map((section, idx) => (
              <li
                key={idx}
                onClick={() => setCurrentSection(idx)}
                className={`cursor-pointer px-2 py-1 rounded-md hover:bg-[#E1D8F1] ${currentSection === idx ? 'bg-[#D2C2F1] font-semibold' : ''}`}
              >
                {section}
              </li>
            ))}
          </ul>
        </div>

        {/* Form Content */}
        <div className="account-scroll ml-[240px] w-[calc(100%-240px)] pl-[1.5rem] pr-[0.55rem] pt-24">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[#320C8A] mb-2">{sectionList[currentSection]}</h1>
            {renderSection()}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-[240px] w-[calc(100%-240px)] px-6 py-4 flex items-center justify-between z-10 bg-transparent backdrop-blur-sm shadow border-t border-gray-200">

            {/* Left: Previous */}
            {currentSection !== 0 ? (
              <Button
                onClick={() => setCurrentSection(currentSection - 1)}
                className="bg-[#320C8A] hover:bg-[#BCB4CE] text-white w-20 py-2 rounded shadow transition"
              >
                Previous
              </Button>
            ) : (
              <div className="w-[100px]" />
            )}

            {/* Centre: Save */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Button
                onClick={async () => {
                  setSaving(true);
                  const payload = {
                    personal_information: formData.personal_information,
                    education_details: formData.education_details,
                    experience_details: formData.experience_details,
                    technical_skills: formData.technical_skills,
                    projects: formData.projects
                  };
                  try {
                    const token = localStorage.getItem('token');
                    if (hasAccount) {
                      await api.put('/account', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                    } else {
                      await api.post('/account', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setHasAccount(true);
                    }
                    alert('Saved!');
                  } catch (err) {
                    alert('❌ Failed to save.');
                    console.error(err);
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className={`bg-[#1E4EAD] hover:bg-[#B0BBCC] text-white w-20 py-2 rounded shadow transition ${
                  saving ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </div>

            {/* Right: Next or Complete */}
            {currentSection === sectionList.length - 1 ? (
              <Button
                onClick={async () => {
                  setSaving(true);
                  const payload = {
                    personal_information: formData.personal_information,
                    education_details: formData.education_details,
                    experience_details: formData.experience_details,
                    technical_skills: formData.technical_skills,
                    projects: formData.projects
                  };
                  try {
                    const token = localStorage.getItem('token');
                    if (hasAccount) {
                      await api.put('/account', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                    } else {
                      await api.post('/account', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setHasAccount(true);
                    }
                    alert('Completed and returning home!');
                    navigate('/');
                  } catch (err) {
                    alert('❌ Failed to complete.');
                    console.error(err);
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className={`bg-[#1E4EAD] hover:bg-[#B0BBCC] text-white w-20 py-2 rounded shadow transition ${
                  saving ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                Complete
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentSection(currentSection + 1)}
                className="bg-[#320C8A] hover:bg-[#BCB4CE] text-white w-20 py-2 rounded shadow transition"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
