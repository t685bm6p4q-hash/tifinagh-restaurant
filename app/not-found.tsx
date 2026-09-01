import Link from 'next/link'
import { Header, Footer } from '@/components/site-shell'

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="page-intro not-found-page">
          <p className="eyebrow">Erreur 404</p>
          <h1>Page introuvable</h1>
          <p>
            Cette adresse n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil ou
            consultez notre carte et nos horaires.
          </p>
          <div className="local-actions not-found-actions">
            <Link className="button button-primary" href="/">
              Retour à l&apos;accueil
            </Link>
            <Link className="text-link" href="/carte">
              Voir la carte
            </Link>
            <Link className="text-link" href="/reservation">
              Réserver
            </Link>
            <Link className="text-link" href="/contact">
              Contact
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
