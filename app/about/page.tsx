'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Users,
  Clock,
  Shield,
  Target,
  Heart,
  Lightbulb,
  Leaf,
  ArrowRight,
  Check,
  Quote,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import CurvedUnderline from '@/components/CurvedUnderline';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const { currentTheme } = useTheme();
  const pageRef = useRef<HTMLDivElement>(null);

  const stats = [
    { value: '10+', label: 'Years in Business', icon: Clock },
    { value: '50+', label: 'Major Projects', icon: Award },
    { value: '100+', label: 'Skilled Professionals', icon: Users },
    { value: '100%', label: 'Safety Compliance', icon: Heart },
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We pursue engineering perfection in every foundation, ensuring structural integrity that exceeds specifications.',
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Honest communication, transparent processes, and standing behind our work with industry-leading quality standards.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing advanced geotechnical techniques and international-standard machinery for superior results.',
    },
    {
      icon: Leaf,
      title: 'Safety',
      description: 'Committed to zero-incident operations through effective safety management in all our underground works.',
    },
  ];

  const team = [
    {
      name: 'Technical Director',
      role: 'Engineering Leadership',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400',
      bio: 'Expert in diaphragm wall design and deep foundation engineering with decades of experience.',
    },
    {
      name: 'Operations Head',
      role: 'Equipment & Logistics',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
      bio: 'Manages fleet of international-standard machinery including hydraulic rigs, cranes, and compressors.',
    },
    {
      name: 'Project Manager',
      role: 'Site Execution Lead',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
      bio: 'Manages on-site execution of complex geotechnical projects from mobilization to completion.',
    },
    {
      name: 'Safety Officer',
      role: 'HSE & Quality Lead',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400',
      bio: 'Ensures zero-incident operations and strict adherence to safety and quality protocols.',
    },
  ];

  const milestones = [
    { year: '2014', event: 'V Infra Engineers founded in collaboration with SM Infra & HIIL' },
    { year: '2016', event: 'Completed first major diaphragm wall project in Delhi NCR' },
    { year: '2018', event: 'Expanded fleet with international-standard hydraulic rigs' },
    { year: '2020', event: 'Secured DMRC metro station projects with L&T' },
    { year: '2022', event: 'Expanded to hospital, underpass, and commercial projects' },
    { year: '2024', event: 'Grew to 100+ professionals with 50+ major projects completed' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.about-hero-content > *',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      // Stats animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
          },
        }
      );

      // Values animation
      gsap.fromTo(
        '.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.values-grid',
            start: 'top 80%',
          },
        }
      );

      // Team animation
      gsap.fromTo(
        '.team-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.team-grid',
            start: 'top 80%',
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-section',
            start: 'top 80%',
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} style={{ backgroundColor: currentTheme.colors.lightBg }}>
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ backgroundColor: currentTheme.colors.secondary }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="about-hero-content max-w-3xl">
            <span
              className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ color: currentTheme.colors.secondary }}
            >
              About Us
            </span>
            <h1
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              style={{ color: currentTheme.colors.textOnDark }}
            >
              The Underground Force Since 2014
            </h1>
            <CurvedUnderline width="200" className="mb-6" />
            <p
              className="font-body text-lg md:text-xl leading-relaxed"
              style={{ color: `${currentTheme.colors.textOnDark}cc` }}
            >
              Since 2014, V Infra Engineers has been the Delhi NCR&apos;s trusted deep foundation partner. 
              Our commitment to precision engineering and safety has made us 
              the region&apos;s premier underground construction company.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl shadow-xl"
            style={{
              backgroundColor: currentTheme.colors.lightBg,
              border: `1px solid ${currentTheme.colors.border}`,
            }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center p-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: `${currentTheme.colors.secondary}15` }}
                >
                  <stat.icon size={28} style={{ color: currentTheme.colors.secondary }} />
                </div>
                <div
                  className="font-heading text-3xl lg:text-4xl font-bold mb-1"
                  style={{ color: currentTheme.colors.heading }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-body text-sm"
                  style={{ color: currentTheme.colors.muted }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
                  alt="V Infra Engineers team at work"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Quote Card */}
              <div
                className="absolute -bottom-8 -right-8 p-6 rounded-2xl shadow-xl max-w-xs"
                style={{
                  backgroundColor: currentTheme.colors.lightBg,
                  border: `1px solid ${currentTheme.colors.border}`,
                }}
              >
                <Quote
                  size={32}
                  className="mb-3"
                  style={{ color: currentTheme.colors.secondary }}
                />
                <p
                  className="font-body text-sm italic mb-3"
                  style={{ color: currentTheme.colors.body }}
                >
                  &ldquo;Every foundation we build carries the weight of trust. Our job is to ensure it stands forever.&rdquo;
                </p>
                <p
                  className="font-body text-xs font-semibold"
                  style={{ color: currentTheme.colors.secondary }}
                >
                  — V Infra Engineers Leadership
                </p>
              </div>
            </div>

            {/* Content */}
            <div>
              <span
                className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
                style={{ color: currentTheme.colors.secondary }}
              >
                Our Story
              </span>
              <h2
                className="font-heading text-3xl md:text-4xl font-bold mb-4"
                style={{ color: currentTheme.colors.heading }}
              >
                Building a Legacy in Deep Foundations
              </h2>
              <CurvedUnderline width="140" className="mb-6" />

              <div
                className="space-y-4 font-body text-base leading-relaxed"
                style={{ color: currentTheme.colors.body }}
              >
                <p>
                  V Infra Engineers began in 2014 as a specialized engineering team 
                  in collaboration with SM Infra Equipments and Heritage Infraspace India Ltd., with a mission: deliver exceptional 
                  quality in diaphragm wall and deep foundation construction.
                </p>
                <p>
                  What started as a core engineering team has grown into Delhi NCR&apos;s most trusted 
                  underground construction company, with over 100 skilled professionals serving infrastructure and 
                  commercial clients across North India.
                </p>
                <p>
                  Today, we&apos;re proud to have executed numerous large-scale projects, from metro stations to 
                  commercial basements and hospital foundations. Our core values remain unchanged: 
                  engineering excellence, precision execution, and complete client satisfaction.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {['Licensed & Certified', 'ISO Standards', 'Zero Incident Goal', 'Free Site Assessment'].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{
                      backgroundColor: currentTheme.colors.cardBg,
                      border: `1px solid ${currentTheme.colors.border}`,
                    }}
                  >
                    <Check size={16} style={{ color: currentTheme.colors.success }} />
                    <span className="font-body text-sm" style={{ color: currentTheme.colors.body }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        className="py-20 lg:py-28"
        style={{ backgroundColor: currentTheme.colors.cardBg }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ color: currentTheme.colors.secondary }}
            >
              What We Stand For
            </span>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: currentTheme.colors.heading }}
            >
              Our Core Values
            </h2>
            <CurvedUnderline width="140" className="mx-auto" />
          </div>

          <div className="values-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: currentTheme.colors.lightBg,
                  border: `1px solid ${currentTheme.colors.border}`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${currentTheme.colors.secondary}15` }}
                >
                  <value.icon size={32} style={{ color: currentTheme.colors.secondary }} />
                </div>
                <h3
                  className="font-heading text-xl font-semibold mb-3"
                  style={{ color: currentTheme.colors.heading }}
                >
                  {value.title}
                </h3>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: currentTheme.colors.body }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ color: currentTheme.colors.secondary }}
            >
              Meet The Team
            </span>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: currentTheme.colors.heading }}
            >
              Our Leadership Team
            </h2>
            <CurvedUnderline width="160" className="mx-auto mb-6" />
            <p
              className="font-body text-lg max-w-2xl mx-auto"
              style={{ color: currentTheme.colors.body }}
            >
              Our leadership team brings decades of combined experience in geotechnical and underground construction.
            </p>
          </div>

          <div className="team-grid grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="team-card group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: currentTheme.colors.lightBg,
                  border: `1px solid ${currentTheme.colors.border}`,
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(0deg, ${currentTheme.colors.primary}cc 0%, transparent 100%)`,
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="font-heading text-xl font-semibold mb-1"
                    style={{ color: currentTheme.colors.heading }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="font-body text-sm font-medium mb-3"
                    style={{ color: currentTheme.colors.secondary }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="font-body text-sm"
                    style={{ color: currentTheme.colors.muted }}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        className="timeline-section py-20 lg:py-28"
        style={{ backgroundColor: currentTheme.colors.cardBg }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span
              className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
              style={{ color: currentTheme.colors.secondary }}
            >
              Our Journey
            </span>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-4"
              style={{ color: currentTheme.colors.heading }}
            >
              A Decade of Engineering Excellence
            </h2>
            <CurvedUnderline width="160" className="mx-auto" />
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-0.5"
              style={{ backgroundColor: currentTheme.colors.border }}
            />

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="timeline-item relative flex gap-8 pl-8">
                  {/* Dot */}
                  <div
                    className="absolute left-6 w-5 h-5 rounded-full border-4 -translate-x-1/2"
                    style={{
                      backgroundColor: currentTheme.colors.lightBg,
                      borderColor: currentTheme.colors.secondary,
                    }}
                  />
                  {/* Content */}
                  <div
                    className="flex-1 p-6 rounded-2xl ml-8"
                    style={{
                      backgroundColor: currentTheme.colors.lightBg,
                      border: `1px solid ${currentTheme.colors.border}`,
                    }}
                  >
                    <span
                      className="font-heading text-2xl font-bold"
                      style={{ color: currentTheme.colors.secondary }}
                    >
                      {milestone.year}
                    </span>
                    <p
                      className="font-body text-base mt-2"
                      style={{ color: currentTheme.colors.body }}
                    >
                      {milestone.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 lg:py-28"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
        }}
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: currentTheme.colors.textOnDark }}
          >
            Ready to Build With Us?
          </h2>
          <p
            className="font-body text-lg mb-10"
            style={{ color: `${currentTheme.colors.textOnDark}cc` }}
          >
            Join leading developers and infrastructure companies who trust V Infra Engineers for deep foundation solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-body font-bold text-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.secondary,
              color: currentTheme.colors.ctaText,
            }}
          >
            Get Your Free Consultation
            <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
}
