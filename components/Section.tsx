type Props = {
  id: string;
  index: string;
  label: string;
  title?: React.ReactNode;
  children: React.ReactNode;
};

export default function Section({ id, index, label, title, children }: Props) {
  return (
    <section id={id} className="relative">
      <div data-reveal="line" className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-3">
          <div data-reveal="fade" className="font-mono text-xs uppercase tracking-wider text-muted md:sticky md:top-24">
            <span className="text-accent">{index}</span> - {label}
          </div>
        </div>
        <div className="md:col-span-9">
          {title && (
            <h2 data-reveal="mask" className="mb-12 max-w-2xl overflow-hidden pb-[0.12em] font-serif text-4xl leading-[1.05] md:text-5xl">
              <span className="block">{title}</span>
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
