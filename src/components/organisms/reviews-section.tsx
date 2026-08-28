import { ReviewsList } from '@/components/reviews-list'
import { SectionHeading } from '../molecules/section-heading'
import type { Testimonial } from '@/lib/restaurant-data'

export function ReviewsSection({ reviews }: { reviews: Testimonial[] }) {
  return <section className="reviews section"><SectionHeading eyebrow="Le mot des habitués" title="Ce que nos clients disent de nous" /><ReviewsList reviews={reviews} /></section>
}
