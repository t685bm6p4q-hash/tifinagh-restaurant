window.dataLayer = window.dataLayer || []
function gtag() {
  window.dataLayer.push(arguments)
}
window.gtag = gtag
gtag('js', new Date())
const measurementId = document.currentScript?.getAttribute('data-measurement-id')
if (measurementId) {
  gtag('config', measurementId, {
    send_page_view: false,
    anonymize_ip: true,
  })
}
