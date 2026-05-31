import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactView = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Client Relations</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          We invite you to connect with our dedicated team for bespoke tailoring inquiries, styling advice, or order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-20 text-center">
        <div className="border border-gray-200 bg-[#e6f4e8]/50 p-8 flex flex-col items-center hover:border-[#109121] transition-colors rounded-2xl">
          <Phone className="text-[#109121] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900">WhatsApp Support</h3>
          <p className="text-gray-600 text-sm mb-6 flex-1">Instant assistance for orders and sizing guidance.</p>
          <a
            href="https://wa.me/2348065179554"
            target="_blank"
            rel="noopener noreferrer"
            className="uppercase tracking-widest text-xs font-semibold hover:text-[#109121] transition-colors pb-1 border-b border-gray-300 hover:border-[#109121] inline-block text-gray-900"
          >
            +234 806 517 9554
          </a>
        </div>

        <div className="border border-gray-200 bg-[#e6f4e8]/50 p-8 flex flex-col items-center hover:border-[#109121] transition-colors rounded-2xl">
          <Mail className="text-[#109121] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900">Email</h3>
          <p className="text-gray-600 text-sm mb-6 flex-1">For press, partnerships, and general inquiries.</p>
          <a
            href="mailto:info@samstonesresources.com"
            className="uppercase tracking-widest text-xs font-semibold hover:text-[#109121] transition-colors pb-1 border-b border-gray-300 hover:border-[#109121] inline-block text-gray-900"
          >
            info@samstonesresources.com
          </a>
        </div>

        <div className="border border-gray-200 bg-[#e6f4e8]/50 p-8 flex flex-col items-center hover:border-[#109121] transition-colors rounded-2xl">
          <MapPin className="text-[#109121] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900">Headquarters</h3>
          <p className="text-gray-600 text-sm mb-6 flex-1">Visit our Lagos headquarters to explore our exclusive luxury collections and services (By Appointment Only).</p>
          <span className="text-xs font-semibold text-gray-900 px-2 leading-relaxed">
            Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20 text-left space-y-6">
        <h2 className="text-3xl font-serif text-gray-900 mb-6 border-b pb-4">CLIENT RELATIONS</h2>
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Our Commitment to Clients</h3>
        <p className="text-gray-600 leading-relaxed">
          At Samstones International Resources Ltd, we believe that strong client relationships are the foundation of long-term business success. We are committed to providing every customer with a professional, respectful, and satisfying experience across all our products and services.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our approach to client relations is built on trust, transparency, reliability, and excellent customer service.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Customer Service Excellence</h3>
        <p className="text-gray-600 leading-relaxed">
          We strive to ensure that every interaction with our clients is handled with professionalism and care. Our team is dedicated to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Responding promptly to customer enquiries</li>
          <li>Providing accurate product and service information</li>
          <li>Assisting clients throughout the purchasing process</li>
          <li>Resolving complaints and concerns efficiently</li>
          <li>Maintaining clear and honest communication at all times</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Personalised Customer Experience</h3>
        <p className="text-gray-600 leading-relaxed">
          We understand that every customer has unique preferences and needs. Whether purchasing fashion items, jewellery, vehicles, cosmetics, provisions, or real estate services, we aim to provide a personalised experience tailored to individual expectations.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Trust & Transparency</h3>
        <p className="text-gray-600 leading-relaxed">
          We are committed to conducting business with honesty and integrity. Clients can expect:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Genuine and accurately described products</li>
          <li>Fair and transparent pricing</li>
          <li>Secure payment processes</li>
          <li>Respect for customer privacy and confidentiality</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">After-Sales Support</h3>
        <p className="text-gray-600 leading-relaxed">
          Customer satisfaction remains important to us even after a transaction is completed. Our after-sales support includes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Assistance with eligible returns and exchanges</li>
          <li>Product guidance and care information</li>
          <li>Follow-up support where necessary</li>
          <li>Professional handling of customer feedback and complaints</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Building Long-Term Relationships</h3>
        <p className="text-gray-600 leading-relaxed">
          Our goal is not simply to make sales but to build lasting relationships with our customers through consistent quality service and dependable business practices.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We value every customer and continuously work towards improving our products, services, and customer experience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-20 text-left space-y-6">
        <h2 className="text-3xl font-serif text-gray-900 mb-6 border-b pb-4">THE SAMSTONES MARKETPLACE</h2>
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">A Premier Luxury Destination</h3>
        <p className="text-gray-600 leading-relaxed">
          Samstones International Resources Ltd represents the pinnacle of luxury, converging premium fashion, real estate, automotive, and contemporary lifestyle services into one seamless digital marketplace.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Our headquarters in Lagos serves as the central hub for delivering carefully curated products and services that reflect sophistication, confidence, and modern excellence.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h3>
        <p className="text-gray-600 leading-relaxed">
          Our comprehensive marketplace specialises in:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Exclusive real estate properties and consultations</li>
          <li>Premium automobiles and vehicle procurement</li>
          <li>Luxury fashion, footwear, and designer accessories</li>
          <li>Fine jewellery and elegant timepieces</li>
          <li>High-end beauty, cosmetics, and lifestyle products</li>
        </ul>
        <p className="text-gray-600 leading-relaxed">
          Each offering is selected with meticulous attention to quality, durability, and style to meet the diverse needs of our discerning clientele.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Our Philosophy</h3>
        <p className="text-gray-600 leading-relaxed">
          At Samstones, we believe that true luxury is more than just acquisition — it is a reflection of identity, achievement, and elevated living. We are committed to providing an exceptional portfolio that combines elegance and reliability without ever compromising on quality.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Quality & Excellence</h3>
        <p className="text-gray-600 leading-relaxed">
          We place a strong emphasis on:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Rigorous verification and authentication of all products</li>
          <li>Modern, timeless, and sophisticated selections</li>
          <li>Uncompromising attention to detail</li>
          <li>Transparent and secure transactions</li>
          <li>Unrivaled customer satisfaction and comfort</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Our Vision</h3>
        <p className="text-gray-600 leading-relaxed">
          To establish Samstones International Resources Ltd as the most trusted and recognised luxury marketplace for lifestyle, automotive, and real estate excellence across Nigeria and beyond.
        </p>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Client Experience</h3>
        <p className="text-gray-600 leading-relaxed">
          We aim to create a refined, enjoyable, and seamless experience through:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Dedicated and professional client relations</li>
          <li>Carefully curated, world-class collections</li>
          <li>Reliable logistics and delivery services</li>
          <li>Personalised and confidential customer attention</li>
          <li>Consistent and dependable quality across all divisions</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Contact Information</h3>
        <div className="bg-[#e6f4e8]/50 p-6 rounded-xl border border-gray-100 text-gray-600 space-y-3">
          <p className="font-bold text-gray-900">Samstones International Resources Ltd</p>
          <p>📍 Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria</p>
          <p>📞 Phone/WhatsApp: +234 708 293 0862 / +234 806 517 9554</p>
          <p>✉️ Email: <a href="mailto:info@samstonesresources.com" className="hover:text-[#109121] transition-colors font-medium">info@samstonesresources.com</a></p>
        </div>
      </div>
    </div>
  );
};
