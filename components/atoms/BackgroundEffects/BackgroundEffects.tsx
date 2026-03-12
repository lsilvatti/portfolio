export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="bg-dither" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feComponentTransfer in="grayNoise" result="scaledNoise">
              <feFuncA type="linear" slope="0.10" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="scaledNoise" mode="soft-light" />
          </filter>
        </defs>
      </svg>

      <div 
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23888888' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at 30% 30%, white, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at 30% 30%, white, transparent 90%)'
        }}
      />

      <div className="opacity-[0.3]">
          <div
            className="absolute inset-0"
            style={{
              filter: 'url(#bg-dither)',
              background: [
                'radial-gradient(circle at 20% 15%, var(--primary) 0%, color-mix(in oklch, var(--primary) 60%, transparent) 8%, color-mix(in oklch, var(--primary) 30%, transparent) 18%, color-mix(in oklch, var(--primary) 10%, transparent) 28%, transparent 40%)',
                'radial-gradient(circle at 100% 85%, var(--secondary) 0%, color-mix(in oklch, var(--secondary) 60%, transparent) 8%, color-mix(in oklch, var(--secondary) 30%, transparent) 18%, color-mix(in oklch, var(--secondary) 10%, transparent) 28%, transparent 40%)',
              ].join(', '),
              opacity: 0.4,
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '256px 256px',
              mixBlendMode: 'overlay',
            }}
          />
        </div>
    </div>
  );
};