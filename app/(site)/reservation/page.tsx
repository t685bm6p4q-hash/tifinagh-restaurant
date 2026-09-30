import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { ReservationHashScroll } from '@/components/reservation-hash-scroll'
import { ReservationWhatsAppForm } from '@/components/reservation-whatsapp-form'
import { RESERVATION_WHATSAPP_FORM_ID } from '@/lib/restaurant-data'
import { getI18n } from '@/lib/i18n'

export default async function Reservation() {
  const { dictionary, locale } = await getI18n()
  const p = dictionary.reservationPage
  const breadcrumbItems = [
    { name: dictionary.nav.home, path: '/' },
    { name: p.introTitle, path: '/reservation' },
  ]

  return (
    <>
      <Header />
      <MainContent className="reservation-page">
        <ReservationHashScroll />
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro
          className="page-intro--reservation"
          eyebrow={p.introEyebrow}
          title={p.introTitle}
          text={p.introText}
        />
        <section className="form-wrap section reservation-form-section">
          <BookingChannels title={p.channelsTitle} />
          <div id={RESERVATION_WHATSAPP_FORM_ID} className="reservation-whatsapp-form">
            <p className="reservation-whatsapp-form-lead">{p.whatsappHint}</p>
            <ReservationWhatsAppForm copy={p} locale={locale} />
          </div>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
