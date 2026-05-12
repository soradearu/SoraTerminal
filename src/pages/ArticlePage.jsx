import { useParams } from 'react-router-dom'

export default function ArticlePage() {
  const { slug } = useParams()

  return (
    <div className="bg-black min-h-screen text-green-400 p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {slug}
        </h1>

        <div className="text-zinc-300 leading-8">
          Markdown article content goes here.
        </div>
      </div>
    </div>
  )
}