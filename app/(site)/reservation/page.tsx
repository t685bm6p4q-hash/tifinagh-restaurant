import { PageBreadcrumbs } from '@/components/page-breadcrumbs'
import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { ReservationWhatsAppForm } from '@/components/reservation-whatsapp-form'
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
        <PageBreadcrumbs locale={locale} items={breadcrumbItems} />
        <PageIntro
          className="page-intro--reservation"
          eyebrow={p.introEyebrow}
          title={p.introTitle}
          text={p.introText}
        />
        <section className="form-wrap section reservation-form-section">
          <ReservationWhatsAppForm copy={p} locale={locale} />
          <div className="reservation-alt-channels">
            <BookingChannels title={p.channelsTitle} />
          </div>
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
