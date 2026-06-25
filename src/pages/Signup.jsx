import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { InputField } from '../components/InputField';
import styles from './Signup.module.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: '',
    isAgency: '', // 'yes' or 'no'
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, isAgency: value }));
    if (errors.isAgency) {
      setErrors((prev) => ({ ...prev, isAgency: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      // Basic phone format validation: digits, optional plus, spacing, 7 to 15 chars
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.isAgency) {
      newErrors.isAgency = 'Please select if you are an agency';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      signup(formData);
      navigate('/profile');
    } catch (err) {
      setGeneralError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Create your<br />PopX account</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputFields}>
          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder="Marry Doe"
            required
          />
          <InputField
            label="Phone number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder="Marry Doe"
            required
          />
          <InputField
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="Marry Doe"
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Marry Doe"
            required
          />
          <InputField
            label="Company name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            error={errors.companyName}
            placeholder="Marry Doe"
          />
        </div>

        {/* Agency question */}
        <div className={styles.agencySection}>
          <p className={styles.agencyQuestion}>
            Are you an Agency?<span className={styles.asterisk}>*</span>
          </p>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === 'yes'}
                onChange={() => handleRadioChange('yes')}
                className={styles.hiddenRadio}
              />
              <span className={`${styles.customRadio} ${formData.isAgency === 'yes' ? styles.checkedRadio : ''}`} />
              <span className={styles.radioText}>Yes</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={formData.isAgency === 'no'}
                onChange={() => handleRadioChange('no')}
                className={styles.hiddenRadio}
              />
              <span className={`${styles.customRadio} ${formData.isAgency === 'no' ? styles.checkedRadio : ''}`} />
              <span className={styles.radioText}>No</span>
            </label>
          </div>
          {errors.isAgency && <span className={styles.errorText}>{errors.isAgency}</span>}
        </div>

        {generalError && (
          <div className={styles.generalError}>
            {generalError}
          </div>
        )}

        <div className={styles.actionWrapper}>
          <button type="submit" className={styles.submitButton}>
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
