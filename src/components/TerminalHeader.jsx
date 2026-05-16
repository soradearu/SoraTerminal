export default function TerminalHeader() {
  return (
    <div className="border-b border-green-500/20 px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold tracking-widest">
          SORA TERMINAL
        </h1>

        <p className="text-xs text-green-800 mt-1">
          interactive cybersecurity portfolio
        </p>
      </div>

      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-green-700" />
        <div className="w-3 h-3 rounded-full bg-green-900" />
      </div>
    </div>
  )
}