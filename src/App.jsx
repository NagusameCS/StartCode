import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import { useProgressStore } from './store/progressStore';

// Eagerly loaded pages (critical path)
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazily loaded pages (code splitting)
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const TeacherPage = lazy(() => import('./pages/TeacherPage'));
const DownloadPage = lazy(() => import('./pages/DownloadPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const CertificatePage = lazy(() => import('./pages/CertificatePage'));
const CanvasPage = lazy(() => import('./pages/CanvasPage'));
const ChallengePage = lazy(() => import('./pages/ChallengePage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const UserChallengesPage = lazy(() => import('./pages/UserChallengesPage'));
const SubmitChallengePage = lazy(() => import('./pages/SubmitChallengePage'));
const EditChallengePage = lazy(() => import('./pages/EditChallengePage'));

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';

// Styles
import './styles/globals.css';

// Lazy loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    color: 'var(--color-text-muted)'
  }}>
    Loading...
  </div>
);

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
    <ErrorBoundary>
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

        <Suspense fallback={<PageLoader />}>
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
                <Route path="/challenges/edit/:challengeId" element={<EditChallengePage />} />
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

            {/* 404 - Show Not Found page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
