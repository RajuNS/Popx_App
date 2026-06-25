import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/Avatar';
import styles from './Profile.module.css';

export default function Profile() {
  const { user, logout, signup } = useAuth();

  // If user state is temporarily null (safeguard)
  if (!user) return null;

  const handleAvatarChange = (base64Image) => {
    // Update avatar image in stored user data
    const updatedUser = { ...user, avatar: base64Image };
    
    // Save updated user back to local storage (both users list and current user)
    localStorage.setItem('popx_current_user', JSON.stringify(updatedUser));
    
    const usersStr = localStorage.getItem('popx_users') || '[]';
    try {
      const users = JSON.parse(usersStr);
      const updatedUsers = users.map((u) => u.email === user.email ? updatedUser : u);
      localStorage.setItem('popx_users', JSON.stringify(updatedUsers));
    } catch (e) {
      console.error(e);
    }
    
    // Force reload/state change by refreshing window or since we don't have a direct setter
    // for user inside AuthContext besides signup/login, let's update it in place.
    // Wait! Since our context doesn't expose a 'setUser' directly, we can just reload the page
    // or trigger an update. Reloading is simple and resets state from LocalStorage!
    window.location.reload();
  };

  return (
    <div className={`${styles.container} fade-in`}>
      {/* Top AppBar */}
      <header className={styles.appBar}>
        <h1 className={styles.appBarTitle}>Account Settings</h1>
      </header>

      {/* Main content scrollable area */}
      <div className={styles.content}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.cardHeader}>
            <Avatar
              src={user.avatar || '/avatar.png'}
              name={user.fullName}
              size={76}
              isEditable={true}
              onImageChange={handleAvatarChange}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.userName}>{user.fullName}</h2>
              <p className={styles.userEmail}>{user.email}</p>
            </div>
          </div>

          <p className={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the.
          </p>
        </div>

        {/* Action Button - Logout */}
        <div className={styles.actionWrapper}>
          <button onClick={logout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
