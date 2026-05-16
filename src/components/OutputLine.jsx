export default function OutputLine({ item }) {
  if (item.type === 'command') {
    return (
      <div>
        <span className="text-pink-300">guest@sora:~$</span>{' '}
        <span>{item.text}</span>
      </div>
    )
  }

  return (
    <div className="whitespace-pre-wrap leading-7 text-pink-300">
      {item.text}
    </div>
  )
}