export default function TerminalHeader() {
  return (
    <div className="border-b border-pink-300/20 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold tracking-widest">
          SORA TERMINAL
        </h1>

        <p className="text-xs text-pink-300 mt-1">
          interactive cybersecurity portfolio
        </p>
      </div>

      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-pink-300 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-pink-300" />
        <div className="w-3 h-3 rounded-full bg-pink-300" />
      </div>
    </div>
  )
}