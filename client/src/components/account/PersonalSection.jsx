import React, { useEffect, useRef } from 'react';

export default function PersonalSection({ formData, setFormData }) {
  const firstInputRef = useRef(null);
    useEffect(() => {
      firstInputRef.current?.focus();
    }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      personal_information: {
        ...formData.personal_information,
        [e.target.name]: e.target.value,
      },
    });
  };

  const personal = formData.personal_information;

  return (
    <div className="mt-6">
      <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'name',
            'surname',
            'email',
            'phone',
            'city',
            'state',
            'github',
            'linkedin',
          ].map((key, i) => (
            <input
              ref={i === 0 ? firstInputRef : null}
              key={key}
              name={key}
              value={personal[key]}
              onChange={handleChange}
              placeholder={key.charAt(0) + key.slice(1)}
              className="border border-gray-300 px-3 py-2 rounded outline-none"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
