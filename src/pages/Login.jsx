import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import styles from './Login.module.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setGeneralError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  // Determine if both inputs are filled to style the button as active
  const isFormFilled = formData.email.trim() !== '' && formData.password.trim() !== '';

  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Signin to your<br />PopX account</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet,<br />consectetur adipiscing elit,
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter email address"
          required
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter password"
          required
        />

        {generalError && (
          <div className={styles.generalError}>
            {generalError}
          </div>
        )}

        <div className={styles.actionWrapper}>
          <button
            type="submit"
            className={`${styles.loginButton} ${isFormFilled ? styles.active : ''}`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
