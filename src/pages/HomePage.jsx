import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/local-data';

function HomePage() {
  const [notes, setNotes] = useState(getActiveNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const onKeywordChangeHandler = (newKeyword) => {
    setSearchParams({ keyword: newKeyword });
  };

  const onDeleteHandler = (id) => {
    deleteNote(id);
    setNotes(getActiveNotes());
  };

  const onArchiveHandler = (id) => {
    archiveNote(id);
    setNotes(getActiveNotes());
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section>
      <h2>Catatan Aktif</h2>
      <NoteSearch keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onArchiveHandler}
        searchKeyword={keyword}
        dataTestId="active-notes-list"
      />
    </section>
  );
}

export default HomePage;
