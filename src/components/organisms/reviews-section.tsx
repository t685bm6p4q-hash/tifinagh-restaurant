'use client'

import { ReviewsList } from '@/components/reviews-list'
import {
  GoogleReviewsBadge,
  PagesJaunesReviewsBadge,
} from '@/components/booking-channels'
import { SectionHeading } from '../molecules/section-heading'
import { useSiteDictionary } from '@/lib/i18n/site-locale'
import type { Testimonial } from '@/lib/restaurant-data'

export function ReviewsSection({ reviews }: { reviews: Testimonial[] }) {
  const dictionary = useSiteDictionary()

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
