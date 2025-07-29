import Hero from '@/components/Hero';
import Services from '@/components/Services';
import HomeProducts from '@/components/HomeProducts';
import WhyChooseUs from '@/components/WhyChooseUs';
import WhoWeAre from '@/components/WhoWeAre';
import Brands from '@/components/Brands';
import ContactSection from '../components/ContactSection';
import Preloader from '@/components/Preloader';

export default function Home() {
  return (
    <>
      <Preloader showOnHomeOnly={true} />
      <Hero />
      <WhoWeAre />
      <HomeProducts />
      <Services />
    
    
      <WhyChooseUs />
      <Brands />
      <ContactSection />
    </>
  );
}
