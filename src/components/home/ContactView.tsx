import React from 'react';
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

const supportMessage = `Hello 👋
Welcome to Samstones Marketplace Customer Support.

Thank you for reaching out to us. Our support team is available to assist you with:
• General enquiries
• Product information
• Order support
• Delivery assistance
• Complaints or feedback
• Business enquiries

Kindly send us a message describing how we may assist you, and a representative will respond as soon as possible.

We appreciate your patience and thank you for choosing Samstones.

Precision, Quality, and Reliability at Its Finest.`;

export const ContactView = () => {
  const { goBack, user, setCurrentView } = useAppContext();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-gray-100 transition-colors duration-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start mb-6">
        <button 
          onClick={() => {
            goBack();
            window.scrollTo(0, 0);
          }} 
          className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-white hover:text-[#109121] transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
      </div>
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-white mb-4">Client Relations</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          We invite you to connect with our dedicated team for bespoke tailoring inquiries, styling advice, or order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20 text-center">
        <div
          className="border border-gray-200 dark:border-gray-800 bg-[#e6f4e8]/50 dark:bg-[#109121]/5 p-8 flex flex-col items-center rounded-2xl shadow-sm"
        >
          <Phone className="text-[#109121] dark:text-[#16C72E] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900 dark:text-gray-100">WhatsApp Support</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1 text-center">Instant assistance for orders and sizing guidance.</p>
          <div className="flex flex-col space-y-3 items-center">
            <a
              href={`https://wa.me/2348065179554?text=${encodeURIComponent(supportMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!user) { e.preventDefault(); setCurrentView('auth'); } }}
              className="uppercase tracking-widest text-xs font-semibold text-[#109121] dark:text-[#16C72E] hover:text-[#0a5f15] dark:hover:text-[#22e03e] transition-colors pb-1 border-b border-gray-300 dark:border-gray-700 hover:border-[#109121] dark:hover:border-[#16C72E] inline-block"
            >
              +234 806 517 9554
            </a>
            <a
              href={`https://wa.me/2347039627959?text=${encodeURIComponent(supportMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { if (!user) { e.preventDefault(); setCurrentView('auth'); } }}
              className="uppercase tracking-widest text-xs font-semibold text-[#109121] dark:text-[#16C72E] hover:text-[#0a5f15] dark:hover:text-[#22e03e] transition-colors pb-1 border-b border-gray-300 dark:border-gray-700 hover:border-[#109121] dark:hover:border-[#16C72E] inline-block"
            >
              +234 703 962 7959
            </a>
          </div>
        </div>

        <a
          href="mailto:support@samstonesresources.com"
          className="border border-gray-200 dark:border-gray-800 bg-[#e6f4e8]/50 dark:bg-[#109121]/5 p-8 flex flex-col items-center hover:border-[#109121] dark:hover:border-[#16C72E] hover:scale-[1.02] transition-all rounded-2xl cursor-pointer block decoration-transparent group shadow-sm"
        >
          <Mail className="text-[#109121] dark:text-[#16C72E] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900 dark:text-gray-100">Email</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1">For press, partnerships, and general inquiries.</p>
          <span
            className="lowercase text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-[#109121] dark:group-hover:text-[#16C72E] transition-colors pb-1 border-b border-gray-300 dark:border-gray-700 group-hover:border-[#109121] dark:group-hover:border-[#16C72E] inline-block whitespace-nowrap"
          >
            support@samstonesresources.com
          </span>
        </a>

        <div className="border border-gray-200 dark:border-gray-800 bg-[#e6f4e8]/50 dark:bg-[#109121]/5 p-8 flex flex-col items-center hover:border-[#109121] dark:hover:border-[#16C72E] transition-all rounded-2xl shadow-sm">
          <MapPin className="text-[#109121] dark:text-[#16C72E] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900 dark:text-gray-100">Headquarters</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1">Visit our Lagos headquarters to explore our exclusive luxury collections and services.</p>
          <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 px-2 leading-relaxed">
            Iledu Bustop Badagry-Express Way, Lagos Nigeria
          </span>
        </div>

        <div className="border border-gray-200 dark:border-gray-800 bg-[#e6f4e8]/50 dark:bg-[#109121]/5 p-8 flex flex-col items-center hover:border-[#109121] dark:hover:border-[#16C72E] transition-all rounded-2xl shadow-sm">
          <MapPin className="text-[#109121] dark:text-[#16C72E] mb-6" size={32} />
          <h3 className="font-serif text-xl mb-4 text-gray-900 dark:text-gray-100">Branch Office</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 flex-1">Visit our branch office for consultations and further inquiries.</p>
          <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 px-2 leading-relaxed">
            Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20 text-left space-y-6">
        <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-6 border-b dark:border-gray-800 pb-4">CLIENT RELATIONS</h2>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Commitment to Clients</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          At Samstones Marketplace, we believe that strong client relationships are the foundation of long-term business success. We are committed to providing every customer with a professional, respectful, and satisfying experience across all our products and services.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our approach to client relations is built on trust, transparency, reliability, and excellent customer service.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Customer Service Excellence</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We strive to ensure that every interaction with our clients is handled with professionalism and care. Our team is dedicated to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Responding promptly to customer enquiries</li>
          <li>Providing accurate product and service information</li>
          <li>Assisting clients throughout the purchasing process</li>
          <li>Resolving complaints and concerns efficiently</li>
          <li>Maintaining clear and honest communication at all times</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Personalised Customer Experience</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We understand that every customer has unique preferences and needs. Whether purchasing fashion items, jewellery, vehicles, cosmetics, provisions, or real estate services, we aim to provide a personalised experience tailored to individual expectations.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Trust & Transparency</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We are committed to conducting business with honesty and integrity. Clients can expect:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Genuine and accurately described products</li>
          <li>Fair and transparent pricing</li>
          <li>Secure payment processes</li>
          <li>Respect for customer privacy and confidentiality</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">After-Sales Support</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Customer satisfaction remains important to us even after a transaction is completed. Our after-sales support includes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Assistance with eligible returns and exchanges</li>
          <li>Product guidance and care information</li>
          <li>Follow-up support where necessary</li>
          <li>Professional handling of customer feedback and complaints</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Building Long-Term Relationships</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our goal is not simply to make sales but to build lasting relationships with our customers through consistent quality service and dependable business practices.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We value every customer and continuously work towards improving our products, services, and customer experience.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-20 text-left space-y-6">
        <h2 className="text-3xl font-serif text-gray-900 dark:text-white mb-6 border-b dark:border-gray-800 pb-4">THE SAMSTONES MARKETPLACE</h2>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">A Premier Luxury Destination</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Samstones Marketplace represents the pinnacle of luxury, converging premium fashion, real estate, automotive, and lifestyle services into one seamless digital marketplace.
        </p>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our headquarters in Lagos serves as the central hub for delivering carefully curated products and services that reflect sophistication, confidence, and modern excellence.
        </p>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What We Offer</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Our comprehensive marketplace specialises in:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Exclusive real estate properties and consultations</li>
          <li>Premium automobiles and vehicle procurement</li>
          <li>Luxury fashion, footwear, and designer accessories</li>
          <li>Fine jewellery and elegant timepieces</li>
          <li>High-end beauty, cosmetics, and lifestyle products</li>
        </ul>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Each offering is selected with meticulous attention to quality, durability, and style to meet the diverse needs of our discerning clientele.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Philosophy</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          At Samstones, we believe that true luxury is more than just acquisition — it is a reflection of identity, achievement, and elevated living. We are committed to providing an exceptional portfolio that combines elegance and reliability without ever compromising on quality.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Quality & Excellence</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We place a strong emphasis on:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Rigorous verification and authentication of all products</li>
          <li>Modern, timeless, and sophisticated selections</li>
          <li>Uncompromising attention to detail</li>
          <li>Transparent and secure transactions</li>
          <li>Unrivaled customer satisfaction and comfort</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          To establish Samstones Marketplace as the most trusted and recognised luxury marketplace for lifestyle, automotive, and real estate excellence across Nigeria and beyond.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Client Experience</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          We aim to create a refined, enjoyable, and seamless experience through:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
          <li>Dedicated and professional client relations</li>
          <li>Carefully curated, world-class collections</li>
          <li>Reliable logistics and delivery services</li>
          <li>Personalised and confidential customer attention</li>
          <li>Consistent and dependable quality across all divisions</li>
        </ul>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Contact Information</h3>
        <div className="bg-[#e6f4e8]/50 dark:bg-[#109121]/10 p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 space-y-3">
          <p className="font-bold text-gray-900 dark:text-white">Samstones Marketplace</p>
          <p className="flex items-start gap-2"><MapPin size={18} className="shrink-0 mt-0.5 text-[#109121] dark:text-[#16C72E]" /> <span><strong>Headquarters:</strong> Iledu Bustop Badagry-Express Way, Lagos Nigeria</span></p>
          <p className="flex items-start gap-2"><MapPin size={18} className="shrink-0 mt-0.5 text-[#109121] dark:text-[#16C72E]" /> <span><strong>Branch Office:</strong> Zone C House 2, Agunmo, Ilogbo Eremi, Olorunda LCDA, Lagos State, Nigeria</span></p>
          <p className="flex items-start gap-2"><Phone size={18} className="shrink-0 mt-0.5 text-[#109121] dark:text-[#16C72E]" /> <span>Phone/WhatsApp: +234 708 293 0862 / +234 806 517 9554 / +234 703 962 7959</span></p>
          <p className="flex items-start gap-2"><Mail size={18} className="shrink-0 mt-0.5 text-[#109121] dark:text-[#16C72E]" /> <span>Email: <a href="mailto:support@samstonesresources.com" className="hover:text-[#109121] dark:hover:text-[#16C72E] transition-colors font-medium">support@samstonesresources.com</a></span></p>
        </div>
      </div>
    </div>
  );
};
