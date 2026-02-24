import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId = 'notes-list' }) {
  const hasNotes = notes && notes.length > 0;

  if (!hasNotes) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p
          className="notes-list__empty-message"
          data-testid={`${dataTestId}-empty`}
        >
          Tidak ada catatan
        </p>
      </div>
    );
  }

  const groupedNotes = {};
  notes.forEach((note) => {
    const date = new Date(note.createdAt);
    const options = { month: 'long', year: 'numeric' };
    const groupKey = date.toLocaleDateString('id-ID', options);

    if (!groupedNotes[groupKey]) {
      groupedNotes[groupKey] = [];
    }
    groupedNotes[groupKey].push(note);
  });

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([groupKey, groupNotes]) => (
        <section key={groupKey} data-testid={`${groupKey}-group`} className="notes-group">
          <h3>{groupKey}</h3>
          <span data-testid={`${groupKey}-group-count`}>{groupNotes.length} catatan</span>
          <div className="notes-group__list">
            {groupNotes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;
