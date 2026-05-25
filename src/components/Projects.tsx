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

// TODO(subdomains): replace example.com URLs with the real subdomains once DNS is wired up.
const projects: Project[] = [
  {
    id: 'LL-001',
    name: 'Riftbound',
    emphasized: 'Engine',
    tag: 'Deck Editor',
    description:
      'A precision deck editor for Riftbound. Built for the people who actually shuffle the cards — fast search, format-aware validation, and exports that don\'t fight your tournament software.',
    href: 'https://riftbound.example.com',
    status: 'live',
    statusLabel: 'Live',
  },
  {
    id: 'LL-002',
    name: 'MTG Modern',
    emphasized: 'Engine',
    tag: 'Deck Builder',
    description:
      'A deck builder for Magic: The Gathering Modern. Opinionated, keyboard-driven, and tuned for the metagame people actually queue against.',
    href: 'https://mtgmodern.example.com',
    status: 'beta',
    statusLabel: 'Beta',
  },
  {
    id: 'LL-003',
    name: 'lag',
    emphasized: 'sleuth',
    tag: 'Network Monitor',
    description:
      'Lightweight network monitoring with a sense of humor about itself. Find the link that\'s lying about being up before your users do.',
    href: 'https://lagsleuth.example.com',
    status: 'alpha',
    statusLabel: 'Alpha',
  },
];

export function Projects() {
  return (
    <section id="projects" className="section">
      <header className="section-head">
        <span className="idx">// 02 — Projects</span>
        <h2>Three surfaces. <em>One studio.</em></h2>
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
