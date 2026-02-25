import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/local-data';
import LoadingIndicator from '../components/LoadingIndicator';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { locale } = useLocale();
  const t = localeData[locale];

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const { error, data } = await getNote(id);
      if (!error) {
        setNote(data);
      }
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate('/');
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!note) {
    return <p className="detail-page__not-found">{t.noteNotFound}</p>;
  }

  return (
    <section className="detail-page">
      <h3 className="detail-page__title">{note.title}</h3>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>

      <div className="detail-page__action">
        <button className="action-button" onClick={onArchiveHandler}>
          {note.archived ? t.unarchive : t.archive}
        </button>
        <button className="action-button" onClick={onDeleteHandler}>
          {t.delete}
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
