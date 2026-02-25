import React, { useState } from 'react';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function NoteInput({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { locale } = useLocale();
  const t = localeData[locale];

  const onTitleChangeHandler = (event) => {
    const newTitle = event.target.value;
    if (newTitle.length <= 50) {
      setTitle(newTitle);
    }
  };

  const onBodyChangeHandler = (event) => {
    setBody(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote({ title, body });
  };

  const remainingChars = 50 - title.length;

  return (
    <div className="note-input" data-testid="note-input">
      <form onSubmit={onSubmitHandler} data-testid="note-input-form">
        <p
          className="note-input__title__char-limit"
          data-testid="note-input-title-remaining"
        >
          {remainingChars} {t.charRemaining}
        </p>
        <input
          className="note-input__title"
          type="text"
          placeholder={t.titlePlaceholder}
          value={title}
          onChange={onTitleChangeHandler}
          required
          data-testid="note-input-title-field"
        />
        <textarea
          className="note-input__body"
          placeholder={t.bodyPlaceholder}
          value={body}
          onChange={onBodyChangeHandler}
          data-testid="note-input-body-field"
        />
        <button type="submit" data-testid="note-input-submit-button">
          {t.create}
        </button>
      </form>
    </div>
  );
}

export default NoteInput;
