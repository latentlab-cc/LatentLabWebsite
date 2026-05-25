export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <HeroSvg />
      <div className="shell hero-content">
        <div className="hero-tag mono">
          <span className="bar" aria-hidden="true" />
          <span>Independent software studio</span>
        </div>
        <h1 className="hero-title">
          <span className="row"><span>Latent</span></span>
          <span className="row"><span><em>Lab</em>.</span></span>
        </h1>
        <p className="hero-sub">
          We build software for players who want to play their best.
          Deck builders for the games we love, network monitoring
          that keeps your connection out of the way, and more on the way.
        </p>
      </div>
      <div className="hero-foot">
        <div className="coord">N 41°&nbsp;·&nbsp;W 74°&nbsp;·&nbsp;Index&nbsp;01&nbsp;/&nbsp;03</div>
        <a className="scroll" href="#about" aria-label="Scroll to about">
          <span>Scroll</span>
          <span className="stroke" aria-hidden="true" />
          <span>↓</span>
        </a>
      </div>
    </section>
  );
}

function HeroSvg() {
  // A handful of nodes connected by faint lines — evokes a latent space / network graph.
  const nodes = [
    { x: 12, y: 22 }, { x: 28, y: 68 }, { x: 44, y: 18 },
    { x: 58, y: 78 }, { x: 76, y: 36 }, { x: 88, y: 64 },
    { x: 20, y: 88 }, { x: 92, y: 14 },
  ];
  const links: Array<[number, number]> = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4],
    [3, 5], [4, 5], [4, 7], [1, 6], [3, 6],
  ];
  return (
    <svg
      className="hero-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(235, 229, 216, 0.10)"
          strokeWidth="0.08"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="0.35"
          fill={i % 3 === 0 ? '#ff5b2e' : 'rgba(235,229,216,0.45)'}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
