"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight, Play, Star } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

const Hero = () => {
	const { currentTheme } = useTheme();
	const heroRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const statsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			gsap.set(
				[
					".hero-title",
					".hero-subtitle",
					".hero-text",
					".hero-buttons",
					".hero-stats",
				],
				{
					opacity: 0,
					y: 50,
				},
			);
			gsap.set(".hero-image", { opacity: 0, scale: 1.1 });
			gsap.set(".hero-badge", { opacity: 0, x: -30 });
			gsap.set(".floating-card", { opacity: 0, y: 30 });

			tl.to(".hero-badge", { opacity: 1, x: 0, duration: 0.6 }, 0.3)
				.to(".hero-title", { opacity: 1, y: 0, duration: 0.8 }, 0.4)
				.to(".hero-subtitle", { opacity: 1, y: 0, duration: 0.8 }, 0.6)
				.to(".hero-text", { opacity: 1, y: 0, duration: 0.6 }, 0.8)
				.to(".hero-buttons", { opacity: 1, y: 0, duration: 0.6 }, 1)
				.to(".hero-stats", { opacity: 1, y: 0, duration: 0.6 }, 1.1)
				.to(".hero-image", { opacity: 1, scale: 1, duration: 1 }, 0.5)
				.to(
					".floating-card",
					{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
					1.2,
				);

			gsap.to(".hero-image", {
				yPercent: 20,
				ease: "none",
				scrollTrigger: {
					trigger: heroRef.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});

			gsap.to(".beam-element", {
				y: 20,
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	const stats = [
		{ value: "10+", label: "Years Experience" },
		{ value: "50+", label: "Major Projects" },
		{ value: "50m", label: "Max Depth Capacity" },
	];

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen flex items-center overflow-hidden pt-20"
			style={{ backgroundColor: currentTheme.colors.lightBg }}>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-30">
				<div
					className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
					style={{
						backgroundColor: currentTheme.colors.secondary,
						opacity: 0.2,
					}}
				/>
				<div
					className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
					style={{
						backgroundColor: currentTheme.colors.accent2,
						opacity: 0.2,
					}}
				/>
			</div>

			{/* Beam Decoration */}
			{/* <div
				className="beam-element absolute top-0 right-1/4 w-8 h-32 rounded-b-full opacity-60"
				style={{ backgroundColor: currentTheme.colors.secondary }}
			/>
			<div
				className="beam-element absolute top-0 right-1/3 w-6 h-24 rounded-b-full opacity-40"
				style={{ backgroundColor: currentTheme.colors.accent1 }}
			/> */}

			<div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Content */}
					<div ref={contentRef} className="relative z-10">
						{/* Badge */}
						<div
							className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
							style={{
								backgroundColor: `${currentTheme.colors.secondary}15`,
								border: `1px solid ${currentTheme.colors.secondary}30`,
							}}>
							<Star
								size={16}
								style={{ color: currentTheme.colors.secondary }}
								fill={currentTheme.colors.secondary}
							/>
							<span
								className="font-body text-sm font-medium"
								style={{ color: currentTheme.colors.secondary }}>
								Delhi NCR&apos;s Leading Deep Foundation Experts
							</span>
						</div>

						{/* Title */}
						<h1
							className="hero-title font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-2"
							style={{ color: currentTheme.colors.heading }}>
							The Underground
						</h1>
						<h2
							className="hero-subtitle font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							Force in Engineering
							<CurvedUnderline width="200" className="mt-2" />
						</h2>

						<p
							className="hero-text font-body text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
							style={{ color: currentTheme.colors.body }}>
							Specialized engineering services for diaphragm wall
							construction, deep foundations, and underground structures.
							Precision engineering, safety-first approach, and on-time
							project delivery since 2014.
						</p>

						{/* Buttons */}
						<div className="hero-buttons flex flex-wrap gap-4 mb-12">
							<Link
								href="/contact"
								className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
								style={{
									backgroundColor: currentTheme.colors.cta,
									color: currentTheme.colors.ctaText,
								}}>
								Get Free Consultation
								<ArrowRight
									size={20}
									className="transition-transform duration-300 group-hover:translate-x-1"
								/>
							</Link>
							<button
								className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105"
								style={{
									backgroundColor: "transparent",
									color: currentTheme.colors.primary,
									border: `2px solid ${currentTheme.colors.primary}`,
								}}>
								<span
									className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
									style={{
										backgroundColor: currentTheme.colors.primary,
									}}>
									<Play size={16} fill="white" color="white" />
								</span>
								View Our Projects
							</button>
						</div>

						{/* Stats */}
						<div
							ref={statsRef}
							className="hero-stats flex flex-wrap gap-8 md:gap-12">
							{stats.map((stat, index) => (
								<div key={index} className="text-center md:text-left">
									<div
										className="font-heading text-3xl md:text-4xl font-bold"
										style={{ color: currentTheme.colors.primary }}>
										{stat.value}
									</div>
									<div
										className="font-body text-sm"
										style={{ color: currentTheme.colors.muted }}>
										{stat.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Image Side */}
					<div ref={imageRef} className="relative lg:h-[600px]">
						{/* Main Image */}
						<div className="hero-image relative h-[400px] lg:h-full rounded-3xl overflow-hidden shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2031&auto=format&fit=crop"
								alt="Professional construction site"
								fill
								className="object-cover"
								priority
							/>
							{/* Gradient Overlay */}
							<div
								className="absolute inset-0"
								style={{
									background: `linear-gradient(135deg, ${currentTheme.colors.primary}20 0%, transparent 60%)`,
								}}
							/>
						</div>

						{/* Floating Card 1 - Rating */}
						<div
							className="floating-card absolute -left-8 top-1/4 p-4 rounded-2xl shadow-xl backdrop-blur-sm"
							style={{
								backgroundColor: `${currentTheme.colors.lightBg}f0`,
								border: `1px solid ${currentTheme.colors.border}`,
							}}>
							<div className="flex items-center gap-3">
								<div
									className="w-12 h-12 rounded-xl flex items-center justify-center"
									style={{
										backgroundColor: `${currentTheme.colors.secondary}20`,
									}}>
									<Star
										size={24}
										style={{ color: currentTheme.colors.secondary }}
										fill={currentTheme.colors.secondary}
									/>
								</div>
								<div>
									<div className="flex items-center gap-1 mb-1">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={14}
												style={{
													color: currentTheme.colors.secondary,
												}}
												fill={currentTheme.colors.secondary}
											/>
										))}
									</div>
									<p
										className="font-body text-sm font-medium"
										style={{ color: currentTheme.colors.heading }}>
										4.9/5 Rating
									</p>
									<p
										className="font-body text-xs"
										style={{ color: currentTheme.colors.muted }}>
										500+ Reviews
									</p>
								</div>
							</div>
						</div>

						{/* Floating Card 2 - Before/After */}
						<div
							className="floating-card absolute -right-4 bottom-1/4 p-4 rounded-2xl shadow-xl backdrop-blur-sm"
							style={{
								backgroundColor: `${currentTheme.colors.lightBg}f0`,
								border: `1px solid ${currentTheme.colors.border}`,
							}}>
							<div className="flex items-center gap-3">
								<div className="flex -space-x-4">
									<div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white">
										<Image
											src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=200"
											alt="Before"
											width={56}
											height={56}
											className="object-cover w-full h-full"
										/>
									</div>
									<div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white">
										<Image
											src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=200"
											alt="After"
											width={56}
											height={56}
											className="object-cover w-full h-full"
										/>
									</div>
								</div>
								<div>
									<p
										className="font-body text-sm font-medium"
										style={{ color: currentTheme.colors.heading }}>
										Amazing Results
									</p>
									<p
										className="font-body text-xs"
										style={{ color: currentTheme.colors.muted }}>
										See Transformations
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
				<span
					className="font-body text-xs tracking-wider"
					style={{ color: currentTheme.colors.muted }}>
					SCROLL
				</span>
				<div
					className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
					style={{ borderColor: currentTheme.colors.border }}>
					<div
						className="w-1 h-2 rounded-full animate-bounce"
						style={{ backgroundColor: currentTheme.colors.secondary }}
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
