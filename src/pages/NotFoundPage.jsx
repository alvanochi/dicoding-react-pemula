import React from 'react';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function NotFoundPage() {
  const { locale } = useLocale();
  const t = localeData[locale];

  return (
    <div className="not-found" data-testid="not-found-page">
      <h2>404</h2>
      <p>{t.pageNotFound}</p>
    </div>
  );
}

export default NotFoundPage;
