import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArchivePage from '../pages/ArchivePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import LoadingIndicator from './LoadingIndicator';
import { getAccessToken, putAccessToken, getUserLogged } from '../utils/network-data';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { LocaleProvider, useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function AppBar({ authedUser, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { locale, toggleLocale } = useLocale();
  const t = localeData[locale];

  return (
    <header className="note-app__header" data-testid="note-app-header">
      <h1>
        <Link to="/">{t.appTitle}</Link>
      </h1>
      <nav className="navigation">
        <ul>
          <li>
            <button className="toggle-button" onClick={toggleTheme} title="Toggle Theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <button className="toggle-button" onClick={toggleLocale} title="Toggle Language">
              {locale === 'id' ? 'EN' : 'ID'}
            </button>
          </li>
          {authedUser && (
            <>
              <li>
                <Link to="/archives">{t.archivedNotes}</Link>
              </li>
              <li>
                <Link to="/notes/new">+ {t.addNote}</Link>
              </li>
              <li>
                <button className="toggle-button logout-button" onClick={onLogout}>
                  {t.logout} ({authedUser.name})
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

function AppContent() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = getAccessToken();
      if (accessToken) {
        const { error, data } = await getUserLogged();
        if (!error) {
          setAuthedUser(data);
        }
      }
      setInitializing(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const onLoginSuccess = async () => {
    const { error, data } = await getUserLogged();
    if (!error) {
      setAuthedUser(data);
      navigate('/');
    }
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    navigate('/');
  };

  if (initializing) {
    return (
      <div className="note-app" data-testid="note-app">
        <LoadingIndicator />
      </div>
    );
  }

  if (authedUser === null) {
    return (
      <div className="note-app" data-testid="note-app">
        <AppBar authedUser={null} onLogout={onLogout} />
        <main className="note-app__body" data-testid="note-app-body">
          <Routes>
            <Route path="/" element={<LoginPage loginSuccess={onLoginSuccess} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
          </Routes>
        </main>
      </div>
    );
  }

  return (
    <div className="note-app" data-testid="note-app">
      <AppBar authedUser={authedUser} onLogout={onLogout} />
      <main className="note-app__body" data-testid="note-app-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/archives" element={<ArchivePage />} />
          <Route path="/notes/new" element={<AddPage />} />
          <Route path="/notes/:id" element={<DetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AppContent />
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
