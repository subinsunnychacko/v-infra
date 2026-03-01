"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";
import ClientLogos from "./ClientLogos";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

gsap.registerPlugin(ScrollTrigger);

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

/* ─── Mobile Card Component ─── */
const MobileTestimonialCard = ({
	testimonial,
	isActive,
	themeColors,
}: {
	testimonial: (typeof testimonials)[0];
	isActive: boolean;
	themeColors: any;
}) => (
	<div
		className={`flex-shrink-0 w-[85vw] snap-center rounded-2xl p-6 transition-all duration-500 ${isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-60"}`}
		style={{
			backgroundColor: themeColors.lightBg,
			border: `1px solid ${themeColors.border}`,
		}}>
		{/* Quote icon */}
		<div
			className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
			style={{ backgroundColor: `${themeColors.secondary}15` }}>
			<Quote size={18} style={{ color: themeColors.secondary }} />
		</div>

		{/* Stars */}
		<div className="flex gap-1 mb-4">
			{[...Array(testimonial.rating)].map((_, i) => (
				<Star
					key={i}
					size={14}
					style={{ color: themeColors.secondary }}
					fill={themeColors.secondary}
				/>
			))}
		</div>

		{/* Text */}
		<p
			className="font-body text-sm leading-relaxed mb-5"
			style={{ color: themeColors.body }}>
			&ldquo;{testimonial.text}&rdquo;
		</p>

		{/* Project badge */}
		<div
			className="inline-block px-3 py-1 rounded-full mb-5"
			style={{
				backgroundColor: `${themeColors.accent2}15`,
				color: themeColors.accent3,
			}}>
			<span className="font-body text-[11px] font-medium">
				{testimonial.project}
			</span>
		</div>

		{/* Author */}
		<div
			className="flex items-center gap-3 pt-4"
			style={{ borderTop: `1px solid ${themeColors.border}` }}>
			<div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
				<Image
					src={testimonial.image}
					alt={testimonial.name}
					fill
					className="object-cover"
				/>
			</div>
			<div>
				<h4
					className="font-heading text-sm font-semibold"
					style={{ color: themeColors.heading }}>
					{testimonial.name}
				</h4>
				<p
					className="font-body text-xs"
					style={{ color: themeColors.muted }}>
					{testimonial.role} &bull; {testimonial.location}
				</p>
			</div>
		</div>
	</div>
);

/* ─── Mobile Carousel with scroll-snap ─── */
const MobileCarousel = ({ themeColors }: { themeColors: any }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [activeIdx, setActiveIdx] = useState(0);
	const autoplayRef = useRef<NodeJS.Timeout | null>(null);

	const scrollToIndex = useCallback((index: number) => {
		if (!scrollRef.current) return;
		const container = scrollRef.current;
		const cards = container.children;
		if (cards[index]) {
			const card = cards[index] as HTMLElement;
			const scrollLeft =
				card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
			container.scrollTo({ left: scrollLeft, behavior: "smooth" });
		}
	}, []);

	// Track scroll position to update active index
	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const handleScroll = () => {
			const center = container.scrollLeft + container.offsetWidth / 2;
			const cards = Array.from(container.children) as HTMLElement[];
			let closestIdx = 0;
			let closestDist = Infinity;
			cards.forEach((card, i) => {
				const cardCenter = card.offsetLeft + card.offsetWidth / 2;
				const dist = Math.abs(center - cardCenter);
				if (dist < closestDist) {
					closestDist = dist;
					closestIdx = i;
				}
			});
			setActiveIdx(closestIdx);
		};

		container.addEventListener("scroll", handleScroll, { passive: true });
		return () => container.removeEventListener("scroll", handleScroll);
	}, []);

	// Autoplay
	useEffect(() => {
		const startAutoplay = () => {
			autoplayRef.current = setInterval(() => {
				setActiveIdx((prev) => {
					const next = (prev + 1) % testimonials.length;
					scrollToIndex(next);
					return next;
				});
			}, 5000);
		};

		startAutoplay();

		// Pause on touch
		const container = scrollRef.current;
		const pause = () => {
			if (autoplayRef.current) clearInterval(autoplayRef.current);
		};
		const resume = () => {
			pause();
			startAutoplay();
		};

		container?.addEventListener("touchstart", pause);
		container?.addEventListener("touchend", resume);

		return () => {
			if (autoplayRef.current) clearInterval(autoplayRef.current);
			container?.removeEventListener("touchstart", pause);
			container?.removeEventListener("touchend", resume);
		};
	}, [scrollToIndex]);

	return (
		<div className="md:hidden">
			{/* Scrollable container */}
			<div
				ref={scrollRef}
				className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-[7.5vw] pb-4"
				style={{
					scrollbarWidth: "none",
					msOverflowStyle: "none",
					WebkitOverflowScrolling: "touch",
				}}>
				{testimonials.map((t, i) => (
					<MobileTestimonialCard
						key={t.id}
						testimonial={t}
						isActive={i === activeIdx}
						themeColors={themeColors}
					/>
				))}
			</div>

			{/* Progress dots */}
			<div className="flex items-center justify-center gap-2 mt-6">
				{testimonials.map((_, i) => (
					<button
						key={i}
						onClick={() => {
							setActiveIdx(i);
							scrollToIndex(i);
						}}
						className="transition-all duration-400 rounded-full"
						style={{
							width: i === activeIdx ? 28 : 8,
							height: 8,
							backgroundColor:
								i === activeIdx
									? themeColors.secondary
									: `${themeColors.textOnDark}30`,
						}}
						aria-label={`Go to testimonial ${i + 1}`}
					/>
				))}
			</div>

			{/* Hide scrollbar */}
			<style jsx>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
			`}</style>
		</div>
	);
};

/* ─── Main Component ─── */
const Testimonials = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

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
			{/* Background decorations */}
			<div
				className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
				style={{ backgroundColor: currentTheme.colors.secondary }}
			/>
			<div
				className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
				style={{ backgroundColor: currentTheme.colors.accent2 }}
			/>
			<Quote
				className="absolute top-20 left-10 opacity-5 hidden md:block"
				size={300}
				style={{ color: currentTheme.colors.textOnDark }}
			/>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				{/* Header */}
				<div className="testimonials-header text-center mb-16">
					<span
						className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
						style={{ color: currentTheme.colors.secondary }}>
						Our journey
					</span>
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
						style={{ color: currentTheme.colors.textOnDark }}>
						A few of our Esteemed Clients
					</h2>
					<CurvedUnderline width="160" className="mx-auto mb-6" />
				</div>
				{/* ═══ Client Logos Section ═══ */}
				<ClientLogos />

				{/* Swiper custom bullet styles */}
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
