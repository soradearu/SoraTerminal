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
const currentTheme = themes[theme]

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [history])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

const handleSubmit = (e) => {
  e.preventDefault()

  const trimmed = input.trim().toLowerCase()

  if (!trimmed) return

  if (trimmed === 'clear') {
    setHistory([])
    setInput('')
    return
  }

  let output = 'Command not found. Type help.'

  // Normal commands
  if (commands[trimmed]) {
    output = commands[trimmed].output
  }

  // Theme command
  else if (trimmed.startsWith('theme ')) {

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
    {
      type: 'command',
      text: trimmed,
    },
    {
      type: 'output',
      text: output,
    },
  ])

  setInput('')
}

  return (
   <div className={`bg-black h-screen flex flex-col font-mono ${currentTheme.text}`}>
      
      {/* Header */}
      <div className={`border-b px-6 py-4 shrink-0 ${currentTheme.border}`}>
        <h1 className="text-xl tracking-widest font-bold">
          SORA TERMINAL
        </h1>

       <p className={`text-xs mt-1 ${currentTheme.muted}`}>
          interactive cybersecurity portfolio
        </p>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className="whitespace-pre-wrap mb-4 leading-7"
            >
              {item.type === 'command' ? (
                <div>
                  <span className="${currentTheme.secondary}">
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
      </div>

      {/* Fixed Input Bottom */}
      <form
        onSubmit={handleSubmit}
       className={`border-t p-4 shrink-0 ${currentTheme.border}`}
      >
        <div className="max-w-5xl mx-auto flex items-center">
          <span className="${currentTheme.secondary} shrink-0">
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