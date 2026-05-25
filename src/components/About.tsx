export function About() {
  return (
    <section id="about" className="section">
      <header className="section-head">
        <span className="idx">// 01 — About</span>
        <h2>Software for <em>serious play</em>.</h2>
      </header>
      <div className="about">
        <div className="about-spacer" aria-hidden="true" />
        <div className="about-body">
          <p>
            Latent Lab is a small, independent studio building
            software for players. Whether you&apos;re tuning a deck
            before a tournament or chasing the lag spike that just
            killed your match, our tools are built to get out of
            the way and let you focus on the game.
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
            <span className="v">Tools for players</span>
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
