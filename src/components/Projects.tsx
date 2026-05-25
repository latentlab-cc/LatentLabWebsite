type Status = 'live' | 'beta' | 'alpha';

type Project = {
  id: string;
  name: string;
  emphasized?: string;
  tag: string;
  description: string;
  href: string;
  status: Status;
  statusLabel: string;
};

const projects: Project[] = [
  {
    id: 'LL-001',
    name: 'Riftbound',
    emphasized: 'Deck Builder',
    tag: 'Deck Editor',
    description:
      'A deck editor for Riftbound, built for players who actually shuffle the cards. Fast search, format-aware validation, and exports that work with your tournament software.',
    href: 'https://the-rift.latentlab.cc/',
    status: 'live',
    statusLabel: 'Live',
  },
  {
    id: 'LL-002',
    name: 'MtG',
    emphasized: 'Deck Builder',
    tag: 'Deck Builder',
    description:
      'A deck builder for Magic: The Gathering\'s Modern Format. Tuned for tournament-focused players.',
    href: 'https://modernmtg.latentlab.cc/',
    status: 'beta',
    statusLabel: 'Beta',
  },
  {
    id: 'LL-003',
    name: 'Lag',
    emphasized: 'Sleuth',
    tag: 'Network Monitor',
    description:
      'Lightweight network monitoring built for gamers. Pinpoint the lag spikes that wreck matches - see where your connection is dropping packets before it costs you another game.',
    href: 'https://lagsleuth.latentlab.cc/',
    status: 'alpha',
    statusLabel: 'Alpha',
  },
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <header className="section-head">
        <span className="idx">// 02 — Projects</span>
        <h2>Built for <em>players</em>.</h2>
      </header>
      <div className="projects" role="list">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project"
      href={project.href}
      role="listitem"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="project-top">
        <span className="project-id">{project.id}</span>
        <span className={`project-status ${project.status}`}>
          <span className="led" aria-hidden="true" />
          <span>{project.statusLabel}</span>
        </span>
      </div>
      <h3>
        {project.name}
        {project.emphasized && <> <em>{project.emphasized}</em></>}
      </h3>
      <span className="project-tag">{project.tag}</span>
      <p className="project-desc">{project.description}</p>
      <span className="project-cta">
        <span>Launch</span>
        <span className="arrow" aria-hidden="true">→</span>
      </span>
    </a>
  );
}
