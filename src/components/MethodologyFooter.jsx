import React from 'react';
import { BookOpen, Calculator, ExternalLink } from 'lucide-react';
import { GLOSSARY_TERMS, METHODOLOGY_SECTIONS, SOURCES } from '../data/simGlossary';

const MethodologyFooter = () => (
  <footer className="mt-16 pt-10 border-t border-slate-800">
    <div className="flex items-center gap-2 mb-6">
      <BookOpen className="text-blue-500" size={20} />
      <h2 className="text-lg font-bold text-white">Model dictionary & methodology</h2>
    </div>
    <p className="text-sm text-slate-400 mb-8 max-w-3xl leading-relaxed">
      This 24-month pro-forma uses system dynamics—not static spreadsheets. Values are calibrated
      against BuiltByBit marketplace economics, bare-metal hosting blueprints, and standard F2P
      monetization research. Adjust sliders to stress-test; hover or tap each{' '}
      <span className="inline-flex align-middle text-slate-500">
        <span className="rounded-full border border-slate-600 px-1 text-[10px]">i</span>
      </span>{' '}
      icon for quick definitions.
    </p>

    <section className="mb-10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
        <Calculator size={14} /> Simulation logic (V5.1)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {METHODOLOGY_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="bg-slate-900/80 rounded-xl p-5 border border-slate-800"
          >
            <h4 className="text-sm font-bold text-white mb-2">{section.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="mb-10">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
        Glossary
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {GLOSSARY_TERMS.map((entry) => (
          <div
            key={entry.term}
            className="bg-slate-900/60 rounded-lg p-4 border border-slate-800/80"
          >
            <dt className="text-sm font-bold text-blue-400 mb-1">{entry.term}</dt>
            <dd className="text-xs text-slate-300 mb-2 leading-relaxed">{entry.definition}</dd>
            {entry.formula && (
              <dd className="text-[10px] font-mono text-slate-500 bg-slate-950/80 rounded px-2 py-1 mb-2 border border-slate-800">
                {entry.formula}
              </dd>
            )}
            <dd className="text-[10px] text-slate-600 italic">Source: {entry.source}</dd>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
        References & data sources
      </h3>
      <ul className="space-y-3">
        {SOURCES.map((src) => (
          <li
            key={src.url}
            className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 text-xs"
          >
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 shrink-0"
            >
              {src.name}
              <ExternalLink size={11} />
            </a>
            <span className="text-slate-500 leading-relaxed">{src.note}</span>
          </li>
        ))}
      </ul>
      <p className="text-[10px] text-slate-600 mt-6 leading-relaxed">
        BuiltByBit Server A/B figures are observational comps from marketplace listings (network
        survival ~$40/CCU, box gamemode ~$58/CCU at ~$10k/mo gross). Infrastructure costs reflect
        Hetzner-class bare metal + Path/CosmicGuard-style DDoS filtering—not retail panel per-GB
        pricing. This model is for planning and investor education; actual results will vary with
        execution, game updates, and market conditions.
      </p>
    </section>
  </footer>
);

export default MethodologyFooter;
