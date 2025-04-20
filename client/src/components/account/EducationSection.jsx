import React, { useState, useEffect, useRef } from 'react';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function EducationSection({ formData, setFormData }) {
  const firstInputRef = useRef(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const [courseInputs, setCourseInputs] = useState({});

  const addEducation = () => {
    setFormData({
      ...formData,
      education_details: [
        ...formData.education_details,
        {
          education_level: '',
          institution: '',
          location: '',
          start_date: '',
          year_of_completion: '',
          final_evaluation_grade: '',
          coursework: [],
        },
      ],
    });
  };

  const deleteEducation = (index) => {
    const updated = [...formData.education_details];
    updated.splice(index, 1);
    setFormData({ ...formData, education_details: updated });
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.education_details];
    updated[index][field] = value;
    setFormData({ ...formData, education_details: updated });
  };

  const handleAddCourse = (idx) => {
    const newCourse = courseInputs[idx]?.trim();
    if (!newCourse) return;

    const updated = [...formData.education_details];
    updated[idx].coursework.push(newCourse);

    setFormData({ ...formData, education_details: updated });
    setCourseInputs({ ...courseInputs, [idx]: '' });
  };

  const handleDeleteCourse = (eduIdx, courseIdx) => {
    const updated = [...formData.education_details];
    updated[eduIdx].coursework.splice(courseIdx, 1);
    setFormData({ ...formData, education_details: updated });
  };

  return (
    <div className="mt-6 space-y-6">
      {formData.education_details.map((edu, idx) => (
        <div
          key={idx}
          className="border border-gray-300 rounded-md p-4 pb-15 relative bg-white shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'education_level',
              'institution',
              'location',
              'start_date',
              'year_of_completion',
              'final_evaluation_grade',
            ].map((key, i) => (
              <input
                ref={i === 0 ? firstInputRef : null}
                key={key}
                value={edu[key]}
                onChange={(e) => handleChange(idx, key, e.target.value)}
                placeholder={key.replace(/_/g, ' ')}
                className="border border-gray-300 px-3 py-2 rounded outline-none"
              />
            ))}
          </div>

          {/* Coursework Section */}
          <div className="mt-4">
            <p className="font-semibold mb-2">Coursework</p>
            <div className="flex gap-2 mb-3">
              <input
                value={courseInputs[idx] || ''}
                onChange={(e) =>
                  setCourseInputs({ ...courseInputs, [idx]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCourse(idx); // trigger the ADD button
                  }
                }}
                placeholder="add course name"
                className="border border-gray-300 px-3 py-2 rounded outline-none w-full"
              />
              <Button
                onClick={() => handleAddCourse(idx)}
                className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
              >
                <PlusCircle size={20} />
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {edu.coursework.map((course, courseIdx) => (
                <span
                  key={courseIdx}
                  className="bg-[#EDE9F8] text-[#320C8A] px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {course}
                  <button
                    onClick={() => handleDeleteCourse(idx, courseIdx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Delete Education Entry Button */}
          <div className="absolute mt-6 right-6">
            <button
              onClick={() => deleteEducation(idx)}
              className="text-red-500 hover:text-red-700"
              aria-label="Delete education section"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      {/* Add New Education Section */}
      <div className="flex justify-center">
        <Button
          onClick={addEducation}
          className="flex items-center gap-2 bg-[#BFAEE7] hover:bg-[#A88FDB] text-white px-4 py-2 rounded-full shadow transition"
        >
          <PlusCircle size={20} />
          Add Education
        </Button>
      </div>
    </div>
  );
}
