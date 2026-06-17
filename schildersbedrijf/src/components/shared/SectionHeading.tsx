interface Props {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ id, label, title, subtitle, centered = false, light = false }: Props) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
      {label && (
        <span className={`text-sm font-semibold tracking-widest uppercase mb-3 block ${light ? 'text-[#FBBF24]' : 'text-[#1E3A8A]'}`}>
          {label}
        </span>
      )}
      <h2 id={id} className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${light ? 'text-white' : 'text-[#1F2937]'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-[#6B7280]'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
