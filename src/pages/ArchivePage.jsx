import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import LoadingIndicator from '../components/LoadingIndicator';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function ArchivePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useLocale();
  const t = localeData[locale];

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const { error, data } = await getArchivedNotes();
    if (!error) {
      setNotes(data);
    }
    setLoading(false);
  };

  const onKeywordChangeHandler = (newKeyword) => {
    setSearchParams({ keyword: newKeyword });
  };

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    await fetchNotes();
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    await fetchNotes();
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <section>
      <h2>{t.archivedNotes}</h2>
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
