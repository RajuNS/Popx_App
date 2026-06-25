import React from 'react';
import styles from './Button.module.css';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'gray'
  disabled = false,
  fullWidth = true,
}) => {
  const buttonClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
