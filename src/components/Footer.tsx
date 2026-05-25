export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell footer-row">
        <div>
          <div className="footer-mark">Latent <em>Lab</em></div>
          <div style={{ marginTop: 6 }}>© {year} Latent Lab LLC&nbsp;·&nbsp;All rights reserved</div>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href="mailto:contact@latentlab.dev">contact@latentlab.dev</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
        </div>
      </div>
    </footer>
  );
}
