import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

/* Aloqa uchun haqiqiy email manzilingizni shu yerga yozing. */
const CONTACT_EMAIL = 'your.email@example.com';

function Contact() {
  const { t } = useLanguage();
  const [formMessage, setFormMessage] = useState('');
  const text = t.contact;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (CONTACT_EMAIL === 'your.email@example.com') {
      setFormMessage(
        text.emailNotConfigured,
      );
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const subject = encodeURIComponent(`${text.subject}: ${name}`);
    const body = encodeURIComponent(
      `${text.nameInBody}: ${name}\n${text.email}: ${email}\n\n${message}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormMessage(text.emailPrepared);
    event.currentTarget.reset();
  };

  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-zinc-900/40"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal-left>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
            {text.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {text.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-400">
            {text.intro}
          </p>
        </div>

        <form
          className="space-y-5"
          data-reveal-right
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-200"
              htmlFor="contact-name"
            >
              {text.name}
            </label>
            <input
              autoComplete="name"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400"
              id="contact-name"
              name="name"
              placeholder={text.namePlaceholder}
              required
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-200"
              htmlFor="contact-email"
            >
              {text.email}
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400"
              id="contact-email"
              name="email"
              placeholder="email@example.com"
              required
              type="email"
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-medium text-zinc-200"
              htmlFor="contact-message"
            >
              {text.message}
            </label>
            <textarea
              className="min-h-36 w-full resize-y rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-blue-400"
              id="contact-message"
              name="message"
              placeholder={text.messagePlaceholder}
              required
              rows="5"
            />
          </div>

          <button
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-zinc-900"
            type="submit"
          >
            {text.send}
          </button>

          <p aria-live="polite" className="text-sm text-blue-200" role="status">
            {formMessage}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
