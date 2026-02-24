import React from 'react';

function NoteSearch({ keyword, onKeywordChange }) {
  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder="Cari catatan ..."
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;
