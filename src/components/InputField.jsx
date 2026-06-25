import React, { useState } from 'react';
import styles from './InputField.module.css';

export const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  required = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  // Label floats if the field is focused OR has content
  const isFloating = focused || (value !== undefined && value !== null && value.toString() !== '');

  return (
    <div className={styles.container}>
      <div className={`${styles.wrapper} ${focused ? styles.focused : ''} ${error ? styles.errorBorder : ''}`}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.input}
          placeholder=" "
          required={required}
          {...props}
        />
        <label className={`${styles.label} ${isFloating ? styles.floating : ''}`}>
          {label}{required && <span className={styles.asterisk}>*</span>}
        </label>
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
