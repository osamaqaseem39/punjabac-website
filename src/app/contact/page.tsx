'use client';

import ContactSection from '../../components/ContactSection';

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <div className="max-w-4xl mx-auto my-12 rounded-xl overflow-hidden shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-punjabac-brand">Find Us on Google Maps</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6799.744893727463!2d74.319563!3d31.555115!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904ac3695ceef%3A0x37253b34a37b57d1!2sPunjab%20Car%20Air%20Conditioning%20Centre!5e0!3m2!1sen!2sus!4v1752565116022!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
} 