"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Home,
	Building2,
	Ruler,
	HardHat,
	Wrench,
	Layers,
	ArrowRight,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);

	const services = [
		{
			icon: Layers,
			title: "Diaphragm Wall",
			description:
				"Specialized construction of reinforced concrete walls built in-situ, suited for deep basements and retaining structures in unstable soil profiles.",
			image: "/images/image1.jpeg",
			features: [
				"300-1500mm Width",
				"Up to 50m Depth",
				"Congested Areas",
				"High Water Table",
			],
		},
		{
			icon: Building2,
			title: "Top-Down Construction",
			description:
				"Advanced construction technique allowing simultaneous basement and superstructure work, ideal for metro projects and deep basements.",
			image: "/images/image13.jpeg",
			features: [
				"Metro Projects",
				"Deep Basements",
				"Time Saving",
				"Cost Effective",
			],
		},
		{
			icon: Layers,
			title: "Shoring & Piling",
			description:
				"Comprehensive shoring and piling solutions for temporary and permanent earth retention systems in complex geotechnical conditions.",
			image: "/images/image12.jpeg",
			features: [
				"Earth Retention",
				"Load Bearing",
				"Temporary Works",
				"Permanent Piles",
			],
		},
		{
			icon: HardHat,
			title: "Soil Anchoring",
			description:
				"High-capacity soil anchoring systems for slope stabilization and retaining wall support with precision stressing and monitoring.",
			image: "/images/image9.jpeg",
			features: [
				"Slope Stability",
				"Retaining Walls",
				"Stressing",
				"Monitoring",
			],
		},
		{
			icon: Ruler,
			title: "Sheet Piling & Micro Piling",
			description:
				"Steel sheet piling for water retention and micro piling solutions for restricted access and underpinning applications.",
			image: "/images/image14.jpeg",
			features: [
				"Water Retention",
				"Underpinning",
				"Restricted Access",
				"Light Structures",
			],
		},
		{
			icon: Wrench,
			title: "Vibrofloatation",
			description:
				"Ground improvement technique using vibratory probes to densify loose granular soils for improved bearing capacity.",
			image: "/images/image15.jpeg",
			features: [
				"Soil Densification",
				"Ground Improvement",
				"Bearing Capacity",
				"Settlement Control",
			],
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".services-header",
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".services-header",
						start: "top 85%",
					},
				},
			);

			gsap.fromTo(
				".service-card",
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.12,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".services-grid",
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
			style={{ backgroundColor: currentTheme.colors.cardBg }}>
			<div
				className="absolute top-0 left-0 w-full h-24 opacity-50"
				style={{
					background: `linear-gradient(180deg, ${currentTheme.colors.lightBg} 0%, transparent 100%)`,
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				{/* Header */}
				<div className="services-header text-center mb-16 lg:mb-20">
					<span
						className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
						style={{ color: currentTheme.colors.secondary }}>
						What We Offer
					</span>
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
						style={{ color: currentTheme.colors.heading }}>
						Our Specialized Services
					</h2>
					<CurvedUnderline width="180" className="mx-auto mb-6" />
					<p
						className="font-body text-lg max-w-2xl mx-auto"
						style={{ color: currentTheme.colors.body }}>
						From diaphragm walls to deep foundations, we deliver
						specialized geotechnical engineering services across the Delhi
						NCR region.
					</p>
				</div>

				{/* Services Grid */}
				<div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{services.map((service, index) => (
						<div
							key={index}
							className="service-card group relative rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
							style={{
								backgroundColor: currentTheme.colors.lightBg,
								border: `1px solid ${currentTheme.colors.border}`,
							}}>
							{/* Image */}
							<div className="relative h-48 overflow-hidden">
								<Image
									src={service.image}
									alt={service.title}
									fill
									className="object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div
									className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-70"
									style={{
										background: `linear-gradient(180deg, transparent 0%, ${currentTheme.colors.primary}90 100%)`,
										opacity: 0.6,
									}}
								/>
								{/* Icon Badge */}
								<div
									className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
									style={{
										backgroundColor: `${currentTheme.colors.secondary}e0`,
									}}>
									<service.icon
										size={24}
										style={{ color: currentTheme.colors.ctaText }}
									/>
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<h3
									className="font-heading text-xl font-semibold mb-3 transition-colors duration-300 group-hover:text-secondary"
									style={{ color: currentTheme.colors.heading }}>
									{service.title}
								</h3>
								<p
									className="font-body text-sm leading-relaxed mb-4"
									style={{ color: currentTheme.colors.body }}>
									{service.description}
								</p>

								{/* Features */}
								<div className="flex flex-wrap gap-2 mb-4">
									{service.features.map((feature, i) => (
										<span
											key={i}
											className="font-body text-xs px-3 py-1 rounded-full"
											style={{
												backgroundColor: `${currentTheme.colors.secondary}15`,
												color: currentTheme.colors.secondary,
											}}>
											{feature}
										</span>
									))}
								</div>

								{/* Link */}
								<Link
									href="/services"
									className="inline-flex items-center gap-2 font-body text-sm font-semibold transition-all duration-300 group/link"
									style={{ color: currentTheme.colors.primary }}>
									Learn More
									<ArrowRight
										size={16}
										className="transition-transform duration-300 group-hover/link:translate-x-1"
									/>
								</Link>
							</div>

							{/* Hover Border Effect */}
							<div
								className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
								style={{
									border: `2px solid ${currentTheme.colors.secondary}`,
								}}
							/>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="text-center mt-12 lg:mt-16">
					<Link
						href="/services"
						className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
						style={{
							backgroundColor: currentTheme.colors.cta,
							color: currentTheme.colors.ctaText,
						}}>
						Explore All Services
						<ArrowRight size={20} />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Services;
