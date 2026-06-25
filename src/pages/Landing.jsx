import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './Landing.module.css';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className={`${styles.container} fade-in`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to PopX</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
        
        <div className={styles.buttonGroup}>
          <Button
            variant="primary"
            onClick={() => navigate('/signup')}
          >
            Create Account
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  );
}
