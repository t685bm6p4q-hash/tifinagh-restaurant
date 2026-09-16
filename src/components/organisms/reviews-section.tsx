import { ReviewsList } from '@/components/reviews-list'
import {
  GoogleReviewsBadge,
  PagesJaunesReviewsBadge,
} from '@/components/booking-channels'
import { SectionHeading } from '../molecules/section-heading'
import { getI18n } from '@/lib/i18n'
import type { Testimonial } from '@/lib/restaurant-data'

export async function ReviewsSection({ reviews }: { reviews: Testimonial[] }) {
  const { dictionary } = await getI18n()

  return (
    <section className="reviews section">
      <SectionHeading
        eyebrow={dictionary.home.reviewsEyebrow}
        title={dictionary.home.reviewsTitle}
      />
      <div className="reviews-google-wrap">
        <GoogleReviewsBadge />
        <PagesJaunesReviewsBadge />
      </div>
      <ReviewsList reviews={reviews} />
    </section>
  )
}
