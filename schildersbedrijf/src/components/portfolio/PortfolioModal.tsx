'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Package, Tag } from 'lucide-react';
import { portfolioProjects } from '@/lib/data';

type PortfolioProject = typeof portfolioProjects[number];

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export default function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.75)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' as const }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header image */}
              <div
                className={`relative h-64 rounded-t-2xl bg-gradient-to-br ${project.gradient} flex items-end`}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                  style={{ background: 'rgba(0,0,0,0.35)' }}
                  aria-label="Modal sluiten"
                >
                  <X size={18} aria-hidden="true" />
                </button>

                {/* Badges */}
                <div className="p-6 flex items-center gap-2 flex-wrap">
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: '#FBBF24', color: '#1F2937' }}
                  >
                    {project.category}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full border text-white"
                    style={{ background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.3)' }}
                  >
                    {project.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h2 className="font-serif text-2xl font-bold mb-2" style={{ color: '#1F2937' }}>
                  {project.title}
                </h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: '#6B7280' }}>
                    <MapPin size={14} aria-hidden="true" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: '#6B7280' }}>
                    <Tag size={14} aria-hidden="true" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <p className="text-base leading-relaxed mb-6" style={{ color: '#6B7280' }}>
                  {project.description}
                </p>

                {/* Materials */}
                <div
                  className="flex items-start gap-3 rounded-xl p-5"
                  style={{ background: '#F3F4F6' }}
                >
                  <Package size={18} className="flex-shrink-0 mt-0.5" style={{ color: '#1E3A8A' }} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: '#1F2937' }}>
                      Gebruikte materialen
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>
                      {project.materials}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                  <a
                    href="/contact"
                    className="flex-1 text-center py-3 font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02]"
                    style={{ background: '#1E3A8A', color: '#ffffff' }}
                  >
                    Vergelijkbaar project aanvragen
                  </a>
                  <button
                    onClick={onClose}
                    className="flex-1 text-center py-3 font-semibold rounded-lg border transition-all duration-200 cursor-pointer"
                    style={{ borderColor: '#E5E7EB', color: '#6B7280' }}
                  >
                    Terug naar portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
