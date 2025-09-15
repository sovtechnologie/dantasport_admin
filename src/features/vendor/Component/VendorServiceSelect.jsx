// VendorServiceSelect.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { key: 'sports', label: 'Sport Section', path: '/vendor/manage/sports' },
  { key: 'event', label: 'Event Section', path: '/vendor/manage/event' },
  { key: 'gym', label: 'Gym', path: '/vendor/manage/gym' },
  { key: 'coach', label: 'Coach', path: '/vendor/manage/coach' },
  // Add more if your project supports others
];

const VendorServiceSelect = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select a Service to Manage</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {SERVICES.map(s => (
          <button key={s.key} onClick={() => navigate(s.path)}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VendorServiceSelect;
