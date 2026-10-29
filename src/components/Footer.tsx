import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, X } from 'lucide-react';
import {
  COMPANY_CONTACT,
  PRODUCTS_DATA,
  ProductItem,
} from '../data/siteData';
import { BrandLogoMark } from './AnimatedUI';

interface FooterProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectProduct,
  onOpenQuoteModal,
}) => {
  const [legalModalType, setLegalModalType] = useState<
    'privacy' | 'terms' | null
  >(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLegalModalType(null);
    };
    if (legalModalType) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [legalModalType]);

  return (
    <>
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-slate-800/80">
            {/* Col 1: Brand & Company Introduction (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <a
                href="#home"
                className="text-xl sm:text-2xl font-extrabold tracking-tight inline-flex items-center gap-3 group"
              >
                <div className="bg-white/95 p-1 rounded-md inline-flex items-center justify-center shadow-xs">
                  <BrandLogoMark className="w-12 h-8" />
                </div>
                <span className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">Chirag</span>
                  <span className="text-slate-100">Enterprises</span>
                </span>
              </a>

              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Industrial manufacturer of mechanical rebar couplers, cold-forged
                parallel thread splicing systems, headed anchors, and structural
                reinforcement hardware for civil infrastructure.
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href="#contact"
                  aria-label="LinkedIn Corporate Page"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono-tabular text-slate-300 hover:border-orange-500 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://wa.me/919971888588?text=Hello!%20We%20have%20an%20immediate%20requirement%20for%20couplers"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono-tabular text-slate-300 hover:border-orange-500 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="#resources"
                  aria-label="Technical Catalogues"
                  className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono-tabular text-slate-300 hover:border-orange-500 hover:text-white transition-colors"
                >
                  Catalogues
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-white font-semibold">
                Quick Links
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>
                  <a href="#home" className="hover:text-orange-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-orange-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#why-choose" className="hover:text-orange-400 transition-colors">
                    Why Choose Us
                  </a>
                </li>
                <li>
                  <a href="#manufacturing" className="hover:text-orange-400 transition-colors">
                    Manufacturing &amp; Quality
                  </a>
                </li>
                <li>
                  <a href="#certifications" className="hover:text-orange-400 transition-colors">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#resources" className="hover:text-orange-400 transition-colors">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-orange-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Product Categories (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-white font-semibold">
                Reinforcement Products
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {PRODUCTS_DATA.map((prod) => (
                  <li key={prod.id}>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(prod)}
                      className="text-left hover:text-orange-400 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>{prod.name}</span>
                      <span className="text-[11px] font-mono-tabular text-slate-600">
                        ({prod.code})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact Details (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-mono-tabular uppercase tracking-wider text-white font-semibold">
                Plant &amp; Sales Office
              </h3>
              <div className="space-y-3 text-sm text-slate-400">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-1" />
                  <div>
                    <span className="leading-relaxed block">
                      <a
                        href="https://maps.app.goo.gl/V5cP8bP9kY1dswK59?g_st=ac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors"
                      >
                        Gali No. 46, Chirag Enterprises, 33 Feet Rd, Block D, Sanjay Colony, Sector 23, Faridabad, Haryana 121005
                      </a>
                    </span>
                    <a
                      href="https://maps.app.goo.gl/V5cP8bP9kY1dswK59?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-orange-400 hover:underline mt-0.5 inline-block"
                    >
                      View on Google Maps ↗
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a
                    href="tel:+919971888588"
                    className="hover:text-orange-400 font-mono-tabular"
                  >
                    +91 99718 88588
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <a
                    href="mailto:chiragentfbd@gmail.com"
                    className="hover:text-orange-400"
                  >
                    chiragentfbd@gmail.com
                  </a>
                </div>
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono-tabular text-slate-300">
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                    BIS IS 16172 : 2023
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                    ISO 9001:2015
                  </span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenQuoteModal}
                    className="w-full py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Request Project Quote
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} {COMPANY_CONTACT.companyName}. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy / Terms Modal */}
      <AnimatePresence>
        {legalModalType && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLegalModalType(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between">
                <h3 className="text-base font-bold">
                  {legalModalType === 'privacy'
                    ? 'Privacy Policy'
                    : 'Terms and Conditions of Supply'}
                </h3>
                <button
                  type="button"
                  onClick={() => setLegalModalType(null)}
                  className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed max-h-[70vh] overflow-y-auto">
                {legalModalType === 'privacy' ? (
                  <>
                    <p>
                      <strong>1. Data Collection for Engineering Inquiries:</strong>{' '}
                      Contact information, project reinforcement schedules, and
                      company details submitted through our inquiry forms are
                      used solely to prepare technical proposals, bar splicing
                      quotations, and dispatch estimates.
                    </p>
                    <p>
                      <strong>2. Confidentiality of Structural Drawings:</strong>{' '}
                      Any structural drawings, bar bending schedules (BBS), or
                      project specifications shared with our engineering desk
                      are treated as strictly confidential client property.
                    </p>
                    <p>
                      <strong>3. Contact:</strong> To update or remove your
                      project inquiry records, contact{' '}
                      <span className="font-mono-tabular">
                        {COMPANY_CONTACT.email}
                      </span>
                      .
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>1. Technical Specifications &amp; Sizing:</strong>{' '}
                      All rebar coupler dimensions and thread parameters listed
                      on this website are nominal reference values. Final
                      selection must be verified by the project’s structural
                      engineer of record based on actual reinforcing bar mill
                      certificates and rib geometry.
                    </p>
                    <p>
                      <strong>2. Site Threading &amp; Installation:</strong>{' '}
                      Proper joint performance requires bar end preparation
                      using calibrated upsetting/threading machinery and
                      assembly to the specified wrench torque.
                    </p>
                    <p>
                      <strong>3. Batch Traceability:</strong> All production
                      shipments are accompanied by heat-number batch tags and
                      internal quality inspection records.
                    </p>
                  </>
                )}
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setLegalModalType(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
