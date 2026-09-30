'use client'

import { useEffect, useState } from 'react'

type Review = {
  quote: string
  author: string
}

const MOBILE_REVIEWS_MQ = '(max-width: 700px)'

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [openIndex, setOpenIndex] = useState(-1)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_REVIEWS_MQ)
    const onChange = () => {
      if (mq.matches) setOpenIndex(-1)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const handleToggle = (index: number, target: HTMLDetailsElement) => {
    if (!window.matchMedia(MOBILE_REVIEWS_MQ).matches) return
    setOpenIndex(target.open ? index : -1)
  }

  return (
    <div className="review-grid">
      {reviews.map((review, index) => (
        <details
          key={review.author}
          className="review-card"
          open={openIndex === index}
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
