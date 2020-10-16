import React, { useState } from 'react';

const Input = ({ className, style, placeholder, initialValue, onSave }) => {
  const [text, setText] = useState(initialValue ?? '');

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value);
    onSave(value);
  };

  return (
    <input
      className={className}
      style={style}
      type="text"
      placeholder={placeholder}
      value={text}
      onChange={handleChange}
    />
  );
};

export default Input;
