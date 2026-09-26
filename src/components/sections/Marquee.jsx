const words = ['Tradition', 'Reimagined', 'Fire-Kissed', 'Slow-Cooked', 'Stone-Ground', 'Candle-Lit']

export default function Marquee() {
  const row = [0, 1, 2, 3, 4, 5, 6, 7]
  return (
    <div
      className="relative overflow-hidden border-y border-gold-500/20 bg-noir-950 py-6"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {row.map((r) => (
          <div key={r} className="flex items-center">
            {words.map((w) => (
              <span key={`${r}-${w}`} className="flex items-center">
                <span className="px-6 font-display text-2xl text-ivory-100/80 italic sm:px-10 sm:text-3xl">
                  {w}
                </span>
                <span className="size-1.5 rounded-full bg-gold-500/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}