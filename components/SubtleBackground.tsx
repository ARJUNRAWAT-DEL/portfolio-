'use client';

export default function SubtleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top-left violet bloom */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      {/* Top-right subtle bloom */}
      <div
        className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }}
      />
      {/* Center violet glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[160px] opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
      />
      {/* Bottom-right bloom */}
      <div
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.09]"
        style={{ background: 'radial-gradient(circle, #6d28d9, transparent 70%)' }}
      />
      {/* Fine grain overlay via CSS */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
        }}
      />
    </div>
  );
}
