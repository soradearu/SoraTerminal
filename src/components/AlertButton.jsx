import { useState } from 'react'

export default function AlertButton({ currentTheme }) {
  const [open, setOpen] = useState(false)

  const events = []

  return (
    <>
      {/* ALERT BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className={`
          border
          border-green-500/20
          ${currentTheme.border}
          bg-black/90
          ${currentTheme.text}
          backdrop-blur-sm
          rounded-lg
          px-4
          py-3
          text-sm
          font-mono
          text-green-400
          hover:bg-green-500/10
          transition
        `}
      >
        <span className={`flex items-center gap-2 ${currentTheme.muted}`}>
          ALERTS

          <span className={currentTheme.text}>
            [{events.length}]
          </span>
        </span>
      </button>

      {/* ALERT PANEL */}

      {open && (
        <div
          className={`
            fixed
            z-50
            top-24
            ${currentTheme.border}
            w-80
            max-w-[calc(100vw-2rem)]
            border
            border-green-500/20
            rounded-lg
            bg-black/95
            backdrop-blur-md
            shadow-2xl
          `}
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              px-4
              py-3
              border-b
            "
          >
            <div className="flex items-center gap-2">
              <span
                className={`font-bold tracking-wider ${currentTheme.muted}`}
              >
                ALERTS
              </span>
            </div>

            <button
              onClick={() => setOpen(false)}
              className={`${currentTheme.secondary} hover:${currentTheme.text}`}
            >
              ×
            </button>
          </div>

          {/* EVENTS */}

          {!events.length ? (
            <div
              className={`p-4 text-sm ${currentTheme.text}`}
            >
              NO EVENTS RECORDED.
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {events.map((event, index) => (
                <div
                  key={event.id ?? index}
                  className="
                    px-4
                    py-3
                    border-b
                    border-green-500/10
                  "
                >
                  <div className="flex justify-between">
                    <span
                      className={`text-sm font-bold ${currentTheme.text}`}
                    >
                      Classification: {event.classification ?? 'UNKNOWN'}
                    </span>

                    <span
                      className={`${currentTheme.text} text-xs`}
                    >
                      {event.score ?? 0}
                    </span>
                  </div>

                  <div
                    className={`${currentTheme.text} text-xs mt-1`}
                  >
                    Path: {event.path}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}