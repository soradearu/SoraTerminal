import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageTracker from './siem/PageTracker'
import Home from './pages/Home'
import ArticlePage from './pages/ArticlePage'
import NotFound from './pages/NotFound'
import Terminal from './components/Terminal'



function App() {
  return (
    <>
      <PageTracker />

      <Routes>

        <Route
          path="/"
          element={<Terminal />}
        />

        <Route
          path="/article/:slug"
          element={<ArticlePage />}
        />

      </Routes>
    </>
  )
}

export default App