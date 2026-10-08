import Link from 'next/link'
import { MainContent } from '@/components/site-shell'
import { getI18n } from '@/lib/i18n'
import { getNotFoundCopy } from '@/lib/i18n/not-found-copy'

/**
 * Volontairement sans Header ni Footer : la frontière not-found racine est sérialisée
 * dans le payload RSC de chaque page, son poids s'ajoute donc à tout le site.
 */
export default async function NotFound() {
  const { locale } = await getI18n()
  const copy = getNotFoundCopy(locale)

  return (
    <MainContent>
      <section className="page-intro not-found-page">
        <Link href="/" className="brand" prefetch={false}>
          <img
            className="brand-logo"
            src="/images/logo-tifinagh-detoure.webp"
            alt=""
            width={52}
            height={52}
            decoding="async"
          />
          <span>TIFINAGH</span>
        </Link>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
        <div className="local-actions not-found-actions">
          <Link className="button button-primary" href="/">
            {copy.home}
          </Link>
          <Link className="text-link" href="/carte">
            {copy.carte}
          </Link>
          <Link className="text-link" href="/carte/boissons">
            {copy.drinks}
          </Link>
          <Link className="text-link" href="/reservation">
            {copy.reserve}
          </Link>
          <Link className="text-link" href="/contact">
            {copy.contact}
          </Link>
        </div>
      </section>
    </MainContent>
  )
}
