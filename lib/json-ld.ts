/** Sérialise un objet JSON-LD pour `<script>` : `<` échappé pour qu'aucune valeur ne ferme la balise. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}
