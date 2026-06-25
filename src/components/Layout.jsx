import React from 'react';
import styles from './Layout.module.css';

export const Layout = ({ children }) => {
  return (
    <div className={styles.desktopContainer}>
      <div className={styles.phoneFrame}>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};
