export default function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-md py-4 sm:py-6 text-center text-gray-400 border-t border-cyan-400/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <p className="text-sm sm:text-base">© {new Date().getFullYear()} Arjun Rawat. All rights reserved. ✨</p>
      </div>
    </footer>
  );
}
