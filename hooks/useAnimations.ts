'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const fadeInUp = (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        ...options,
      }
    );
  };

  const fadeInUpScroll = (element: string | Element, options?: { trigger?: string | Element; start?: string; end?: string }) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: options?.trigger || element,
          start: options?.start || 'top 85%',
          end: options?.end || 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const staggerFadeInUp = (elements: string | Element[], options?: { stagger?: number; trigger?: string | Element }) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: options?.stagger || 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: options?.trigger || (Array.isArray(elements) ? elements[0] : elements),
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const revealText = (element: string | Element) => {
    return gsap.fromTo(
      element,
      {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        opacity: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const scaleIn = (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        ...options,
      }
    );
  };

  const parallax = (element: string | Element, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  };

  const brushStroke = (element: string | Element) => {
    return gsap.fromTo(
      element,
      {
        scaleX: 0,
        transformOrigin: 'left center',
      },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  };

  const magneticHover = (element: HTMLElement) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  };

  return {
    fadeInUp,
    fadeInUpScroll,
    staggerFadeInUp,
    revealText,
    scaleIn,
    parallax,
    brushStroke,
    magneticHover,
    gsap,
    ScrollTrigger,
  };
};

export default useAnimations;
