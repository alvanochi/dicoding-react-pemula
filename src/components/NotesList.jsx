import React from 'react';
import NoteItem from './NoteItem';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  const { locale } = useLocale();
  const t = localeData[locale];
  const hasNotes = notes && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          {t.noNotes}
        </p>
      </div>
    );
  }

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          searchKeyword={searchKeyword}
        />
      ))}
    </div>
  );
}

export default NotesList;
