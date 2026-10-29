import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Wrench,
} from 'lucide-react';
import {
  COMPANY_CONTACT,
  PRODUCTS_DATA,
  ProductItem,
} from '../data/siteData';
import { BrandLogoMark } from './AnimatedUI';

interface NavbarProps {
  onSelectProduct: (product: ProductItem) => void;
  onOpenQuoteModal: (defaultProduct?: string) => void;
}

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products', hasDropdown: true },
  { label: 'Manufacturing & Quality', href: '#manufacturing' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact Us', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onSelectProduct,
  onOpenQuoteModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsExpanded, setIsMobileProductsExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductsDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProductsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (Single clean wordmark element) */}
          <a
            href="#home"
            className="font-extrabold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-3 sm:gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 group"
          >
            <BrandLogoMark className="w-13 h-9 sm:w-16 sm:h-11 transition-transform group-hover:scale-105" />
            <span className="text-xl sm:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight flex items-center gap-2">
              <span className="text-[#00539D] tracking-tight">Chirag</span>
              <span className="text-[#454E52] tracking-tight">Enterprises</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links with Fast Staggered Fade-In & Underline Hover */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-700"
          >
            {NAV_ITEMS.map((item, index) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => setIsProductsDropdownOpen(true)}
                    onMouseLeave={() => setIsProductsDropdownOpen(false)}
                  >
                    <motion.div
                      initial={
                        prefersReducedMotion ? false : { opacity: 0, y: -6 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.18,
                        delay: index * 0.02,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setIsProductsDropdownOpen((prev) => !prev)
                        }
                        aria-expanded={isProductsDropdownOpen}
                        aria-haspopup="true"
                        className="group relative py-2 inline-flex items-center gap-1 text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${
                            isProductsDropdownOpen ? 'rotate-180 text-orange-600' : ''
                          }`}
                        />
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" />
                      </button>
                    </motion.div>

                    {/* Products Dropdown Menu with Fast Fade-in & Scale-up */}
                    <AnimatePresence>
                      {isProductsDropdownOpen && (
                        <motion.div
                          initial={
                            prefersReducedMotion
                              ? { opacity: 1 }
                              : { opacity: 0, scale: 0.98, y: 4 }
                          }
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={
                            prefersReducedMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 0.98, y: 4 }
                          }
                          transition={{
                            duration: 0.12,
                          }}
                          className="absolute left-0 top-full pt-2 w-80 z-50 origin-top-left"
                        >
                          <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-2 divide-y divide-slate-100">
                            <div className="px-3 py-2 flex items-center justify-between text-xs text-slate-500">
                              <span>Reinforcement Systems</span>
                              <span className="font-mono-tabular">{PRODUCTS_DATA.length} Models</span>
                            </div>
                            <div className="py-1 max-h-80 overflow-y-auto">
                              {PRODUCTS_DATA.map((prod) => (
                                <button
                                  key={prod.id}
                                  type="button"
                                  onClick={() => {
                                    setIsProductsDropdownOpen(false);
                                    onSelectProduct(prod);
                                  }}
                                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors flex items-start justify-between gap-3 group/item cursor-pointer"
                                >
                                  <div>
                                    <div className="text-sm font-semibold text-slate-900 group-hover/item:text-orange-600 transition-colors">
                                      {prod.name}
                                    </div>
                                    <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                      {prod.category} · Ø {prod.barDiameterRange.split('(')[0].trim()}
                                    </div>
                                  </div>
                                  <span className="text-[11px] font-mono-tabular text-slate-400 shrink-0 mt-0.5">
                                    {prod.code}
                                  </span>
                                </button>
                              ))}
                            </div>
                            <div className="pt-2 pb-1 px-2">
                              <a
                                href="#products"
                                onClick={() => setIsProductsDropdownOpen(false)}
                                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-orange-600 text-white text-xs font-semibold flex items-center justify-between transition-colors"
                              >
                                <span>Explore Complete Product Grid</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.div
                  key={item.label}
                  initial={
                    prefersReducedMotion ? false : { opacity: 0, y: -10 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.045,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <a
                    href={item.href}
                    className="group relative py-2 inline-block text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{item.label}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                  </a>
                </motion.div>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <motion.button
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              type="button"
              onClick={() => onOpenQuoteModal()}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-slate-900 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Get a Quote
            </motion.button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="xl:hidden bg-slate-950 text-white border-b border-slate-800 max-h-[82vh] overflow-y-auto"
            >
              <div className="px-4 py-5 space-y-2">
                {NAV_ITEMS.map((item) => {
                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="border-b border-slate-800/80 pb-2">
                        <button
                          type="button"
                          onClick={() =>
                            setIsMobileProductsExpanded((prev) => !prev)
                          }
                          className="w-full flex items-center justify-between py-2.5 text-base font-semibold text-white hover:text-orange-400 transition-colors cursor-pointer"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-200 ${
                              isMobileProductsExpanded ? 'rotate-180 text-orange-500' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {isMobileProductsExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="pl-3 pt-1 pb-2 space-y-1.5 border-l border-slate-800 ml-2"
                            >
                              {PRODUCTS_DATA.map((prod) => (
                                <button
                                  key={prod.id}
                                  type="button"
                                  onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    onSelectProduct(prod);
                                  }}
                                  className="w-full text-left py-2 px-2 rounded hover:bg-slate-900 flex items-center justify-between text-sm text-slate-300 hover:text-orange-400 transition-colors cursor-pointer"
                                >
                                  <span>{prod.name}</span>
                                  <span className="text-xs font-mono-tabular text-slate-500">
                                    {prod.code}
                                  </span>
                                </button>
                              ))}
                              <a
                                href="#products"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-2 px-2 text-xs font-semibold text-orange-400 hover:underline"
                              >
                                View All {PRODUCTS_DATA.length} Reinforcement Products →
                              </a>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2.5 text-base font-semibold text-slate-200 hover:text-orange-400 border-b border-slate-800/80 transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                })}

                <div className="pt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenQuoteModal();
                    }}
                    className="w-full py-3 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Wrench className="w-4 h-4" />
                    <span>Request Engineering Quote</span>
                  </button>
                  <div className="text-xs text-slate-400 space-y-1 pt-2">
                    <div className="font-mono-tabular">{COMPANY_CONTACT.phoneDisplay}</div>
                    <div>{COMPANY_CONTACT.email}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
