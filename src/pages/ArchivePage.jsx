import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/local-data';

function ArchivePage() {
  const [notes, setNotes] = useState(getArchivedNotes());
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const onKeywordChangeHandler = (newKeyword) => {
    setSearchParams({ keyword: newKeyword });
  };

  const onDeleteHandler = (id) => {
    deleteNote(id);
    setNotes(getArchivedNotes());
  };

  const onUnarchiveHandler = (id) => {
    unarchiveNote(id);
    setNotes(getArchivedNotes());
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section>
      <h2>Catatan Arsip</h2>
      <NoteSearch keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      <NotesList
        notes={filteredNotes}
        onDelete={onDeleteHandler}
        onArchive={onUnarchiveHandler}
        searchKeyword={keyword}
        dataTestId="archived-notes-list"
      />
    </section>
  );
}

export default ArchivePage;
