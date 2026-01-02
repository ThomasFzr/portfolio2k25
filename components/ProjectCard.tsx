interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
  index?: number;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
  index = 0,
}: ProjectCardProps) {
  return (
    <div
      className="group relative bg-dark-light border border-dark-lighter rounded-xl p-8 hover:border-primary transition-slow overflow-hidden card-3d"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Effet de lumière au survol */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 transition-slow pointer-events-none" />
      
      {/* Numéro du projet */}
      <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-slow">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-4 py-1.5 bg-dark-lighter border border-dark-lighter text-primary text-xs font-medium rounded-full group-hover:border-primary/50 transition-smooth"
            >
              {tech}
            </span>
          ))}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition-smooth font-medium group/link"
          >
            <span>Voir le projet</span>
            <svg
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-smooth"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        )}
      </div>

      {/* Ligne animée en bas */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-slow animated-line" />
    </div>
  );
}



