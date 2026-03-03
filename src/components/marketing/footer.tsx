import Link from 'next/link'
import { Heart } from 'lucide-react'

export function MarketingFooter() {
  return (
    <footer className="bg-linen border-t border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-rose fill-rose" />
              <span className="font-serif text-lg font-semibold">Altijd Samen</span>
            </div>
            <p className="text-sm text-warm-gray leading-relaxed">
              De mooiste trouwwebsites van Nederland. Ontwerp, deel en vier jullie liefde.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-warm-black">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#templates" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Templates</Link></li>
              <li><Link href="/#features" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Functies</Link></li>
              <li><Link href="/pricing" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Prijzen</Link></li>
              <li><Link href="/examples" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Voorbeelden</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-warm-black">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/#faq" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Veelgestelde vragen</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif text-sm font-semibold mb-4 text-warm-black">Juridisch</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Privacybeleid</Link></li>
              <li><Link href="/terms" className="text-sm text-warm-gray hover:text-warm-black transition-colors">Algemene voorwaarden</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sand mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-muted">
            © {new Date().getFullYear()} Altijd Samen. Met liefde gemaakt in Nederland.
          </p>
          <p className="text-xs text-warm-muted flex items-center gap-1">
            Gemaakt met <Heart className="w-3 h-3 text-rose fill-rose" /> voor koppels
          </p>
        </div>
      </div>
    </footer>
  )
}
