'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { portfolioProjects } from '@/lib/data';
import PortfolioModal from './PortfolioModal';

type PortfolioProject = typeof portfolioProjects[number];

const filters = ['Alles', 'Binnenschilderwerk', 'Buitenschilderwerk', 'Zakelijk', 'Particulier'];

export default function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState('Alles');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filtered =
    activeFilter === 'Alles'
      ? portfolioProjects
      : portfolioProjects.filter(
          (p) => p.category === activeFilter || p.type === activeFilter
        );

  return (
    <>
      {/* Filter buttons */}
      <div
        className="flex flex-wrap gap-3 mb-12"
        role="group"
        aria-label="Portfolio filters"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
            style={
              activeFilter === filter
                ? { background: '#1E3A8A', color: '#ffffff' }
                : { background: '#F3F4F6', color: '#6B7280' }
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((project, index) => {
          // Vary card heights for masonry effect
          const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60'];
          const imgHeight = heights[index % heights.length];

          return (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group block w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-left break-inside-avoid mb-6"
              aria-label={`Bekijk project: ${project.title}`}
            >
              {/* Gradient image placeholder */}
              <div
                className={`relative ${imgHeight} bg-gradient-to-br ${project.gradient}`}
              >
                {/* Dark hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.3)' }}
                >
                  <span className="text-white font-semibold text-sm px-4 py-2 rounded-full border border-white/50">
                    Bekijk details
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full self-start"
                    style={{ background: '#FBBF24', color: '#1F2937' }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full self-start border text-white"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderColor: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="bg-white p-5">
                <h3
                  className="font-serif font-bold text-base mb-1.5 transition-colors duration-200 group-hover:text-blue-800"
                  style={{ color: '#1F2937' }}
                >
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} style={{ color: '#9CA3AF' }} aria-hidden="true" />
                  <span className="text-xs" style={{ color: '#9CA3AF' }}>
                    {project.location}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Modal */}
      <PortfolioModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
