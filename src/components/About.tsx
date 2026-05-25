export function About() {
  return (
    <section id="about" className="section">
      <header className="section-head">
        <span className="idx">// 01 — About</span>
        <h2>A studio for tools that <em>think</em>.</h2>
      </header>
      <div className="about">
        <div className="about-spacer" aria-hidden="true" />
        <div className="about-body">
          <p>
            Latent Lab is a small, independent software studio.
            We ship focused tools — practical instruments, built
            for people who want their software to feel like it
            was made by someone who cared.
          </p>
          <p>
            Every project below is a separate surface, deployed at
            its own subdomain. Pick a thing. Use it. Tell us when
            it&apos;s wrong.
          </p>
        </div>
        <aside className="about-meta" aria-label="Studio metadata">
          <div className="meta-row">
            <span className="k">Founded</span>
            <span className="v">2026</span>
          </div>
          <div className="meta-row">
            <span className="k">Entity</span>
            <span className="v">LLC&nbsp;·&nbsp;US</span>
          </div>
          <div className="meta-row">
            <span className="k">Focus</span>
            <span className="v">Tools, games, networks</span>
          </div>
          <div className="meta-row">
            <span className="k">Status</span>
            <span className="v">Open for work</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
