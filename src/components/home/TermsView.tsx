import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft } from 'lucide-react';

export const TermsView = ({ onBack }: { onBack?: () => void }) => {
  const { setCurrentView } = useAppContext();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100">

      {/* Hero Banner */}
      <div className="relative w-full bg-[#109121] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 mb-8"
        >
          <img
            src="/logo.png.jpg"
            alt="Samstones International Resources Limited"
            className="w-56 md:w-72 h-auto mx-auto drop-shadow-2xl rounded-2xl"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/80 text-xs font-bold uppercase tracking-widest mb-4 relative z-10"
        >
          Legal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl md:text-5xl font-serif text-white tracking-tight font-bold relative z-10"
        >
          Terms &amp; Conditions of Sale
        </motion.h1>
      </div>

      <div className="pt-16 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => { 
            if (onBack) onBack(); 
            else { setCurrentView('home'); window.scrollTo(0, 0); }
          }}
          className="flex items-center space-x-2 text-sm font-semibold text-[#109121] hover:text-[#0a5f15] transition-colors mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>{onBack ? 'Back' : 'Back to Home'}</span>
        </button>

        {/* Header */}
        <div className="border-b-2 border-[#109121] pb-8 mb-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Terms &amp; Conditions of Sale
          </h1>
          <p className="text-[#109121] font-semibold text-sm uppercase tracking-widest">
            Samstones International Resources Limited
          </p>
          <p className="text-gray-500 dark:text-white text-sm mt-2">Effective Date: 20 May 2026</p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 dark:text-white leading-relaxed mb-10 text-base">
          Welcome to <strong>Samstones International Resources Limited</strong>. These Terms &amp; Conditions govern the sale of goods and services provided by our company. By accessing our website, placing an order, or purchasing any product from us, you agree to be bound by these Terms &amp; Conditions. If you do not agree with any part of these Terms, please refrain from purchasing from us.
        </p>

        <div className="space-y-12">

          {/* Section 1 */}
          <Section num="1" title="GENERAL">
            <SubSection title="1.1 Company Information">
              <p>Samstones International Resources Limited is a registered business operating in Lagos State, Nigeria.</p>
            </SubSection>
            <SubSection title="1.2 Definitions">
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>"Company", "We", "Us", or "Our"</strong> refers to Samstones International Resources Limited.</li>
                <li><strong>"Customer", "You", or "Buyer"</strong> refers to any individual or entity purchasing goods or services from us.</li>
              </ul>
            </SubSection>
            <SubSection title="1.3 Amendments">
              <p>We reserve the right to update, amend, or revise these Terms &amp; Conditions at any time without prior notice. Continued use of our services after such changes constitutes acceptance of the revised Terms.</p>
            </SubSection>
          </Section>

          {/* Section 2 */}
          <Section num="2" title="PRODUCTS &amp; AVAILABILITY">
            <SubSection title="2.1 Product Categories">
              <p className="mb-2">We offer a variety of products and services, including but not limited to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Shoes</li><li>Bags</li><li>Clothes and fashion items</li><li>Jewellery</li>
                <li>Cars and vehicles</li><li>Phone accessories</li><li>Drinks and beverages</li>
                <li>Cosmetics and beauty products</li><li>Provisions and household items</li>
                <li>Real estate and property-related services</li>
              </ul>
            </SubSection>
            <SubSection title="2.2 Product Descriptions">
              <p>All product descriptions, images, prices, and specifications are provided in good faith. However, we do not guarantee that all product colours, dimensions, or details will be completely accurate due to differences in screens, monitors, lighting, or manufacturing processes.</p>
            </SubSection>
            <SubSection title="2.3 Availability">
              <p className="mb-2">All products and services are subject to availability. In the event that an item becomes unavailable after an order has been placed, we reserve the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Offer an alternative product,</li>
                <li>Place the item on back order, or</li>
                <li>Issue a refund.</li>
              </ul>
            </SubSection>
          </Section>

          {/* Section 3 */}
          <Section num="3" title="PRICING &amp; PAYMENT">
            <SubSection title="3.1 Pricing">
              <p>All prices are listed in <strong>Nigerian Naira (NGN)</strong> and include applicable VAT unless otherwise stated. Prices may be updated without prior notice.</p>
            </SubSection>
            <SubSection title="3.2 Payment Terms">
              <p>Full payment must be made before goods are released or delivered unless otherwise agreed in writing for instalment-based purchases such as vehicles or real estate transactions.</p>
            </SubSection>
            <SubSection title="3.3 Accepted Payment Methods">
              <p className="mb-2">We accept payments via:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bank Transfer</li><li>Debit/Credit Card</li><li>POS</li><li>Cash</li><li>Other approved payment methods</li>
              </ul>
              <p className="mt-2">All payments must be made only to official company accounts bearing the name <strong>Samstones International Resources Limited</strong>.</p>
            </SubSection>
            <SubSection title="3.4 Verification for High-Value Purchases">
              <p className="mb-2">For high-value items such as vehicles, jewellery, or real estate transactions, we may require:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Valid identification,</li>
                <li>Proof of payment, and</li>
                <li>Additional verification before release or transfer.</li>
              </ul>
            </SubSection>
          </Section>

          {/* Section 4 */}
          <Section num="4" title="ORDERS &amp; ACCEPTANCE">
            <SubSection title="4.1 Order Placement">
              <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order at our discretion.</p>
            </SubSection>
            <SubSection title="4.2 Order Confirmation">
              <p>An order shall only be deemed confirmed after the customer receives an official receipt, invoice, or confirmation message from Samstones International Resources Limited.</p>
            </SubSection>
          </Section>

          {/* Section 5 */}
          <Section num="5" title="DELIVERY, COLLECTION &amp; TRANSFER OF RISK">
            <SubSection title="5.1 Delivery Timelines">
              <p className="mb-2">Delivery timelines provided are estimates only. We shall not be held liable for delays caused by:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Courier services,</li><li>Customs procedures,</li><li>Weather conditions,</li>
                <li>Government restrictions, or</li><li>Other unforeseen third-party circumstances.</li>
              </ul>
            </SubSection>
            <SubSection title="5.2 Transfer of Risk">
              <p className="mb-2">Ownership and risk of goods pass to the customer upon:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delivery to the customer's specified address, or</li>
                <li>Collection from our store, warehouse, or designated pick-up point.</li>
              </ul>
            </SubSection>
            <SubSection title="5.3 Drinks, Cosmetics &amp; Perishable Goods">
              <p>Customers must inspect drinks, cosmetics, provisions, and other consumable items upon delivery. We shall not be responsible for damage, contamination, or spoilage resulting from improper handling or storage after delivery.</p>
            </SubSection>
            <SubSection title="5.4 Vehicles">
              <p className="mb-2">Vehicle handover shall include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Keys,</li><li>Relevant registration documents, and</li><li>Delivery note or invoice.</li>
              </ul>
              <p className="mt-2">All vehicle inspections and test drives are carried out at the customer's own risk.</p>
            </SubSection>
            <SubSection title="5.5 Real Estate Transactions">
              <p>For real estate purchases, transfer of ownership shall only occur upon completion of payment, execution of relevant legal documents, and fulfilment of all agreed conditions.</p>
            </SubSection>
          </Section>

          {/* Section 6 */}
          <Section num="6" title="RETURNS, REFUNDS &amp; EXCHANGES">
            <SubSection title="6.1 Shoes, Bags, Clothes &amp; Accessories">
              <p className="mb-2">Returns or exchanges for shoes, bags, clothes, phone accessories, and eligible merchandise are accepted within <strong>7 days</strong> of purchase provided that the item:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Is unused and unworn,</li><li>Is in its original packaging,</li>
                <li>Remains in resalable condition, and</li><li>Is accompanied by proof of purchase.</li>
              </ul>
            </SubSection>
            <SubSection title="6.2 Drinks, Cosmetics &amp; Provisions">
              <p className="mb-2">No returns shall be accepted for drinks, cosmetics, provisions, or other consumable goods unless the item is:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Expired,</li><li>Defective, or</li><li>Damaged upon delivery.</li>
              </ul>
              <p className="mt-2">Complaints must be reported within <strong>24 hours</strong> of delivery with clear photographic evidence.</p>
            </SubSection>
            <SubSection title="6.3 Cars &amp; Vehicles">
              <p className="mb-2">All vehicle sales are considered final after handover and completion of inspection or test drive.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Used vehicles are sold <strong>"as seen"</strong> unless covered under a separate written warranty agreement.</li>
                <li>New vehicles remain subject to the manufacturer's warranty terms.</li>
              </ul>
            </SubSection>
            <SubSection title="6.4 Jewellery">
              <p className="mb-2">Due to hygiene and security reasons:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Earrings and pierced jewellery items are non-returnable.</li>
                <li>Other jewellery items may qualify for exchange within the approved return period if unused and unworn.</li>
              </ul>
            </SubSection>
            <SubSection title="6.5 Real Estate">
              <p>Payments made towards land, property, or real estate transactions are generally non-refundable except where otherwise agreed in writing or required by law.</p>
            </SubSection>
            <SubSection title="6.6 Refund Processing">
              <p>Approved refunds shall be processed to the original payment method within <strong>7 working days</strong> after inspection and approval of returned goods.</p>
            </SubSection>
          </Section>

          {/* Section 7 */}
          <Section num="7" title="WARRANTY &amp; LIABILITY">
            <SubSection title="7.1 Manufacturer Warranty">
              <p className="mb-2">Where applicable, manufacturer warranties shall apply to eligible products such as:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>New vehicles,</li><li>Branded fashion items,</li><li>Electronics, and</li><li>Selected accessories.</li>
              </ul>
            </SubSection>
            <SubSection title="7.2 Limitation of Liability">
              <p className="mb-2">Samstones International Resources Limited shall not be liable for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Indirect losses,</li><li>Consequential damages,</li><li>Loss of profit,</li>
                <li>Business interruption, or</li><li>Damages arising from misuse of products.</li>
              </ul>
              <p className="mt-2">Our maximum liability shall not exceed the purchase price of the affected item.</p>
            </SubSection>
            <SubSection title="7.3 Jewellery Disclaimer">
              <p>Natural variations in gemstones, metals, fabrics, leather, or handcrafted materials are not considered defects. Proper care instructions may be provided where necessary.</p>
            </SubSection>
          </Section>

          {/* Section 8 */}
          <Section num="8" title="CUSTOMER RESPONSIBILITIES">
            <p className="text-gray-600 dark:text-white leading-relaxed mb-2">Customers agree to:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-white">
              <li>Provide accurate and complete information when placing orders,</li>
              <li>Inspect goods upon delivery or collection,</li>
              <li>Use purchased products responsibly and according to provided instructions.</li>
            </ul>
            <p className="text-gray-600 dark:text-white leading-relaxed mt-3">Customers purchasing age-restricted items such as alcoholic drinks must be at least <strong>18 years old</strong> and may be required to present valid identification.</p>
          </Section>

          {/* Section 9 */}
          <Section num="9" title="INTELLECTUAL PROPERTY">
            <p className="text-gray-600 dark:text-white leading-relaxed">All logos, trademarks, product images, website content, graphics, and materials belonging to Samstones International Resources Limited remain our intellectual property and may not be copied, reproduced, distributed, or used without prior written consent.</p>
          </Section>

          {/* Section 10 */}
          <Section num="10" title="PRIVACY POLICY">
            <p className="text-gray-600 dark:text-white leading-relaxed mb-2">We collect and process customer information solely for:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-white">
              <li>Order fulfilment,</li><li>Delivery services,</li><li>Customer support, and</li>
              <li>Compliance with legal obligations.</li>
            </ul>
            <p className="text-gray-600 dark:text-white leading-relaxed mt-3">Customer information shall be handled in accordance with applicable data protection laws and our Privacy Policy.</p>
          </Section>

          {/* Section 11 */}
          <Section num="11" title="FORCE MAJEURE">
            <p className="text-gray-600 dark:text-white leading-relaxed mb-2">We shall not be held liable for delays or failure to perform obligations due to events beyond our reasonable control, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-white">
              <li>Flood,</li><li>Fire,</li><li>War,</li><li>Civil unrest,</li><li>Strikes,</li>
              <li>Government actions,</li><li>Natural disasters, or</li><li>Transportation disruptions.</li>
            </ul>
          </Section>

          {/* Section 12 */}
          <Section num="12" title="GOVERNING LAW &amp; DISPUTE RESOLUTION">
            <SubSection title="12.1 Governing Law">
              <p>These Terms &amp; Conditions shall be governed by and interpreted in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>.</p>
            </SubSection>
            <SubSection title="12.2 Dispute Resolution">
              <p className="mb-2">Any dispute arising from transactions with Samstones International Resources Limited shall first be resolved amicably through negotiation. Where unresolved, such disputes shall be submitted to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The competent courts of Lagos State, Nigeria, or</li>
                <li>Arbitration in accordance with applicable Nigerian laws.</li>
              </ul>
            </SubSection>
          </Section>



        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-xs text-gray-400 dark:text-white">
          © {new Date().getFullYear()} Samstones International Resources Limited. All rights reserved.
        </div>
      </div>
      </div>
    </div>
  );
};

/* ── Helper sub-components ── */
const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <section>
    <div className="flex items-center gap-4 mb-6">
      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#109121] text-white text-sm font-bold flex items-center justify-center">
        {num}
      </span>
      <h2 className="text-xl font-serif font-bold text-gray-900 dark:text-white tracking-tight">{title}</h2>
    </div>
    <div className="pl-13 space-y-5" style={{ paddingLeft: '3.25rem' }}>
      {children}
    </div>
  </section>
);

const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider mb-2">{title}</h3>
    <div className="text-gray-600 dark:text-white leading-relaxed space-y-2 text-[0.95rem]">{children}</div>
  </div>
);
