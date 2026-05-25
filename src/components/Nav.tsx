export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-mark">
        <span className="dot" aria-hidden="true" />
        <span>Latent Lab&nbsp;·&nbsp;LLC</span>
      </div>
      <div className="nav-links">
        <a href="#about"><span className="idx">01</span>About</a>
        <a href="#projects"><span className="idx">02</span>Projects</a>
        <a href="#/contact"><span className="idx">03</span>Contact</a>
      </div>
    </nav>
  );
}
