/** "Small details, big difference" tips panel beside the Add product form. */
const TIPS = [
  { title: 'Keep names clear', text: 'Help customers recognize your product at a glance.' },
  { title: 'Set the right stock', text: 'Accurate quantities keep your store running smoothly.' },
  { title: 'Choose a great image', text: 'Use a well-lit photo with a clean background.' },
]

export default function ProductTips() {
  return (
    <aside className="tips" aria-labelledby="tips-title">
      <p className="eyebrow">Small details, big difference</p>
      <h2 id="tips-title" className="tips__title">
        Make every product shine.
      </h2>
      <ol className="tips__list">
        {TIPS.map((tip, index) => (
          <li key={tip.title} className="tips__item">
            <h3>
              <span className="tips__num">{String(index + 1).padStart(2, '0')}</span>
              {tip.title}
            </h3>
            <p>{tip.text}</p>
          </li>
        ))}
      </ol>
    </aside>
  )
}
