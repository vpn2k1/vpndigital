'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';

/** UI preview only: never sends or stores contact data. */
export function ContactForm() {
  const [cleared, setCleared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setCleared(true);
  }

  return <form className="contact-form" noValidate onSubmit={handleSubmit} onInput={() => setCleared(false)}>
    <h3 className="contact-form-title">Để lại thông tin</h3>
    <p className="contact-form-description">Biểu mẫu liên hệ hiện đang trong giai đoạn thử nghiệm.</p>
    <div className="contact-field">
      <label htmlFor="contact-name">Họ và tên</label>
      <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Nhập họ và tên" maxLength={120} />
    </div>
    <div className="contact-field">
      <label htmlFor="contact-phone">Số điện thoại</label>
      <input id="contact-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Nhập số điện thoại" maxLength={30} />
    </div>
    <div className="contact-field">
      <label htmlFor="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Nhập địa chỉ email" maxLength={200} />
    </div>
    <button className="contact-form-button" type="submit">
      <span>Gửi thông tin</span><ArrowUpRight size={19} strokeWidth={2} aria-hidden="true"/>
    </button>
    <p className="contact-form-hint">Chức năng gửi chưa được kích hoạt. Nhấn Gửi chỉ làm trống biểu mẫu; thông tin không được gửi hoặc lưu lại.</p>
    <p className="contact-form-status" role="status" aria-live="polite">{cleared ? 'Đã xóa nội dung biểu mẫu — chưa gửi dữ liệu.' : ''}</p>
  </form>;
}
