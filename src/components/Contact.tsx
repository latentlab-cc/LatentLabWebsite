import { useEffect, useState } from 'react';

const EMAIL = 'contact@latentlab.cc';

export function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Scroll to top whenever the contact page is shown.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API blocked — fall through; the email is still selectable.
    }
  };

  return (
    <section className="contact-page">
      <div className="shell">
        <header className="contact-head">
          <span className="mono">// 03 — Contact</span>
          <h1>Get in <em>touch</em>.</h1>
          <p className="contact-lede">
            Bug report, feature idea, partnership, or just a hello —
            send it to the address below. We read everything.
          </p>
        </header>

        <div className="contact-grid">
          <article className="contact-card">
            <div className="contact-card-label mono">Email</div>
            <a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <button
              type="button"
              className="contact-copy mono"
              onClick={onCopy}
              aria-live="polite"
            >
              <span className="copy-icon" aria-hidden="true">{copied ? '✓' : '⧉'}</span>
              <span>{copied ? 'Copied' : 'Copy address'}</span>
            </button>
          </article>

          <aside className="contact-meta">
            <div className="meta-row">
              <span className="k">Entity</span>
              <span className="v">Latent Lab LLC</span>
            </div>
            <div className="meta-row">
              <span className="k">Jurisdiction</span>
              <span className="v">United States</span>
            </div>
            <div className="meta-row">
              <span className="k">Response</span>
              <span className="v">Usually within 48h</span>
            </div>
            <div className="meta-row">
              <span className="k">Best for</span>
              <span className="v">Bugs, features, partnerships</span>
            </div>
          </aside>
        </div>

        <a className="contact-back mono" href="#/">
          <span aria-hidden="true">←</span>
          <span>Back to home</span>
        </a>
      </div>
    </section>
  );
}
