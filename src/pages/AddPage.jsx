import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import NoteInput from '../components/NoteInput';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function AddPage() {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const t = localeData[locale];

  const onAddNoteHandler = async (note) => {
    const { error } = await addNote(note);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section>
      <h2>{t.addNote}</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
