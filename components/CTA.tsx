'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, ArrowRight, Calendar, MessageCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const { currentTheme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-content',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.cta-cards > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-cards',
            start: 'top 85%',
          },
        }
      );

      // Floating animation for decorative elements
      gsap.to('.float-element', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.3,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactOptions = [
    {
      icon: Phone,
      title: 'Call Us Now',
      description: 'Speak with our engineering team',
      action: 'tel:+918080850001',
      actionText: '+91 8080850001',
      isLink: true,
    },
    {
      icon: Calendar,
      title: 'Book Consultation',
      description: 'Schedule a site assessment',
      action: '/contact',
      actionText: 'Book Now',
      isLink: true,
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us online',
      action: '#',
      actionText: 'Start Chat',
      isLink: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Paint Splatter Effects */}
        <div
          className="float-element absolute top-10 left-10 w-32 h-32 rounded-full blur-2xl opacity-20"
          style={{ backgroundColor: currentTheme.colors.secondary }}
        />
        <div
          className="float-element absolute bottom-20 right-20 w-48 h-48 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: currentTheme.colors.accent1 }}
        />
        <div
          className="float-element absolute top-1/2 left-1/4 w-24 h-24 rounded-full blur-2xl opacity-10"
          style={{ backgroundColor: currentTheme.colors.accent2 }}
        />

        {/* Brush Stroke Pattern */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-10"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill={currentTheme.colors.secondary}
            d="M0,64 C240,100 480,20 720,64 C960,108 1200,28 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Content */}
        <div className="cta-content text-center mb-16">
          <span
            className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
            style={{ color: currentTheme.colors.secondary }}
          >
            Get Started Today
          </span>
          <h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-3xl mx-auto"
            style={{ color: currentTheme.colors.textOnDark }}
          >
            Ready to Build Strong Foundations?
          </h2>
          <p
            className="font-body text-lg max-w-2xl mx-auto mb-10"
            style={{ color: `${currentTheme.colors.textOnDark}cc` }}
          >
            Contact us for specialized deep foundation and diaphragm wall solutions. Our expert engineering team is ready to 
            deliver precision underground construction for your project.
          </p>

          {/* Main CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-body font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: currentTheme.colors.ctaText,
            }}
          >
            Get Your Free Consultation
            <ArrowRight size={24} />
          </Link>

          <p
            className="font-body text-sm mt-4"
            style={{ color: `${currentTheme.colors.textOnDark}80` }}
          >
            No obligation • Expert consultation • Free site assessment included
          </p>
        </div>

        {/* Contact Options */}
        <div className="cta-cards grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactOptions.map((option, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}
              >
                <option.icon size={28} style={{ color: currentTheme.colors.secondary }} />
              </div>
              <h3
                className="font-heading text-xl font-semibold mb-2"
                style={{ color: currentTheme.colors.textOnDark }}
              >
                {option.title}
              </h3>
              <p
                className="font-body text-sm mb-4"
                style={{ color: `${currentTheme.colors.textOnDark}99` }}
              >
                {option.description}
              </p>
              {option.isLink ? (
                <Link
                  href={option.action}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-300"
                  style={{ color: currentTheme.colors.secondary }}
                >
                  {option.actionText}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              ) : (
                <button
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-300"
                  style={{ color: currentTheme.colors.secondary }}
                >
                  {option.actionText}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTA;
