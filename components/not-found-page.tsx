import { LocalizedLink } from '@/components/localized-link'
import { MainContent } from '@/components/site-shell'
import { getI18n } from '@/lib/i18n'
import { getNotFoundCopy } from '@/lib/i18n/not-found-copy'

/**
 * Volontairement sans Header ni Footer : le not-found est sérialisé dans le payload RSC,
 * son poids s'ajoute donc à tout le site.
 */
export async function NotFoundPage() {
  const { locale } = getI18n()
  const copy = getNotFoundCopy(locale)

  return (
    <MainContent>
      <section className="page-intro not-found-page">
        <LocalizedLink href="/" locale={locale} className="brand" prefetch={false}>
          {/* eslint-disable-next-line @next/next/no-img-element -- 404 léger, pas de next/image */}
          <img
            className="brand-logo"
            src="/images/logo-tifinagh-detoure.webp"
            alt=""
            width={52}
            height={52}
            decoding="async"
          />
          <span>TIFINAGH</span>
        </LocalizedLink>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
        <div className="local-actions not-found-actions">
          <LocalizedLink className="button button-primary" href="/" locale={locale}>
            {copy.home}
          </LocalizedLink>
          <LocalizedLink className="text-link" href="/carte" locale={locale}>
            {copy.carte}
          </LocalizedLink>
          <LocalizedLink className="text-link" href="/carte/boissons" locale={locale}>
            {copy.drinks}
          </LocalizedLink>
          <LocalizedLink className="text-link" href="/reservation" locale={locale}>
            {copy.reserve}
          </LocalizedLink>
          <LocalizedLink className="text-link" href="/contact" locale={locale}>
            {copy.contact}
          </LocalizedLink>
        </div>
      </section>
    </MainContent>
  )
}
