import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileText,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import {
  ProductItem,
  PRODUCTS_DATA,
  ResourceDocument,
  COMPANY_CONTACT,
} from '../data/siteData';
import { ProductTechnicalDiagram } from './ProductTechnicalDiagram';

/* 1. PRODUCT DETAIL MODAL */
interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuoteForProduct: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuoteForProduct,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          {/* Smooth Backdrop Transition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          {/* Modal Dialog with Subtle Scale-Up & Fade-In */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 14 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            {/* Modal Top Header */}
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-3 text-xs font-mono-tabular text-slate-300">
                <span>{product.code}</span>
                <span>·</span>
                <span className="text-orange-400">{product.category}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close product specification modal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-6 rounded-xl overflow-hidden border border-slate-200">
                  <ProductTechnicalDiagram
                    visualType={product.visualType}
                    code={product.code}
                  />
                </div>

                <div className="md:col-span-6 space-y-3">
                  <h2
                    id="modal-product-title"
                    className="text-2xl font-extrabold text-slate-900 tracking-tight"
                  >
                    {product.name}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {product.detailedDescription}
                  </p>
                  <div className="pt-2 space-y-1.5 text-xs border-t border-slate-200">
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Bar Diameter Range:</span>
                      <span className="font-semibold text-slate-900 font-mono-tabular">
                        {product.barDiameterRange}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-t border-slate-100">
                      <span className="text-slate-500">Thread Profile:</span>
                      <span className="font-semibold text-slate-900">
                        {product.threadType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Engineering &amp; Dimensional Parameters</span>
                </h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-sm">
                    <tbody className="divide-y divide-slate-200">
                      {product.technicalSpecs.map((spec) => (
                        <tr key={spec.parameter} className="hover:bg-slate-50">
                          <th className="py-3 px-4 font-medium text-slate-600 bg-slate-50/70 w-2/5">
                            {spec.parameter}
                          </th>
                          <td className="py-3 px-4 font-semibold text-slate-900 font-mono-tabular">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                      <tr className="hover:bg-slate-50">
                        <th className="py-3 px-4 font-medium text-slate-600 bg-slate-50/70">
                          Site Installation Method
                        </th>
                        <td className="py-3 px-4 text-slate-800">
                          {product.installationMethod}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Primary Structural Applications */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                  Recommended Structural Applications
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {product.keyApplications.map((app) => (
                    <li
                      key={app}
                      className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed"
                    >
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Close Window
              </button>
              <button
                type="button"
                onClick={() => {
                  const selectedName = product.name;
                  onClose();
                  onRequestQuoteForProduct(selectedName);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Quote for {product.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* 2. QUOTE REQUEST / QUICK CONTACT MODAL */
interface QuoteModalProps {
  isOpen: boolean;
  defaultProduct?: string;
  onClose: () => void;
}

export const QuoteRequestModal: React.FC<QuoteModalProps> = ({
  isOpen,
  defaultProduct = '',
  onClose,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState(
    defaultProduct || PRODUCTS_DATA[0].name
  );
  const [projectRequirements, setProjectRequirements] = useState('');
  const [websiteUrlHoneypot, setWebsiteUrlHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (defaultProduct) {
      setProductInterest(defaultProduct);
    }
  }, [defaultProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
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
        setErrorMessage(
          data.error ||
            'Unable to submit inquiry. Please verify all required fields and try again.'
        );
      } else {
        setSubmissionResult({
          referenceId: data.referenceId,
          message: data.message,
        });
      }
    } catch {
      setErrorMessage(
        'Network error while connecting to the inquiry server. Please verify your connection and retry.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmissionResult(null);
    setErrorMessage(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="quote-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 14 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden my-8"
          >
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-tabular text-orange-400 uppercase tracking-wider">
                  Direct Technical Desk
                </span>
                <h2 id="quote-modal-title" className="text-lg font-bold text-white">
                  Request a Project Quote
                </h2>
              </div>
              <button
                type="button"
                onClick={resetAndClose}
                aria-label="Close quote request modal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {submissionResult ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-mono-tabular text-slate-500">
                      REFERENCE ID: {submissionResult.referenceId}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      Inquiry Logged Successfully
                    </h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto">
                      {submissionResult.message}
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-orange-600 rounded-lg transition-colors cursor-pointer"
                    >
                      Return to Website
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Hidden Honeypot Field for Spam Protection */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="modal-honeypot">Website URL</label>
                    <input
                      id="modal-honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={websiteUrlHoneypot}
                      onChange={(e) => setWebsiteUrlHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="modal-name"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        id="modal-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Rajesh Sharma"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-orange-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-company"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Company / Contractor Name *
                      </label>
                      <input
                        id="modal-company"
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g., Apex Civil Infrastructure Ltd."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-orange-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="modal-email"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Business Email *
                      </label>
                      <input
                        id="modal-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-orange-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="modal-phone"
                        className="block text-xs font-semibold text-slate-700 mb-1"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="modal-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 / +966 / +1 ..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-orange-600 focus:outline-none font-mono-tabular"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-product"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Product Interest *
                    </label>
                    <select
                      id="modal-product"
                      value={productInterest}
                      onChange={(e) => setProductInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:border-orange-600 focus:outline-none"
                    >
                      {PRODUCTS_DATA.map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name} ({p.code})
                        </option>
                      ))}
                      <option value="Full Project Package (Couplers + Threading Equipment)">
                        Full Project Package (Couplers + Threading Equipment)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="modal-requirements"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Project Requirements (Bar Sizes, Estimated Quantity, Location) *
                    </label>
                    <textarea
                      id="modal-requirements"
                      rows={3}
                      required
                      value={projectRequirements}
                      onChange={(e) => setProjectRequirements(e.target.value)}
                      placeholder="Specify bar diameters (e.g., 25mm, 32mm), approximate coupler quantity, and project site location..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={resetAndClose}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-600 hover:bg-slate-900 disabled:opacity-50 rounded-lg transition-colors cursor-pointer"
                    >
                      {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* 3. TECHNICAL DOCUMENT / CERTIFICATE PLACEHOLDER PREVIEW MODAL */
interface ResourceModalProps {
  resource: ResourceDocument | null;
  onClose: () => void;
  onRequestDocumentCopy: (docTitle: string) => void;
}

export const ResourcePreviewModal: React.FC<ResourceModalProps> = ({
  resource,
  onClose,
  onRequestDocumentCopy,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (resource) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [resource, onClose]);

  return (
    <AnimatePresence>
      {resource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
          />

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.95, y: 12 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 10 }
            }
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono-tabular text-orange-400">
                <FileText className="w-4 h-4" />
                <span>{resource.documentCode}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close document preview modal"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs font-mono-tabular text-slate-500">
                {resource.category} · {resource.status}
              </div>
              <h2
                id="resource-modal-title"
                className="text-xl font-bold text-slate-900"
              >
                {resource.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {resource.summary}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Included Engineering Sections:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 list-disc pl-4">
                  {resource.contents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Document Asset Placeholder Notice:</strong> To maintain strict compliance integrity, no fabricated certificate numbers or unverified PDF files are bundled. Replace this slot with your verified PDF file or request the technical dossier directly from our engineering desk ({COMPANY_CONTACT.email}).
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const docTitle = resource.title;
                    onClose();
                    onRequestDocumentCopy(docTitle);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-orange-600 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
                >
                  Request Document via Email
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
