import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotesList from '../components/NotesList';
import NoteSearch from '../components/NoteSearch';
import LoadingIndicator from '../components/LoadingIndicator';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function HomePage() {
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
    const { error, data } = await getActiveNotes();
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

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
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
      <h2>{t.activeNotes}</h2>
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
