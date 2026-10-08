import './globals.css'

/** Pass-through — `<html>` dans `app/[locale]/layout.tsx` (ISR par locale). */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
