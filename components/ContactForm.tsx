'use client';

import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CheckCircle2, ArrowUpRight, X } from 'lucide-react';
import { z } from 'zod';
import { getStrings } from '@/config/strings';
import { useLanguage } from '@/hooks/useLanguage';

function contactSchema(copy: ReturnType<typeof getStrings>['form']) {
  return z.object({
    name: z.string().trim()
      .min(2, copy.validation.nameRequired)
      .max(120, copy.validation.nameTooLong),
    phone: z.string().trim()
      .min(1, copy.validation.phoneRequired)
      .refine(value => {
        if (!/^\+?[0-9\s().-]+$/.test(value)) return false;
        const digits = value.replace(/\D/g, '');
        return digits.length >= 9 && digits.length <= 15;
      }, copy.validation.phoneInvalid),
    email: z.string().trim()
      .min(1, copy.validation.emailRequired)
      .email(copy.validation.emailInvalid),
  });
}

type ContactValues = z.infer<ReturnType<typeof contactSchema>>;

/** Preview form: validated with RHF + Zod. No API, submission, or persistence. */
export function ContactForm() {
  const { locale } = useLanguage();
  const s = getStrings(locale).form;
  const schema = useMemo(() => contactSchema(s), [s]);
  const [showToast, setShowToast] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { name: '', phone: '', email: '' },
  });

  const onValid = () => {
    // This is a demo only. Never claim that data reached a recipient.
    setShowToast(true);
  };
  const onInvalid = () => setShowToast(false);

  return <>
    <form className="contact-form" noValidate onSubmit={handleSubmit(onValid, onInvalid)} onInput={() => setShowToast(false)}>
      <h3 className="contact-form-title">{s.title}</h3>
      <p className="contact-form-description">{s.description}</p>

      <div className="contact-field">
        <label htmlFor="contact-name">{s.name}</label>
        <input id="contact-name" type="text" autoComplete="name" placeholder={s.namePlaceholder}
          maxLength={120} aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')} />
        {errors.name && <p className="contact-field-error" id="contact-name-error" role="alert">{errors.name.message}</p>}
      </div>
      <div className="contact-field">
        <label htmlFor="contact-phone">{s.phone}</label>
        <input id="contact-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder={s.phonePlaceholder}
          maxLength={30} aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          {...register('phone')} />
        {errors.phone && <p className="contact-field-error" id="contact-phone-error" role="alert">{errors.phone.message}</p>}
      </div>
      <div className="contact-field">
        <label htmlFor="contact-email">{s.email}</label>
        <input id="contact-email" type="email" autoComplete="email" inputMode="email" placeholder={s.emailPlaceholder}
          maxLength={200} aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')} />
        {errors.email && <p className="contact-field-error" id="contact-email-error" role="alert">{errors.email.message}</p>}
      </div>

      <button className="contact-form-button" type="submit" disabled={isSubmitting}>
        <span>{s.send}</span><ArrowUpRight size={19} strokeWidth={2} aria-hidden="true"/>
      </button>
      <p className="contact-form-hint">{s.hint}</p>
    </form>

    {showToast && <div className="contact-toast" role="status" aria-live="polite" aria-atomic="true">
      <span className="contact-toast-icon" aria-hidden="true"><CheckCircle2 size={23}/></span>
      <div className="contact-toast-copy"><strong>{s.success}</strong><small>{s.simulation}</small></div>
      <button type="button" className="contact-toast-dismiss" aria-label={s.dismiss}
        onClick={() => setShowToast(false)}><X size={18} aria-hidden="true"/></button>
    </div>}
  </>;
}
