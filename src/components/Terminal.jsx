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
function BinaryRain() {
  const columns = Array.from({ length: 20 })

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">

      {columns.map((_, i) => (
        <div
          key={i}
          className="absolute top-0 text-cyan-300 drop-shadow-[0_0_8px_#22d3ee] text-3xl font-bold animate-rain"
          // fontSize: `${30 + Math.random() * 50}px` math random size to use
          style={{
            left: `${i * 5}%`,
            animationDuration: `${8 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            filter: 'blur(0.5px)',
          }}
        >
          {Array.from({ length: 30 }).map((_, j) => (
            <div key={j} className="leading-[1.2]">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      ))}

    </div>
  )
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
  const [view, setView] = useState('terminal')
  const [activeApp, setActiveApp] = useState(null)
  const [threatFeed, setThreatFeed] = useState([])

  const currentTheme = themes[theme]

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // FETCH THREAT FEED
useEffect(() => {

  const fetchThreats = () => {

    // random page offset
    const randomIndex = Math.floor(Math.random() * 2000)

    fetch(
      `https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=5&startIndex=${randomIndex}`
    )
      .then((res) => {
        console.log('STATUS:', res.status)
        return res.json()
      })
      .then((data) => {

        const vulns = data?.vulnerabilities ?? []

        const normalized = vulns.map((v) => ({
          id: v?.cve?.id ?? 'NO-ID',

          summary:
            v?.cve?.descriptions?.find(
              (d) => d.lang === 'en'
            )?.value ?? 'NO-SUMMARY',
        }))

        console.log('NEW RANDOM FEED:', normalized)

        setThreatFeed(normalized)
      })
      .catch((err) => {
        console.log('FETCH FAILED:', err)
      })
  }

  // initial fetch
  fetchThreats()

  // refresh every 30 sec
  const interval = setInterval(fetchThreats, 30000)

  return () => clearInterval(interval)

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

    // switch views
    if (trimmed === 'siem') {
      setView('siem')
      setActiveApp(null)
      setInput('')
      return
    }

    if (trimmed === 'terminal' || trimmed === 'exit') {
      setView('terminal')
      setActiveApp(null)
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
    
    <div className={`bg-black h-screen flex flex-col font-mono relative overflow-hidden ${currentTheme.text}`}>

{/* ANIMATED BACKGROUND */}
  <BinaryRain />

  {/* rest of app */}


      {/* HEADER */}
      <div className={`border-b px-6 py-4 shrink-0 ${currentTheme.border}`}>
        <h1 className="text-xl tracking-widest font-bold">SORA TERMINAL</h1>
        <p className={`text-xs mt-1 ${currentTheme.muted}`}>
          interactive cybersecurity portfolio
        </p>
      </div>

      {/* MAIN */}
      <div className="flex-1 overflow-y-auto p-6">
{/* LIVE THREAT FEED */}
<div className="absolute top-24 right-6 w-96 z-10">

  <div className={`border rounded-lg p-4 bg-black/90 backdrop-blur-sm ${currentTheme.border}`}>

    <div className="flex items-center justify-between mb-4">
      <h2 className="font-bold tracking-wider">
        LIVE THREATS
      </h2>

      <span className={`text-xs ${currentTheme.secondary}`}>
        ACTIVE
      </span>
    </div>

    {!threatFeed || threatFeed.length === 0 ? (
      <div className={`text-sm ${currentTheme.muted}`}>
        Loading threat feed...
      </div>
    ) : (
      <div className="space-y-3 max-h-[500px] overflow-y-auto">

        {threatFeed.map((cve, i) => (
          <div
            key={cve.id || i}
            className={`border rounded p-3 ${currentTheme.border}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">
                {cve?.id || 'UNKNOWN'}
              </span>

              <span className="text-red-400 text-xs">
                HIGH
              </span>
            </div>

            <p className="text-xs opacity-20 mt-2 line-clamp-4">
              {cve?.summary || 'No description'}
            </p>
          </div>
        ))}

      </div>
    )}
  </div>
</div>
        {/* TERMINAL */}
        {view === 'terminal' && (
          <div className="max-w-5xl mx-auto">
            {history.map((item, i) => (
              <div key={i} className="whitespace-pre-wrap mb-4 leading-7">
                {item.type === 'command' ? (
                  <div>
                    <span className={currentTheme.secondary}>guest@sora:~$</span>{' '}
                    {item.text}
                  </div>
                ) : (
                  <div className={currentTheme.output}>{item.text}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* SIEM */}
        {view === 'siem' && (
          <div className="max-w-5xl mx-auto space-y-6">

            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h2 className="text-lg font-bold">SIEM DASHBOARD</h2>
              <p className={currentTheme.muted}>Real-time security telemetry simulation</p>
            </div>

            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h3 className="font-bold mb-2">ALERTS</h3>
              {siemData.alerts.map((a) => (
                <div key={a.id} className="mb-2">
                  <span className="text-red-400">[{a.level}]</span> {a.msg}
                  <span className={`ml-2 ${currentTheme.muted}`}>({a.ip})</span>
                </div>
              ))}
            </div>

            <div className={`border p-4 rounded ${currentTheme.border}`}>
              <h3 className="font-bold mb-2">LOG STREAM</h3>
              {siemData.logs.map((l, i) => (
                <div key={i} className={currentTheme.output}>
                  {l}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* THREATS */}
        {activeApp === 'threats' && (
  <div className={`border-t p-6 ${currentTheme.border}`}>
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Threat Feed</h2>

        <button
          onClick={() => setActiveApp(null)}
          className={currentTheme.secondary}
        >
          close
        </button>
      </div>

      {/* EMPTY STATE */}
      {!threatFeed || threatFeed.length === 0 ? (
        <div className={`${currentTheme.muted} text-sm`}>
          No threat data loaded. (Either API failed or is still loading)
        </div>
      ) : (
        <div className="space-y-4">

          {threatFeed.map((cve, i) => (
            <div
              key={cve.id || i}
              className={`border p-4 rounded ${currentTheme.border}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold">
                  {cve?.id || 'UNKNOWN ID'}
                </h3>

                <span className={`text-xs ${currentTheme.secondary}`}>
                  #{i + 1}
                </span>
              </div>

              <p className="text-sm opacity-80 mt-2">
                {cve?.summary || 'No description available'}
              </p>
            </div>
          ))}

        </div>
      )}

    
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
          <span className={currentTheme.secondary}>guest@sora:~$</span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`bg-transparent outline-none ml-3 flex-1 ${currentTheme.output}`}
            spellCheck={false}
          />
        </div>
      </form>
    </div>
  )
}