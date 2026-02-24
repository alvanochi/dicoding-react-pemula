import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArchivePage from '../pages/ArchivePage';
import AddPage from '../pages/AddPage';
import DetailPage from '../pages/DetailPage';
import NotFoundPage from '../pages/NotFoundPage';

function App() {
  return (
    <div className="note-app" data-testid="note-app">
      <header className="note-app__header" data-testid="note-app-header">
        <h1>
          <Link to="/">Notes</Link>
        </h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/archives">Arsip</Link>
            </li>
            <li>
              <Link to="/notes/new">Tambah Baru</Link>
            </li>
          </ul>
        </nav>
      </header>
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

export default App;
