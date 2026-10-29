import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { COMPANY_CONTACT, PRODUCTS_DATA } from '../data/siteData';
import { AnimatedHeadline, ScrollReveal } from './AnimatedUI';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState(PRODUCTS_DATA[0].name);
  const [projectRequirements, setProjectRequirements] = useState('');
  const [websiteUrlHoneypot, setWebsiteUrlHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessData(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          companyName,
          email,
          phone,
          productInterest,
          projectRequirements,
          websiteUrlHoneypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(
          data.error ||
            'Validation failed. Please check all required fields and try again.'
        );
      } else {
        setSuccessData({
          referenceId: data.referenceId,
          message: data.message,
        });
        setName('');
        setCompanyName('');
        setEmail('');
        setPhone('');
        setProjectRequirements('');
      }
    } catch {
      setErrorMsg(
        'Could not reach the inquiry server. Please verify your network connection and retry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-mono-tabular uppercase tracking-widest text-orange-600 font-semibold mb-2">
            Engineering &amp; Sales Desk
          </div>
          <AnimatedHeadline
            text="Contact Our Team"
            as="h2"
            variant="fade-up"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
          />
          <ScrollReveal delay={0.1}>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Submit your reinforcement schedule, bar diameter breakdown, or
              project inquiry below. All contact details on the right are
              structured for immediate customization with your facility’s direct
              coordinates.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left 7 Columns: Validated Contact & Project Inquiry Form */}
          <ScrollReveal className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Project Inquiry &amp; Quotation Form
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fields marked with an asterisk (*) are required for technical evaluation.
            </p>

            {errorMsg && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-900 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Submission Error</div>
                  <div className="mt-0.5">{errorMsg}</div>
                </div>
              </div>
            )}

            {successData && (
              <div
                role="status"
                className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2"
              >
                <div className="flex items-center gap-2.5 font-bold text-sm text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Inquiry Logged — Reference {successData.referenceId}</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  {successData.message}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Anti-Spam Honeypot */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-honeypot">Company Website URL</label>
                <input
                  id="contact-honeypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteUrlHoneypot}
                  onChange={(e) => setWebsiteUrlHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Company Name *
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Contractor or Engineering Firm"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+[Country Code] Phone Number"
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none font-mono-tabular"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-product"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Product Interest *
                </label>
                <select
                  id="contact-product"
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none"
                >
                  {PRODUCTS_DATA.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name} — {prod.category} ({prod.barDiameterRange})
                    </option>
                  ))}
                  <option value="Complete Coupler & Bar Threading Machinery Package">
                    Complete Coupler &amp; Bar Threading Machinery Package
                  </option>
                  <option value="Custom Structural Anchorage Inquiry">
                    Custom Structural Anchorage Inquiry
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-requirements"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Project Requirements *
                </label>
                <textarea
                  id="contact-requirements"
                  rows={4}
                  required
                  value={projectRequirements}
                  onChange={(e) => setProjectRequirements(e.target.value)}
                  placeholder="Please share bar diameters (12mm–40mm), estimated splice quantities, applicable structural code, and project delivery location..."
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-orange-600 hover:bg-slate-900 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}</span>
              </button>
            </form>
          </ScrollReveal>

          {/* Right 5 Columns: Contact Details & Embedded Google Map */}
          <ScrollReveal delay={0.12} className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <div>
                <div className="text-xs font-mono-tabular text-orange-400 uppercase tracking-wider">
                  Direct Contact Details
                </div>
                <h3 className="text-xl font-bold mt-1">
                  Manufacturing Works &amp; Corporate Office
                </h3>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400">Facility Address</div>
                    <div className="text-slate-200 mt-0.5 leading-relaxed">
                      <a
                        href="https://maps.app.goo.gl/V5cP8bP9kY1dswK59?g_st=ac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-orange-400 transition-colors"
                      >
                        Gali No. 46, Chirag Enterprises, 33 Feet Rd, Block D, Sanjay Colony, Sector 23, Faridabad, Haryana 121005
                      </a>
                    </div>
                    <a
                      href="https://maps.app.goo.gl/V5cP8bP9kY1dswK59?g_st=ac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-semibold text-orange-400 hover:text-orange-300 mt-1 underline"
                    >
                      Open in Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400">Direct Mobile Number</div>
                    <a
                      href="tel:+919971888588"
                      className="text-slate-200 hover:text-orange-400 font-mono-tabular mt-0.5 block font-semibold"
                    >
                      +91 99718 88588
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400">Email Address</div>
                    <a
                      href="mailto:chiragentfbd@gmail.com"
                      className="text-slate-200 hover:text-orange-400 mt-0.5 block font-semibold"
                    >
                      chiragentfbd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-400">Dispatch &amp; Plant Hours</div>
                    <div className="text-slate-200 mt-0.5">
                      {COMPANY_CONTACT.workingHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map + Direct Google Maps Link */}
            <div
              id="facility-map"
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
            >
              <div className="relative h-64 w-full bg-slate-100">
                <iframe
                  title="Chirag Enterprises Location Map"
                  src={COMPANY_CONTACT.mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                  <span className="truncate">{COMPANY_CONTACT.fullAddress}</span>
                </div>
                <a
                  href={COMPANY_CONTACT.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-tabular font-semibold text-orange-400 hover:text-orange-300 whitespace-nowrap shrink-0"
                >
                  Get Directions ↗
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
