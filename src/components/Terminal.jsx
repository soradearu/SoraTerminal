import { useState, useRef, useEffect } from 'react'
import commands from '../commands/commands'

const themes = {
  green: {
    text: 'text-green-400',
    output: 'text-green-300',
    secondary: 'text-green-600',
    muted: 'text-green-700',
    border: 'border-green-500/20',
  },
  blue: {
    text: 'text-cyan-400',
    output: 'text-cyan-300',
    secondary: 'text-cyan-600',
    muted: 'text-cyan-700',
    border: 'border-cyan-500/20',
  },
  red: {
    text: 'text-red-400',
    output: 'text-red-300',
    secondary: 'text-red-600',
    muted: 'text-red-700',
    border: 'border-red-500/20',
  },
  amber: {
    text: 'text-amber-400',
    output: 'text-amber-300',
    secondary: 'text-amber-600',
    muted: 'text-amber-700',
    border: 'border-amber-500/20',
  },
  pink: {
    text: 'text-pink-400',
    output: 'text-pink-300',
    secondary: 'text-pink-600',
    muted: 'text-pink-700',
    border: 'border-pink-500/20',
  },
  white: {
    text: 'text-zinc-200',
    output: 'text-zinc-300',
    secondary: 'text-zinc-500',
    muted: 'text-zinc-700',
    border: 'border-zinc-500/20',
  },
}

export default function Terminal() {
  const [history, setHistory] = useState([
    {
      type: 'output',
      text: `
███████╗ ██████╗ ██████╗  █████╗
██╔════╝██╔═══██╗██╔══██╗██╔══██╗
███████╗██║   ██║██████╔╝███████║
╚════██║██║   ██║██╔══██╗██╔══██║
███████║╚██████╔╝██║  ██║██║  ██║
╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝

SoraOS initialized.
Type 'help' to begin.
      `,
    },
  ])

  const [input, setInput] = useState('')
  const [theme, setTheme] = useState('green')
  const [view, setView] = useState('terminal') // 👈 NEW: terminal | siem

  const currentTheme = themes[theme]

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // fake SIEM data
  const siemData = {
    alerts: [
      { id: 1, level: 'HIGH', msg: 'Multiple failed SSH logins detected', ip: '185.22.91.44' },
      { id: 2, level: 'MED', msg: 'Suspicious PowerShell execution', ip: '10.0.0.12' },
      { id: 3, level: 'LOW', msg: 'New device connected to network', ip: '192.168.1.34' },
    ],
    logs: [
      '[AUTH] user admin login success - 10.0.0.5',
      '[DNS] query suspicious-domain.xyz blocked',
      '[FIREWALL] inbound scan detected - 185.22.91.44',
      '[EDR] process injection attempt blocked',
    ],
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    // exit SIEM
    if (trimmed === 'exit' || trimmed === 'terminal') {
      setView('terminal')
      setInput('')
      return
    }

    // open SIEM dashboard
    if (trimmed === 'siem') {
      setView('siem')
      setInput('')
      return
    }

    if (trimmed === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    let output = 'Command not found. Type help.'

    if (commands[trimmed]) {
      output = commands[trimmed].output
    } else if (trimmed.startsWith('theme ')) {
      const selectedTheme = trimmed.split(' ')[1]

      if (themes[selectedTheme]) {
        setTheme(selectedTheme)
        output = `Theme changed to ${selectedTheme}`
      } else {
        output = 'Theme not found'
      }
    }

    setHistory((prev) => [
      ...prev,
      { type: 'command', text: trimmed },
      { type: 'output', text: output },
    ])

    setInput('')
  }

  return (
    <div className={`bg-black h-screen flex flex-col font-mono ${currentTheme.text}`}>

      {/* HEADER */}
      <div className={`border-b px-6 py-4 shrink-0 ${currentTheme.border}`}>
        <h1 className="text-xl tracking-widest font-bold">
          SORA TERMINAL
        </h1>
        <p className={`text-xs mt-1 ${currentTheme.muted}`}>
          interactive cybersecurity portfolio
        </p>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 overflow-y-auto p-6">

        {/* TERMINAL VIEW */}
        {view === 'terminal' && (
          <div className="max-w-5xl mx-auto">
            {history.map((item, index) => (
              <div key={index} className="whitespace-pre-wrap mb-4 leading-7">
                {item.type === 'command' ? (
                  <div>
                    <span className={currentTheme.secondary}>
                      guest@sora:~$
                    </span>{' '}
                    {item.text}
                  </div>
                ) : (
                  <div className={currentTheme.output}>
                    {item.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* SIEM DASHBOARD VIEW */}
        {view === 'siem' && (
          <div className="max-w-5xl mx-auto space-y-6">

            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h2 className="text-lg font-bold mb-2">SIEM DASHBOARD</h2>
              <p className={currentTheme.muted}>
                Real-time security telemetry simulation
              </p>
              <p className="mt-2 text-sm">
                Type <span className={currentTheme.secondary}>terminal</span> or <span className={currentTheme.secondary}>exit</span> to return
              </p>
            </div>

            {/* ALERTS */}
            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h3 className="font-bold mb-2">ALERTS</h3>
              {siemData.alerts.map((a) => (
                <div key={a.id} className="mb-2">
                  <span className="text-red-400">[{a.level}]</span> {a.msg}
                  <span className={`ml-2 ${currentTheme.muted}`}>({a.ip})</span>
                </div>
              ))}
            </div>

            {/* LOG STREAM */}
            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h3 className="font-bold mb-2">LOG STREAM</h3>
              {siemData.logs.map((l, i) => (
                <div key={i} className={`text-sm ${currentTheme.output}`}>
                  {l}
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* INPUT */}
      <form
        onSubmit={handleSubmit}
        className={`border-t p-4 shrink-0 ${currentTheme.border}`}
      >
        <div className="max-w-5xl mx-auto flex items-center">
          <span className={currentTheme.secondary}>
            guest@sora:~$
          </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className={`bg-transparent outline-none ml-3 flex-1 ${currentTheme.output}`}
          />
        </div>
      </form>
    </div>
  )
}