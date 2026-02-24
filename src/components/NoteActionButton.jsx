import React from 'react';

function NoteActionButton({ variant, onClick, children }) {
  return (
    <button
      className={`note-item__${variant === 'delete' ? 'delete' : 'archive'}-button`}
      type="button"
      onClick={onClick}
      data-testid={variant === 'delete' ? 'note-item-delete-button' : 'note-item-archive-button'}
    >
      {children}
    </button>
  );
}

export default NoteActionButton;
