import { Header, Footer, PageIntro, MainContent } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { ReservationWhatsAppForm } from '@/components/reservation-whatsapp-form'
import { getI18n } from '@/lib/i18n'

export default async function Reservation() {
  const { dictionary, locale } = await getI18n()
  const p = dictionary.reservationPage

  return (
    <>
      <Header />
      <MainContent>
        <PageIntro eyebrow={p.introEyebrow} title={p.introTitle} text={p.introText} />
        <section className="form-wrap section">
          <BookingChannels title={p.channelsTitle} />
          <p className="optional" style={{ margin: '28px 0 12px', display: 'block', textAlign: 'center' }}>
            {p.whatsappHint}
          </p>
          <ReservationWhatsAppForm copy={p} locale={locale} />
        </section>
      </MainContent>
      <Footer />
    </>
  )
}
