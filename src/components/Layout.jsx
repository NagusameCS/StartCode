// Main Layout Component with Navigation
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
    FiHome,
    FiBook,
    FiUsers,
    FiUser,
    FiDownload,
    FiSettings,
    FiLogOut,
    FiMenu,
    FiX,
    FiChevronDown,
    FiAward
} from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useTeacherStore } from '../store/teacherStore';
import Logo from './Logo';
import WaveBackground from './WaveBackground';
import styles from './Layout.module.css';

const Layout = () => {
    const { user, userProfile, signOut } = useAuthStore();
    const { isTeacherMode } = useTeacherStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const navItems = [
        { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
        { to: '/courses', icon: FiBook, label: 'Courses' },
        { to: '/users', icon: FiUsers, label: 'Users' },
        ...(isTeacherMode ? [{ to: '/teacher', icon: FiAward, label: 'Classes' }] : []),
        { to: '/download', icon: FiDownload, label: 'Download' },
    ];

    return (
        <div className={styles.layout}>
            {/* Wave Background */}
            <WaveBackground height="30vh" />

            {/* Sidebar - Desktop */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <NavLink to="/dashboard" className={styles.logoLink}>
                        <Logo size={36} />
                        <span className={styles.logoText}>StartCode</span>
                    </NavLink>
                </div>

                <nav className={styles.nav}>
                    {navItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                            }
                        >
                            <item.icon className={styles.navIcon} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.profileSection}>
                        <button
                            className={styles.profileButton}
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        >
                            {userProfile?.photoURL ? (
                                <img
                                    src={userProfile.photoURL}
                                    alt="Profile"
                                    className={styles.avatar}
                                />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {userProfile?.displayName?.[0] || user?.email?.[0] || '?'}
                                </div>
                            )}
                            <div className={styles.profileInfo}>
                                <span className={styles.profileName}>
                                    {userProfile?.displayName || 'User'}
                                </span>
                                <span className={styles.profileEmail}>
                                    {userProfile?.username || user?.email}
                                </span>
                            </div>
                            <FiChevronDown className={styles.chevron} />
                        </button>

                        <AnimatePresence>
                            {profileDropdownOpen && (
                                <motion.div
                                    className={styles.dropdown}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <NavLink
                                        to="/profile"
                                        className={styles.dropdownItem}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <FiUser />
                                        <span>Profile</span>
                                    </NavLink>
                                    <NavLink
                                        to="/settings"
                                        className={styles.dropdownItem}
                                        onClick={() => setProfileDropdownOpen(false)}
                                    >
                                        <FiSettings />
                                        <span>Settings</span>
                                    </NavLink>
                                    <button
                                        className={`${styles.dropdownItem} ${styles.logoutItem}`}
                                        onClick={handleSignOut}
                                    >
                                        <FiLogOut />
                                        <span>Sign Out</span>
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className={styles.mobileHeader}>
                <NavLink to="/dashboard" className={styles.mobileLogo}>
                    <Logo size={32} />
                    <span>StartCode</span>
                </NavLink>
                <button
                    className={styles.menuButton}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FiX /> : <FiMenu />}
                </button>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                    >
                        <nav className={styles.mobileNav}>
                            {navItems.map(item => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        `${styles.mobileNavItem} ${isActive ? styles.mobileNavItemActive : ''}`
                                    }
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <item.icon />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                            <NavLink
                                to="/profile"
                                className={styles.mobileNavItem}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FiUser />
                                <span>Profile</span>
                            </NavLink>
                            <NavLink
                                to="/settings"
                                className={styles.mobileNavItem}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FiSettings />
                                <span>Settings</span>
                            </NavLink>
                            <button
                                className={`${styles.mobileNavItem} ${styles.logoutItem}`}
                                onClick={handleSignOut}
                            >
                                <FiLogOut />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
