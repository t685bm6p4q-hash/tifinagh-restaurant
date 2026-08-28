'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { navItems, whatsappLink } from '@/lib/restaurant-data'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <Link href="/" className="brand" onClick={() => setOpen(false)}>
        <Image
          className="brand-logo"
          src="/images/logo-tifinagh-detoure.png"
          alt="Logo Tifinagh"
          width={92}
          height={92}
          priority
        />
        <span>TIFINAGH</span>
      </Link>

      <nav className={open ? 'main-nav open' : 'main-nav'}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="nav-cta" href="/reservation" onClick={() => setOpen(false)}>
          <MessageCircle size={14} />
          Réserver
        </Link>
      </nav>

      <button
        className="menu-toggle"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            Tifinagh Montmartre
          </Link>
          <p>
            <MapPin size={14} />
            17 Av. Rachel, 75018 Paris
          </p>
          <p>
            <Phone size={14} />
            01 42 94 22 40
          </p>
        </div>

        <div>
          <h4>Horaires d&apos;ouverture</h4>
          <span className="opening-days">Du lundi au dimanche</span>
          <span className="opening-hours">10h – 00h</span>
        </div>

        <div>
          <h4>Nous suivre</h4>
          <div className="social-links">
            <a
              href="https://instagram.com/tifinagh_restaurant"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Tifinagh"
            >
              <span className="instagram-mark" aria-hidden="true">◎</span>
            </a>
            <a
              href="https://facebook.com/profile.php?id=100068081029708"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Tifinagh"
            >
              <span className="facebook-mark" aria-hidden="true">f</span>
            </a>
          </div>
          <Link href={whatsappLink()} className="footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <MessageCircle size={14} />
            Réserver sur WhatsApp
          </Link>
          <Link href="/mentions-legales" className="footer-link">
            Mentions légales
          </Link>
        </div>
      </div>

      <div className="copyright">
        © 2026 Tifinagh Montmartre. Bistro chic &amp; cuisine authentique.
      </div>
    </footer>
  )
}

export function PageIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}
