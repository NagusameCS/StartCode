import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { useProgressStore } from './store/progressStore';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import LessonPage from './pages/LessonPage';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import TeacherPage from './pages/TeacherPage';
import DownloadPage from './pages/DownloadPage';
import SettingsPage from './pages/SettingsPage';
import TestPage from './pages/TestPage';
import CertificatePage from './pages/CertificatePage';
import CanvasPage from './pages/CanvasPage';
import ChallengePage from './pages/ChallengePage';
import ChallengesPage from './pages/ChallengesPage';
import UserChallengesPage from './pages/UserChallengesPage';
import SubmitChallengePage from './pages/SubmitChallengePage';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';

// Styles
import './styles/globals.css';

function App() {
  const { initializeAuth, user, loading, checkIPSecurity } = useAuthStore();
  const { initTheme } = useThemeStore();
  const { syncFromFirebase } = useProgressStore();

  useEffect(() => {
    // Initialize theme
    initTheme();

    // Initialize auth listener
    const unsubscribe = initializeAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [initializeAuth, initTheme]);

  // Check IP security on user change
  useEffect(() => {
    if (user) {
      checkIPSecurity();
      syncFromFirebase();
    }
  }, [user, checkIPSecurity, syncFromFirebase]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter basename="/StartCode">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-card)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'white',
            },
          },
        }}
      />

      <Routes>
        {/* Public Route - Login */}
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CoursesPage />} />
            <Route path="/lesson/:courseId/:lessonId" element={<LessonPage />} />
            <Route path="/test/:courseId" element={<TestPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/teacher" element={<TeacherPage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/canvas" element={<CanvasPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/challenges/community" element={<UserChallengesPage />} />
            <Route path="/challenges/submit" element={<SubmitChallengePage />} />
            <Route path="/challenge/:challengeId" element={<ChallengePage />} />
            <Route path="/challenge/user/:userChallengeId" element={<ChallengePage />} />
            <Route path="/certificate/:certId" element={<CertificatePage />} />
          </Route>
        </Route>

        {/* Redirect root to dashboard or login */}
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />

        {/* 404 - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
