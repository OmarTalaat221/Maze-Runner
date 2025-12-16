import { memo } from "react";

/**
 * Layout رئيسي مع تصميم محسن
 */
const GameLayout = memo(function GameLayout({ children, title }) {
  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-4 select-none z-10">
      {/* العنوان */}
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-wider drop-shadow-lg">
          {title}
        </h1>
        <p className="text-center text-gray-400 mt-2 text-sm">
          ساعد القط الصغير للوصول إلى النجمة ⭐
        </p>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex items-center justify-center w-full max-w-4xl">
        {children}
      </main>

      {/* تعليمات */}
      <footer className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">↑</kbd>
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">↓</kbd>
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-slate-800 rounded text-xs">→</kbd>
          </div>
        </div>
        <p className="text-gray-500 text-xs">للتحرك في المتاهة</p>
      </footer>
    </div>
  );
});

export default GameLayout;
