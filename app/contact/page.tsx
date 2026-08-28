import Link from 'next/link'
import { ArrowRight, Clock, MapPin, Phone } from 'lucide-react'
import { Header, Footer, PageIntro } from '@/components/site-shell'

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <PageIntro
          eyebrow="Nous trouver"
          title="Contact"
          text="Au cœur des Abbesses, à quelques pas du Sacré-Cœur."
        />

        <section className="contact-grid section">
          <div className="contact-card">
            <MapPin size={22} />
            <h2>Adresse</h2>
            <p>17 Av. Rachel<br />75018 Paris</p>
            <Link
              className="text-link"
              href="https://maps.google.com/?q=17+Av.+Rachel+75018+Paris"
              target="_blank"
              rel="noreferrer"
            >
              Voir l&apos;itinéraire <ArrowRight size={12} />
            </Link>
          </div>

          <div className="contact-card">
            <Phone size={22} />
            <h2>Téléphone</h2>
            <p>01 42 94 22 40</p>
            <p>Réponse du lundi au dimanche</p>
          </div>

          <div className="contact-card">
            <Clock size={22} />
            <h2>Horaires</h2>
            <p>
              Lundi – Jeudi<br />19h – 23h30<br /><br />
              Vendredi – Samedi<br />19h – 00h<br /><br />
              Dimanche<br />12h – 15h / 19h – 23h
            </p>
          </div>

          <div className="contact-card contact-transit">
            <MapPin size={22} />
            <h2>Stations de métro à proximité</h2>
            <p>
              Place de Clichy (lignes 2 et 13) : à quelques minutes à pied.&ensp;
              Blanche (ligne 2) : très proche, au pied de Montmartre.&ensp;
              Pigalle (lignes 2 et 12) : à deux pas.&ensp;
              La Fourche (ligne 13) : également très accessible.&ensp;
              Abbesses (ligne 12) : à proximité en grimpant vers le cœur de Montmartre.
            </p>
          </div>
        </section>

        <section className="map-section section">
          <div>
            <p className="eyebrow">Le quartier</p>
            <h2>Nous trouver à Montmartre</h2>
            <p>À deux pas de Pigalle et du Cimetière de Montmartre.</p>
          </div>
          <iframe
            className="map-frame"
            title="Localisation de Tifinagh Montmartre"
            src="https://www.google.com/maps?q=17+Av.+Rachel,+75018+Paris&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </main>
      <Footer />
    </>
  )
}
