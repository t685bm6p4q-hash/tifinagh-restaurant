import { siteUrl } from '@/lib/seo'

/** OpenAPI minimal pour agents : préparation du lien WhatsApp (pas d’envoi serveur). */
export function buildAgentToolsOpenApi(): Record<string, unknown> {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Tifinagh Montmartre — actions agent',
      version: '1.0.0',
      description:
        'Outils côté client pour préparer une réservation. La réservation confirmée passe par uReserve ; WhatsApp nécessite l’envoi du message par l’utilisateur.',
    },
    servers: [{ url: siteUrl }],
    paths: {
      '/agent/prepare-whatsapp-reservation': {
        post: {
          operationId: 'prepareWhatsAppReservation',
          summary: 'Préparer un lien wa.me avec les champs de réservation',
          description:
            'Retourne une URL WhatsApp préremplie. Ne crée pas de réservation tant que le client n’envoie pas le message.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['nom', 'telephone', 'date', 'heure', 'personnes'],
                  properties: {
                    nom: { type: 'string' },
                    telephone: { type: 'string' },
                    date: { type: 'string', description: 'Date affichée (ex. libellé du select)' },
                    heure: { type: 'string' },
                    personnes: { type: 'string' },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'URL WhatsApp à ouvrir',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['whatsappUrl'],
                    properties: {
                      whatsappUrl: { type: 'string', format: 'uri' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/agent/online-booking-url': {
        get: {
          operationId: 'getOnlineBookingUrl',
          summary: 'URL uReserve (réservation en ligne confirmée)',
          parameters: [
            {
              name: 'lang',
              in: 'query',
              schema: { type: 'string', enum: ['fr', 'en', 'es', 'it', 'de', 'pt', 'ru', 'zh'] },
            },
          ],
          responses: {
            '200': {
              description: 'URL de réservation uReserve',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['bookingUrl'],
                    properties: { bookingUrl: { type: 'string', format: 'uri' } },
                  },
                },
              },
            },
          },
        },
      },
    },
  }
}
