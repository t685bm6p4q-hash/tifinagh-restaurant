import { Header, Footer, PageIntro } from '@/components/site-shell'
import { BookingChannels } from '@/components/booking-channels'
import { ReservationWhatsAppForm } from '@/components/reservation-whatsapp-form'

export default function Reservation() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Votre table"
          title="Réserver"
          text="Choisissez votre canal : appel, Google Reserve, ou formulaire WhatsApp."
        />
        <section className="form-wrap section">
          <BookingChannels title="Les plus rapides" />
          <p className="optional" style={{ margin: '28px 0 12px', display: 'block', textAlign: 'center' }}>
            Ou précisez votre demande ci-dessous (WhatsApp)
          </p>
          <ReservationWhatsAppForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
