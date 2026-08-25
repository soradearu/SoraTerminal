import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { logPageView } from './eventLogger'

export default function PageTracker() {
  const location = useLocation()

  useEffect(() => {
    logPageView(location.pathname)
  }, [location.pathname])

  return null
}