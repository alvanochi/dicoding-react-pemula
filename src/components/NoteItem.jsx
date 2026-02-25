import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils/local-data';
import NoteActionButton from './NoteActionButton';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function highlightText(text, keyword) {
  if (!keyword || !keyword.trim()) return text;

  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedKeyword})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        )
      )}
    </>
  );
}

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {
  const { locale } = useLocale();
  const t = localeData[locale];

  return (
    <div
      className="note-item"
      data-testid="note-item"
      data-note-id={note?.id}
    >
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          <Link to={`/notes/${note.id}`}>{highlightText(note.title, searchKeyword)}</Link>
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        <div className="note-item__body" data-testid="note-item-body">
          {note.body}
        </div>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton variant="delete" onClick={() => onDelete(note.id)}>
          {t.delete}
        </NoteActionButton>
        <NoteActionButton variant="archive" onClick={() => onArchive(note.id)}>
          {note.archived ? t.unarchive : t.archive}
        </NoteActionButton>
      </div>
    </div>
  );
}

export default NoteItem;
