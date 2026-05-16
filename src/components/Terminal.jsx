import { useState, useRef, useEffect } from 'react'

import commands from '../commands/commands'

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

    if (commands[trimmed]) {
      output = commands[trimmed].output
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
    <div className="bg-black text-pink-300 h-screen flex flex-col font-mono">
      
      {/* Header */}
      <div className="border-b border-pink-300/20 px-6 py-4 shrink-0">
        <h1 className="text-xl tracking-widest font-bold">
          SORA TERMINAL
        </h1>

        <p className="text-xs text-pink-300 mt-1">
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
                  <span className="text-pink-300">
                    guest@sora:~$
                  </span>{' '}
                  {item.text}
                </div>
              ) : (
                <div className="text-pink-300">
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
        className="border-t border-pink-300/20 p-4 shrink-0"
      >
        <div className="max-w-5xl mx-auto flex items-center">
          <span className="text-pink-300 shrink-0">
            guest@sora:~$
          </span>

          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            className="bg-transparent outline-none ml-3 flex-1 text-pink-300"
          />
        </div>
      </form>
    </div>
  )
}