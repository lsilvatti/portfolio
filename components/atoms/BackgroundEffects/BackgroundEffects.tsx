export const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(var(--border) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(circle at 50% 50%, white, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, white, transparent 85%)',
          opacity: 0.4
        }}
      />

      <div className="absolute inset-0 overflow-hidden blur-2xl">
        <div 
          className="absolute -top-[10%] -left-[10%] w-192 h-192 rounded-full opacity-20 dark:opacity-30"
          style={{
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 50%)',
          }}
        />

        <div 
          className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full opacity-15 dark:opacity-25"
          style={{
            background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
          }}
        />
      </div>      
    </div>
  );
};