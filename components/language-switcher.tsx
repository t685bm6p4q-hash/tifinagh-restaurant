import { setLocaleAction } from '@/lib/i18n/actions'
import { localeMeta, locales, type Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/types'

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="lang-switcher-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LanguageSwitcher({
  locale,
  dictionary,
}: {
  locale: Locale
  dictionary: Dictionary
}) {
  const current = localeMeta[locale]

  return (
    <details className="lang-switcher">
      <summary className="lang-switcher-trigger" aria-label={dictionary.nav.chooseLanguage}>
        <GlobeIcon />
        <span className="lang-switcher-code">{current.short}</span>
        <ChevronIcon />
      </summary>
      <div className="lang-switcher-menu" role="listbox" aria-label={dictionary.nav.language}>
        {locales.map((code) => {
          const meta = localeMeta[code]
          const active = code === locale
          return (
            <form action={setLocaleAction} key={code}>
              <input type="hidden" name="locale" value={code} />
              <button
                type="submit"
                className={active ? 'lang-option is-active' : 'lang-option'}
                lang={meta.htmlLang}
                aria-current={active ? 'true' : undefined}
                disabled={active}
              >
                <span className="lang-option-code">{meta.short}</span>
                <span className="lang-option-name">{meta.nativeLabel}</span>
              </button>
            </form>
          )
        })}
      </div>
    </details>
  )
}
