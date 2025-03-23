import React from 'react';

export default function NumberInput({ label, value, isActive, onChange, onHover }) {
  return (
    <div className="num-files">
      <label className="form-label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        onMouseEnter={onHover}
        className={isActive ? 'active-input' : 'inactive-input'}
      />
    </div>
  );
}
