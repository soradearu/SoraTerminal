import { useState, useEffect, useRef } from 'react'

export default function CommandInput({ commands, onCommand }) {
  const [input, setInput] = useState('')
  const [suggestion, setSuggestion] = useState('')

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const matched = commands.find((cmd) =>
      cmd.startsWith(input.toLowerCase())
    )

    setSuggestion(matched || '')
  }, [input])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!input.trim()) return

    onCommand(input)

    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab' && suggestion) {
      e.preventDefault()
      setInput(suggestion)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <span className="text-pink-300">guest@sora:~$</span>

      <div className="relative flex-1 ml-3">
        {suggestion && input !== suggestion && (
          <span className="absolute text-pink-300 pointer-events-none">
            {suggestion}
          </span>
        )}

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          className="bg-transparent outline-none w-full relative z-10"
        />
      </div>
    </form>
  )
}