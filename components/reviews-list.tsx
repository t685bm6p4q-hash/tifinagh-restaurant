'use client'

import { useState } from 'react'

type Review = {
  quote: string
  author: string
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="review-grid">
      {reviews.map((review) => {
        const isExpanded = expanded === review.author
        const isLong = review.quote.length > 170

        return (
          <blockquote key={review.author}>
            <div className="stars">★★★★★</div>
            <p className={isExpanded ? 'review-quote expanded' : 'review-quote'}>
              “{review.quote}”
            </p>
            {isLong && (
              <button
                type="button"
                className="review-more"
                onClick={() => setExpanded(isExpanded ? null : review.author)}
                aria-expanded={isExpanded}
              >
                {isExpanded ? 'Réduire' : 'Lire la suite'}
              </button>
            )}
            <cite>— {review.author}</cite>
          </blockquote>
        )
      })}
    </div>
  )
}
