import React, { useState } from 'react';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ExperienceSection({ formData, setFormData }) {
  const [skillInputs, setSkillInputs] = useState({});
  const [respInputs, setRespInputs] = useState({});

  const addExperience = () => {
    setFormData({
      ...formData,
      experience_details: [
        ...formData.experience_details,
        {
          position: '',
          company: '',
          location: '',
          employment_period: '',
          skills_acquired: [],
          key_responsibilities: [],
        },
      ],
    });
  };

  const deleteExperience = (index) => {
    const updated = [...formData.experience_details];
    updated.splice(index, 1);
    setFormData({ ...formData, experience_details: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.experience_details];
    updated[index][field] = value;
    setFormData({ ...formData, experience_details: updated });
  };

  const handleAddArrayItem = (idx, field, value, setter) => {
    if (!value.trim()) return;
    const updated = [...formData.experience_details];
    updated[idx][field].push(value.trim());
    setFormData({ ...formData, experience_details: updated });
    setter((prev) => ({ ...prev, [idx]: '' }));
  };

  const handleDeleteArrayItem = (idx, field, i) => {
    const updated = [...formData.experience_details];
    updated[idx][field].splice(i, 1);
    setFormData({ ...formData, experience_details: updated });
  };

  return (
    <div className="mt-6 space-y-6">
      {formData.experience_details.map((exp, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-md p-4 pb-15 relative bg-white shadow-sm"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['position', 'company', 'location', 'employment_period'].map((key) => (
              <input
                key={key}
                value={exp[key]}
                onChange={(e) => handleChange(idx, key, e.target.value)}
                placeholder={key.replace(/_/g, ' ')}
                className="border border-gray-300 px-3 py-2 rounded outline-none"
              />
            ))}
          </div>

          {/* Skills Acquired */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Skills Acquired</p>
            <div className="flex gap-2 mb-3">
              <input
                value={skillInputs[idx] || ''}
                onChange={(e) =>
                  setSkillInputs({ ...skillInputs, [idx]: e.target.value })
                }
                placeholder="add skill"
                className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
              />
              <Button
                onClick={() =>
                  handleAddArrayItem(idx, 'skills_acquired', skillInputs[idx], setSkillInputs)
                }
                className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
              >
                <PlusCircle size={20} />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {exp.skills_acquired?.map((skill, skillIdx) => (
                <span
                  key={skillIdx}
                  className="bg-[#EDE9F8] text-[#320C8A] px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {skill}
                  <button
                    onClick={() => handleDeleteArrayItem(idx, 'skills_acquired', skillIdx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Key Responsibilities</p>
            <div className="flex gap-2 mb-3">
              <input
                value={respInputs[idx] || ''}
                onChange={(e) =>
                  setRespInputs({ ...respInputs, [idx]: e.target.value })
                }
                placeholder="add responsibility"
                className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
              />
              <Button
                onClick={() =>
                  handleAddArrayItem(idx, 'key_responsibilities', respInputs[idx], setRespInputs)
                }
                className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
              >
                <PlusCircle size={20} />
                Add
              </Button>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {exp.key_responsibilities?.map((resp, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{resp}</span>
                  <button
                    onClick={() => handleDeleteArrayItem(idx, 'key_responsibilities', i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Delete Experience Entry Button */}
          <div className="absolute mt-6 right-6">
            <button
              onClick={() => deleteExperience(idx)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete experience section"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Experience Section */}
      <div className="flex justify-center">
        <Button
          onClick={addExperience}
          className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
        >
          <PlusCircle size={20} />
          Add Experience
        </Button>
      </div>
    </div>
  );
}
