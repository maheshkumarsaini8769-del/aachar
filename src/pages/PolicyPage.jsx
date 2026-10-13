import React from 'react';
import { ChevronRight, ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

const POLICY_DATA = {
  shipping: {
    title: 'Shipping & Delivery Policy',
    tag: 'Pan-India Delivery Guarantee',
    content: [
      {
        heading: 'Pan-India Coverage',
        text: 'Marusthali Achar ships to over 28,000+ pin codes across all states and union territories in India. Orders placed before 1:00 PM are dispatched on the same business day from our Sikar workshop.'
      },
      {
        heading: 'Shipping Charges & Thresholds',
        text: 'Standard Delivery is completely FREE on all orders valued above ₹499. For orders below ₹499, a nominal shipping fee of ₹50 is applied at checkout. Express priority air shipping is available for ₹50.'
      },
      {
        heading: '5-Ply Shockproof Glass Packaging',
        text: 'All our pickles are packed in premium food-grade glass jars. To ensure zero breakage, each jar is enveloped in custom 5-ply honeycomb cushioning and double bubble wrap.'
      }
    ]
  },
  returns: {
    title: 'Return, Replacement & Refund Policy',
    tag: 'Zero-Risk Customer Assurance',
    content: [
      {
        heading: 'Damage in Transit Guarantee',
        text: 'If your glass jar arrives broken, leaking, or damaged during transit, simply message us on WhatsApp (+91 9876543210) with a photo within 48 hours of delivery. We will immediately dispatch a fresh replacement jar at zero extra charge.'
      },
      {
        heading: 'Perishable Food Product Quality Assurance',
        text: 'Due to food safety standards, edible goods cannot be returned once unsealed. However, if you notice any genuine taste defect or broken seal upon unboxing, we provide a 100% store credit or direct refund.'
      }
    ]
  },
  'food-safety': {
    title: 'Food Safety & Purity Standards',
    tag: '100% Preservative Free Guarantee',
    content: [
      {
        heading: 'Pure Cold-Pressed Mustard Oil',
        text: 'We only use authentic, unadulterated first-press cold-pressed mustard oil. We never blend refined palm oils or cheap neutral vegetable oils.'
      },
      {
        heading: 'Zero Chemical Additives',
        text: 'Our pickles contain zero synthetic acidity regulators (E260/acetic acid), zero chemical preservatives (sodium benzoate, E211), and zero artificial food colorants.'
      },
      {
        heading: 'Ceramic Jar Solar Fermentation',
        text: 'All fermentation takes place naturally under Rajasthan solar heat in non-reactive glazed earthenware, preserving beneficial digestive gut probiotics.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    tag: 'Data Protection & Transparency',
    content: [
      {
        heading: 'Information We Collect',
        text: 'We collect customer contact details (name, delivery address, phone number, email) strictly for shipping fulfillment and tracking notifications. We do not sell or rent customer data.'
      },
      {
        heading: 'Payment Security',
        text: 'Payment gateways adhere to strict PCI-DSS standards. In this frontend demonstration application, no real payment credentials or bank details are stored or transmitted.'
      }
    ]
  }
};

export const PolicyPage = ({ policyType = 'shipping', onNavigate }) => {
  const current = POLICY_DATA[policyType] || POLICY_DATA.shipping;

  return (
    <div className="bg-brand-bg min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-brand-brownMuted mb-6 font-medium">
          <button onClick={() => onNavigate('home')} className="hover:text-brand-green">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-brown font-bold">{current.title}</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider block mb-1">
            {current.tag}
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-brand-brown">
            {current.title}
          </h1>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-6 text-xs sm:text-sm text-brand-brown leading-relaxed">
          {current.content.map((sec, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-serif font-bold text-base sm:text-lg text-brand-brown">
                {sec.heading}
              </h3>
              <p className="text-brand-brownMuted leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}

          <div className="pt-4 border-t border-brand-border/60 text-xs text-brand-brownMuted">
            For further queries or questions, contact our support team at <strong className="text-brand-brown">care@marusthaliachar.com</strong> or call <strong className="text-brand-brown">+91 9876543210</strong>.
          </div>
        </div>

      </div>
    </div>
  );
};
