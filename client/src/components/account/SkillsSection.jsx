import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

export default function SkillsSection({ formData, setFormData }) {
  const [langInput, setLangInput] = useState('');
  const [toolInput, setToolInput] = useState('');

  const addSkill = (type, value) => {
    if (value.trim() === '') return;
    setFormData({
      ...formData,
      technical_skills: {
        ...formData.technical_skills,
        [type]: [...formData.technical_skills[type], value.trim()],
      },
    });
  };

  const deleteSkill = (type, index) => {
    const updated = [...formData.technical_skills[type]];
    updated.splice(index, 1);
    setFormData({
      ...formData,
      technical_skills: {
        ...formData.technical_skills,
        [type]: updated,
      },
    });
  };

  return (
    <div className="mt-6 space-y-6">
      {/* Programming Languages Section */}
      <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
        <p className="font-semibold text-lg mb-2">Programming Languages</p>
        <div className="flex gap-2 mb-3">
          <input
            value={langInput}
            onChange={(e) => setLangInput(e.target.value)}
            placeholder="e.g., Python"
            className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
          />
          <button
            onClick={() => {
              addSkill('programming_languages', langInput);
              setLangInput('');
            }}
            className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technical_skills.programming_languages.map((lang, idx) => (
            <span
              key={idx}
              className="bg-[#EDE9F8] text-[#320C8A] px-3 py-1 rounded-full flex items-center gap-1"
            >
              {lang}
              <button
                onClick={() => deleteSkill('programming_languages', idx)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Frameworks & Tools Section */}
      <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
        <p className="font-semibold text-lg mb-2">Frameworks & Tools</p>
        <div className="flex gap-2 mb-3">
          <input
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            placeholder="e.g., React, Docker"
            className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
          />
          <button
            onClick={() => {
              addSkill('frameworks_tools', toolInput);
              setToolInput('');
            }}
            className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
          >
            <PlusCircle size={18} />
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technical_skills.frameworks_tools.map((tool, idx) => (
            <span
              key={idx}
              className="bg-[#EDE9F8] text-[#320C8A] px-3 py-1 rounded-full flex items-center gap-1"
            >
              {tool}
              <button
                onClick={() => deleteSkill('frameworks_tools', idx)}
                className="text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
