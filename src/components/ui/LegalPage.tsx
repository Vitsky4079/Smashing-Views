import { TriangleAlert } from "lucide-react";

type Doc = { title: string; notice: string; sections: ReadonlyArray<{ h: string; p: string }> };

/** Shared layout for legal placeholders. Content is explicitly marked as a draft needing review. */
export function LegalPage({ doc }: { doc: Doc }) {
  return (
    <section className="relative pb-28 pt-40 md:pt-48">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[60vh]" aria-hidden="true" />
      <div className="wrap relative max-w-3xl">
        <h1 className="display text-[clamp(2.2rem,6vw,4.5rem)]">{doc.title}</h1>
        <p className="mt-8 flex items-start gap-3 border border-[#e5b800]/50 bg-[#e5b800]/10 px-5 py-4 text-sm text-ink">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#e5b800]" aria-hidden />
          {doc.notice}
        </p>
        <div className="mt-12 space-y-10">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h2 className="display text-2xl">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-mute">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
