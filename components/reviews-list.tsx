type Review = {
  quote: string
  author: string
}

export function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className="review-grid">
      {reviews.map((review) => (
        <blockquote key={review.author}>
          <div className="stars">★★★★★</div>
          <p className="review-quote">“{review.quote}”</p>
          <cite>— {review.author}</cite>
        </blockquote>
      ))}
    </div>
  )
}
