import React, { useState, useEffect, useRef } from 'react';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function ProjectsSection({ formData, setFormData }) {
  const firstInputRef = useRef(null);
      useEffect(() => {
        firstInputRef.current?.focus();
      }, []);
  
  const [descInputs, setDescInputs] = useState({});

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { name: '', tech: '', description: [] }],
    });
  };

  const deleteProject = (index) => {
    const updated = [...formData.projects];
    updated.splice(index, 1);
    setFormData({ ...formData, projects: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const handleAddDescription = (index, value) => {
    if (!value.trim()) return;
    const updated = [...formData.projects];
    updated[index].description.push(value.trim());
    setFormData({ ...formData, projects: updated });
    setDescInputs((prev) => ({ ...prev, [index]: '' }));
  };

  const handleDeleteDescription = (projIdx, descIdx) => {
    const updated = [...formData.projects];
    updated[projIdx].description.splice(descIdx, 1);
    setFormData({ ...formData, projects: updated });
  };

  return (
    <div className="mt-6 space-y-6">
      {formData.projects.map((proj, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-md p-4 pb-15 relative bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              ref={firstInputRef}
              value={proj.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
              placeholder="project name"
              className="border border-gray-300 px-3 py-2 rounded outline-none"
            />
            <input
              value={proj.tech}
              onChange={(e) => handleChange(idx, 'tech', e.target.value)}
              placeholder="tech stack"
              className="border border-gray-300 px-3 py-2 rounded outline-none"
            />
          </div>

          {/* Description bullets */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Project Descriptions</p>
            <div className="flex gap-2 mb-3">
              <input
                value={descInputs[idx] || ''}
                onChange={(e) =>
                  setDescInputs({ ...descInputs, [idx]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddDescription(idx, descInputs[idx]);
                  }
                }}
                placeholder="add description"
                className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
              />
              <Button
                onClick={() => handleAddDescription(idx, descInputs[idx])}
                className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
              >
                <PlusCircle size={20} />
                Add
              </Button>
            </div>

            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {proj.description.map((desc, dIdx) => (
                <li key={dIdx} className="flex justify-between items-center">
                  <span>{desc}</span>
                  <button
                    onClick={() => handleDeleteDescription(idx, dIdx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Delete Project Section */}
          <div className="absolute mt-6 right-6">
            <button
              onClick={() => deleteProject(idx)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete project section"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Add Project Button */}
      <div className="flex justify-center">
        <Button
          onClick={addProject}
          className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
        >
          <PlusCircle size={20} />
          Add Project
        </Button>
      </div>
    </div>
  );
}
