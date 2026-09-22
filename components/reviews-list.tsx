'use client'

import { useEffect, useRef } from 'react'

type Review = {
  quote: string
  author: string
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)')
    const syncOpenState = () => {
      const cards = gridRef.current?.querySelectorAll<HTMLDetailsElement>('.review-card')
      if (!cards) return
      if (mq.matches) {
        cards.forEach((card, index) => {
          card.open = index === 0
        })
      } else {
        cards.forEach((card) => {
          card.open = true
        })
      }
    }

    syncOpenState()
    mq.addEventListener('change', syncOpenState)
    return () => mq.removeEventListener('change', syncOpenState)
  }, [reviews])

  const handleToggle = (index: number, target: HTMLDetailsElement) => {
    if (!window.matchMedia('(max-width: 700px)').matches) return
    if (!target.open) return
    const cards = gridRef.current?.querySelectorAll<HTMLDetailsElement>('.review-card')
    cards?.forEach((card, i) => {
      if (i !== index) card.open = false
    })
  }

  return (
    <div className="review-grid" ref={gridRef}>
      {reviews.map((review, index) => (
        <details
          key={review.author}
          className="review-card"
          open={index === 0}
          onToggle={(e) => handleToggle(index, e.currentTarget)}
        >
          <summary className="review-card-summary">
            <span className="review-card-summary-top">
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span className="review-card-summary-author">{review.author}</span>
            </span>
            <p className="review-card-snippet">“{review.quote}”</p>
            <span className="review-card-chevron" aria-hidden="true" />
          </summary>
          <div className="review-card-body">
            <p className="review-quote">“{review.quote}”</p>
            <cite>— {review.author}</cite>
          </div>
        </details>
      ))}
    </div>
  )
}
