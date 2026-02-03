import type { ReactNode } from "react";

export default function GlassCard({
  title,
  children,
  className
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-5 ${className ?? ""}`}>
      {title ? (
        <div className="mb-3 text-sm tracking-widest text-white/70 uppercase">
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}
