'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';

/** Demonstration only: clears fields; never posts or stores submitted data. */
export function ContactForm() {
  const { locale } = useLanguage();
  const s = getStrings(locale).form;
  const [cleared, setCleared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setCleared(true);
  }

  return <form className="contact-form" noValidate onSubmit={handleSubmit} onInput={() => setCleared(false)}>
    <h3 className="contact-form-title">{s.title}</h3>
    <p className="contact-form-description">{s.description}</p>
    <div className="contact-field">
      <label htmlFor="contact-name">{s.name}</label>
      <input id="contact-name" name="name" type="text" autoComplete="name" placeholder={s.namePlaceholder} maxLength={120} />
    </div>
    <div className="contact-field">
      <label htmlFor="contact-phone">{s.phone}</label>
      <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder={s.phonePlaceholder} maxLength={30} />
    </div>
    <div className="contact-field">
      <label htmlFor="contact-email">{s.email}</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder={s.emailPlaceholder} maxLength={200} />
    </div>
    <button className="contact-form-button" type="submit">
      <span>{s.send}</span><ArrowUpRight size={19} strokeWidth={2} aria-hidden="true"/>
    </button>
    <p className="contact-form-hint">{s.hint}</p>
    <p className="contact-form-status" role="status" aria-live="polite">{cleared ? s.cleared : ''}</p>
  </form>;
}
