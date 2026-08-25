
import { useState, useRef, useEffect } from 'react'
{/* Live threat feed CVE */}


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

export default function ThreatFeed() 

{
 const [threatFeed, setThreatFeed] = useState([])
  const [threatOpen, setThreatOpen] = useState(false)
 const [activeApp, setActiveApp] = useState(null)
 const currentTheme = themes[theme]

  // fetch threat feed
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

return(

<div
  className={`
    z-10

    md:absolute
    md:top-24
    md:right-6
    md:w-96

    mb-6
  `}
>

  <div
    className={`border rounded-lg bg-black/90 backdrop-blur-sm ${currentTheme.border}`}
  >

    
   

    {/* Header */}

    <button
      onClick={() => setThreatOpen(!threatOpen)}
      className="w-full flex justify-between items-center p-4 md:cursor-default"
    >

      <h2 className="font-bold tracking-wider">
        LIVE THREATS
      </h2>

      {/* Hidden on desktop */}

      <span className="md:hidden">
        {threatOpen ? '▲' : '▼'}
      </span>

      {/* Desktop badge */}

      <span
        className={`hidden md:block text-xs ${currentTheme.secondary}`}
      >
        ACTIVE
      </span>

    </button>

    {/* Desktop = always open
        Mobile = collapsible */}

    <div
      className={`
        ${threatOpen ? 'block' : 'hidden'}
        md:block
      `}
    >

      {!threatFeed.length ? (

        <div className={`p-4 text-sm ${currentTheme.muted}`}>
          Loading threat feed...
        </div>

      ) : (

        <div className="space-y-3 max-h-96 overflow-y-auto p-4">

          {threatFeed.map((cve) => (

            <div
              key={cve.id}
              className={`border rounded p-3 ${currentTheme.border}`}
            >

              <div className="flex justify-between">

                <span className="font-bold text-sm">
                  {cve.id}
                </span>

                <span className="text-red-400 text-xs">
                  HIGH
                </span>

              </div>

              <p className="text-xs opacity-60 mt-2 line-clamp-4">
                {cve.summary}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>

</div>


)

}
