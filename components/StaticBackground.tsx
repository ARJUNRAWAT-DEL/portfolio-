export default function StaticBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-black" />
      {/* Static stars - no JavaScript */}
      <div className="absolute inset-0">
        {/* Create static stars using CSS */}
        <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-[15%] left-[45%] w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-[25%] left-[80%] w-2 h-2 bg-white rounded-full opacity-90" />
        <div className="absolute top-[30%] left-[10%] w-1 h-1 bg-white rounded-full opacity-70" />
        <div className="absolute top-[40%] left-[60%] w-1 h-1 bg-white rounded-full opacity-85" />
        <div className="absolute top-[50%] left-[30%] w-2 h-2 bg-white rounded-full opacity-75" />
        <div className="absolute top-[60%] left-[75%] w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-[70%] left-[15%] w-1 h-1 bg-white rounded-full opacity-90" />
        <div className="absolute top-[75%] left-[90%] w-1 h-1 bg-white rounded-full opacity-60" />
        <div className="absolute top-[85%] left-[55%] w-2 h-2 bg-white rounded-full opacity-70" />
        <div className="absolute top-[5%] left-[70%] w-1 h-1 bg-white rounded-full opacity-85" />
        <div className="absolute top-[35%] left-[25%] w-1 h-1 bg-white rounded-full opacity-75" />
        <div className="absolute top-[65%] left-[85%] w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-[90%] left-[40%] w-1 h-1 bg-white rounded-full opacity-90" />
        <div className="absolute top-[20%] left-[65%] w-1 h-1 bg-white rounded-full opacity-65" />
      </div>
    </div>
  );
}