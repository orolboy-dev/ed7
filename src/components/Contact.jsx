import { useState } from 'react';
import { useLanguage } from '../LanguageContext';

const CONTACT_FORM_ID = '1aa810d861ca780af98b3b9960b3649b';

function Contact() {
  const { t } = useLanguage();
  const [formMessage, setFormMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const text = t.contact;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');

    setIsSending(true);
    setFormMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_FORM_ID}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: formData.get('message'),
          _subject: `${text.subject}: ${name}`,
          _replyto: email,
        }),
      });
      const result = await response.json();

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error(result.message || `Form submission failed (${response.status})`);
      }

      form.reset();
      setFormMessage(text.emailSent);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setFormMessage(text.emailSendFailed);
    } finally {
      setIsSending(false);
    }
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
            disabled={isSending}
            type="submit"
          >
            {isSending ? text.sending : text.send}
          </button>

          <p
            aria-live="polite"
            className={`text-sm ${formMessage === text.emailSendFailed ? 'text-red-300' : 'text-blue-200'}`}
            role={formMessage === text.emailSendFailed ? 'alert' : 'status'}
          >
            {formMessage}
          </p>
        </form>
      </div>
    </section>
  );
}

export default Contact;
