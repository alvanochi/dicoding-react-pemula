import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login, putAccessToken } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function LoginPage({ loginSuccess }) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [loading, setLoading] = useState(false);
    const { locale } = useLocale();
    const t = localeData[locale];

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, data } = await login({ email, password });

        if (!error) {
            putAccessToken(data.accessToken);
            loginSuccess(data);
        }

        setLoading(false);
    };

    return (
        <section className="auth-page">
            <h2>{t.login}</h2>
            <form onSubmit={onSubmitHandler} className="auth-form">
                <label htmlFor="email">{t.email}</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                    placeholder={t.email}
                    required
                />
                <label htmlFor="password">{t.password}</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                    placeholder={t.password}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? t.loading : t.login}
                </button>
            </form>
            <p className="auth-page__link">
                {t.noAccount} <Link to="/register">{t.registerHere}</Link>
            </p>
        </section>
    );
}

export default LoginPage;
