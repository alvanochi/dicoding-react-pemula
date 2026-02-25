import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';
import localeData from '../utils/locale-data';

function RegisterPage() {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confirmPassword, onConfirmPasswordChange] = useInput('');
    const [loading, setLoading] = useState(false);
    const { locale } = useLocale();
    const t = localeData[locale];
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert(t.passwordMismatch);
            return;
        }

        setLoading(true);

        const { error } = await register({ name, email, password });

        if (!error) {
            navigate('/');
        }

        setLoading(false);
    };

    return (
        <section className="auth-page">
            <h2>{t.register}</h2>
            <form onSubmit={onSubmitHandler} className="auth-form">
                <label htmlFor="name">{t.name}</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onNameChange}
                    placeholder={t.name}
                    required
                />
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
                <label htmlFor="confirmPassword">{t.confirmPassword}</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    placeholder={t.confirmPassword}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? t.loading : t.register}
                </button>
            </form>
            <p className="auth-page__link">
                {t.hasAccount} <Link to="/">{t.loginHere}</Link>
            </p>
        </section>
    );
}

export default RegisterPage;
