import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';
import NoteInput from '../components/NoteInput';

function AddPage() {
  const navigate = useNavigate();

  const onAddNoteHandler = (note) => {
    addNote(note);
    navigate('/');
  };

  return (
    <section>
      <h2>Tambah Catatan Baru</h2>
      <NoteInput addNote={onAddNoteHandler} />
    </section>
  );
}

export default AddPage;
