'use client';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import { useTheme } from '@/context/ThemeContext';

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <div style={{ backgroundColor: currentTheme.colors.lightBg }}>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <CTA />
    </div>
  );
}
