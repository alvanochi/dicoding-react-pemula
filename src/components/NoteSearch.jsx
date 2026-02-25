import React from 'react';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function NoteSearch({ keyword, onKeywordChange }) {
  const { locale } = useLocale();
  const t = localeData[locale];

  return (
    <div className="note-search" data-testid="note-search">
      <input
        type="text"
        placeholder={t.searchPlaceholder}
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        data-testid="note-search-input"
      />
    </div>
  );
}

export default NoteSearch;
