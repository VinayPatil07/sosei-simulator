import React, { useId, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Info } from 'lucide-react';

const InfoTip = ({ title, body, className = '' }) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const id = useId();
  const tipId = `${id}-tip`;

  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const update = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      const width = 256;
      let left = rect.right + 8;
      if (left + width > window.innerWidth - 12) {
        left = rect.left - width - 8;
      }
      setCoords({ top: rect.top, left: Math.max(12, left) });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (!buttonRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  return (
    <span className={`relative inline-flex align-middle ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        className="text-slate-500 hover:text-blue-400 focus:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 rounded-full p-0.5 transition-colors"
        aria-label={title ? `About ${title}` : 'More information'}
        aria-expanded={open}
        aria-describedby={open ? tipId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <Info size={13} strokeWidth={2.5} />
      </button>
      {open &&
        createPortal(
          <div
            id={tipId}
            role="tooltip"
            className="fixed z-[200] w-64 p-3 rounded-lg border border-slate-700 bg-slate-950 shadow-2xl text-left"
            style={{ top: coords.top, left: coords.left }}
          >
            {title && <p className="text-[11px] font-bold text-white mb-1">{title}</p>}
            <p className="text-[10px] text-slate-400 leading-relaxed">{body}</p>
          </div>,
          document.body,
        )}
    </span>
  );
};

export const LeverLabel = ({ label, tipKey, tips }) => {
  const tip = tips[tipKey];
  if (!tip) return <span className="text-slate-300">{label}</span>;
  return (
    <span className="inline-flex items-center gap-1 text-slate-300">
      {label}
      <InfoTip title={tip.title} body={tip.body} />
    </span>
  );
};

export default InfoTip;
