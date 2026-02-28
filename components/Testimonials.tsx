"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Autoplay,
	Pagination,
	Navigation,
	EffectCoverflow,
} from "swiper/modules";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import ClientLogos from "./ClientLogos";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const testimonials = [
		{
			id: 1,
			name: "Rajesh Kumar",
			role: "Project Director",
			location: "Noida, UP",
			image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
			rating: 5,
			text: "V Infra Engineers delivered exceptional diaphragm wall construction for our project. Their precision and adherence to timelines was remarkable, and the team demonstrated outstanding technical expertise throughout.",
			project: "Diaphragm Wall Project",
		},
		{
			id: 2,
			name: "Suresh Patel",
			role: "Site Engineer",
			location: "Gurgaon, HR",
			image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200",
			rating: 5,
			text: "We contracted V Infra Engineers for our metro station deep foundation work. They mobilized quickly, worked around our schedule, and the quality of execution was impeccable.",
			project: "Metro Station Project",
		},
		{
			id: 3,
			name: "Priya Sharma",
			role: "Structural Consultant",
			location: "New Delhi",
			image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
			rating: 5,
			text: "As a structural consultant, I recommend V Infra Engineers to all my clients. Their understanding of geotechnical challenges and international-standard machinery is unmatched in the industry.",
			project: "Deep Foundation Works",
		},
		{
			id: 4,
			name: "Amit Verma",
			role: "Development Head",
			location: "Delhi NCR",
			image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
			rating: 5,
			text: "V Infra Engineers handles all our deep foundation requirements across multiple large-scale projects. Their safety standards, competitive execution, and project management are outstanding.",
			project: "Large-Scale Infrastructure",
		},
		{
			id: 5,
			name: "Neha Gupta",
			role: "Project Director",
			location: "Chandigarh",
			image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
			rating: 5,
			text: "The underpass project required specialized diaphragm wall work in challenging conditions. V Infra Engineers delivered beyond expectations with their precision equipment and skilled workforce.",
			project: "Underpass Project",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".testimonials-header",
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".testimonials-header",
						start: "top 85%",
					},
				},
			);
			gsap.fromTo(
				".testimonials-slider",
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".testimonials-slider",
						start: "top 80%",
					},
				},
			);
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="py-24 lg:py-32 relative overflow-hidden"
			style={{ backgroundColor: currentTheme.colors.primary }}>
			<div
				className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
				style={{ backgroundColor: currentTheme.colors.secondary }}
			/>
			<div
				className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
				style={{ backgroundColor: currentTheme.colors.accent2 }}
			/>
			<Quote
				className="absolute top-20 left-10 opacity-5"
				size={300}
				style={{ color: currentTheme.colors.textOnDark }}
			/>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				<div className="testimonials-header text-center mb-16">
					<span
						className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
						style={{ color: currentTheme.colors.secondary }}>
						Testimonials
					</span>
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
						style={{ color: currentTheme.colors.textOnDark }}>
						What Our Clients Say
					</h2>
					<CurvedUnderline width="160" className="mx-auto mb-6" />
					<p
						className="font-body text-lg max-w-2xl mx-auto"
						style={{ color: `${currentTheme.colors.textOnDark}cc` }}>
						Don&apos;t just take our word for it. Here&apos;s what our
						satisfied customers have to say about their experience with V
						Infra Engineers.
					</p>
				</div>

				{/* <div className="testimonials-slider relative">
          <Swiper modules={[Autoplay, Pagination, Navigation, EffectCoverflow]} effect="coverflow" grabCursor={true} centeredSlides={true} slidesPerView={1} spaceBetween={30}
            coverflowEffect={{ rotate: 0, stretch: 0, depth: 100, modifier: 2, slideShadows: false }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletClass: 'swiper-bullet-custom', bulletActiveClass: 'swiper-bullet-active-custom' }}
            navigation={{ prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} className="pb-16">
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <div className={`p-8 rounded-3xl transition-all duration-500 h-full ${index === activeIndex ? 'scale-100' : 'scale-95 opacity-80'}`} style={{ backgroundColor: currentTheme.colors.lightBg, border: `1px solid ${currentTheme.colors.border}` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${currentTheme.colors.secondary}20` }}>
                    <Quote size={24} style={{ color: currentTheme.colors.secondary }} />
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} size={18} style={{ color: currentTheme.colors.secondary }} fill={currentTheme.colors.secondary} />))}
                  </div>
                  <p className="font-body text-base leading-relaxed mb-6" style={{ color: currentTheme.colors.body }}>&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="inline-block px-3 py-1 rounded-full mb-6" style={{ backgroundColor: `${currentTheme.colors.accent2}20`, color: currentTheme.colors.accent3 }}>
                    <span className="font-body text-xs font-medium">{testimonial.project}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden"><Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" /></div>
                    <div>
                      <h4 className="font-heading text-base font-semibold" style={{ color: currentTheme.colors.heading }}>{testimonial.name}</h4>
                      <p className="font-body text-sm" style={{ color: currentTheme.colors.muted }}>{testimonial.role} • {testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg -translate-x-6 lg:-translate-x-12" style={{ backgroundColor: currentTheme.colors.secondary, color: currentTheme.colors.ctaText }}><ChevronLeft size={24} /></button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg translate-x-6 lg:translate-x-12" style={{ backgroundColor: currentTheme.colors.secondary, color: currentTheme.colors.ctaText }}><ChevronRight size={24} /></button>
        </div> */}
				<ClientLogos />

				<style jsx global>{`
					.swiper-bullet-custom {
						width: 12px;
						height: 12px;
						background: ${currentTheme.colors.textOnDark}40;
						border-radius: 50%;
						display: inline-block;
						margin: 0 6px;
						cursor: pointer;
						transition: all 0.3s ease;
					}
					.swiper-bullet-active-custom {
						background: ${currentTheme.colors.secondary};
						width: 32px;
						border-radius: 6px;
					}
					.swiper-pagination {
						position: relative !important;
						margin-top: 20px;
					}
				`}</style>
			</div>
		</section>
	);
};

export default Testimonials;
