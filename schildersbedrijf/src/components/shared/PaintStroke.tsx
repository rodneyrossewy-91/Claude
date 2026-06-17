export default function PaintStroke({ color = 'yellow', className = '' }: { color?: 'yellow' | 'blue', className?: string }) {
  const fill = color === 'yellow' ? '#FBBF24' : '#1E3A8A';
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-8 md:h-12">
        <path d="M0,30 C200,55 400,5 600,30 C800,55 1000,5 1200,30 C1320,45 1380,25 1440,30 L1440,60 L0,60 Z" fill={fill} opacity="0.15" />
        <path d="M0,40 C180,20 360,50 540,35 C720,20 900,50 1080,38 C1260,25 1360,45 1440,40 L1440,60 L0,60 Z" fill={fill} opacity="0.25" />
      </svg>
    </div>
  );
}
