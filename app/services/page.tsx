"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Home,
	Building2,
	Wrench,
	HardHat,
	Ruler,
	Layers,
	Check,
	ArrowRight,
	Star,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "@/components/CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
	const { currentTheme } = useTheme();
	const pageRef = useRef<HTMLDivElement>(null);

	const services = [
		{
			id: "diaphragm-wall",
			icon: Layers,
			title: "Diaphragm Wall",
			subtitle: "Deep Foundation Excellence",
			description:
				"Our core expertise — construction of reinforced concrete diaphragm walls suited for deep basements in unstable soil profiles, even in high water table areas. Used as permanent retaining walls and integrated into building structures.",
			image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
			features: [
				"Wall thickness 300mm to 1500mm",
				"Up to 50m depth capability",
				"Suitable for high water table areas",
				"No vibration during installation",
				"Flexible system in plan layout",
				"Easily incorporated into permanent works",
			],
			areas: [
				"Basements",
				"Metro Stations",
				"Underpasses",
				"Waterfront",
				"Hospitals",
				"Commercial",
			],
			startingPrice: "Custom Quote",
		},
		{
			id: "top-down",
			icon: Building2,
			title: "Top-Down Construction",
			subtitle: "Simultaneous Build Technique",
			description:
				"Advanced construction methodology allowing basement excavation while simultaneously building the superstructure. Ideal for metro projects and urban environments where minimizing construction time is critical.",
			image: "/images/image10.jpeg",
			features: [
				"Reduces overall construction time",
				"Suitable for congested urban areas",
				"Ideal for metro projects",
				"Minimizes disruption to surroundings",
				"Works with diaphragm wall system",
				"Proven for deep multi-level basements",
			],
			areas: [
				"Metro Stations",
				"Urban Buildings",
				"Deep Basements",
				"Commercial Hubs",
				"Infrastructure",
				"Mixed-Use",
			],
			startingPrice: "Custom Quote",
		},
		{
			id: "shoring-piling",
			icon: HardHat,
			title: "Shoring & Piling",
			subtitle: "Earth Retention Systems",
			description:
				"Comprehensive shoring and piling solutions for temporary and permanent earth retention. Our experienced team handles complex geotechnical conditions with precision.",
			image: "/images/image12.jpeg",
			features: [
				"Temporary earth retention",
				"Permanent piling solutions",
				"Load-bearing piles",
				"Secant pile walls",
				"Contiguous piling",
				"Soldier pile walls",
			],
			areas: [
				"Excavation Support",
				"Building Foundations",
				"Retaining Structures",
				"Slope Stabilization",
				"Bridge Works",
				"Industrial",
			],
			startingPrice: "Custom Quote",
		},
		{
			id: "soil-anchoring",
			icon: Ruler,
			title: "Soil Anchoring",
			subtitle: "Precision Ground Support",
			description:
				"High-capacity soil anchoring systems with crawler anchor rigs and compressors. Our stressing and monitoring expertise ensures long-term stability for retaining walls and deep excavations.",
			image: "/images/image9.jpeg",
			features: [
				"High-capacity anchors",
				"Crawler anchor rigs",
				"Precision stressing",
				"Load monitoring",
				"Slope stabilization",
				"Retaining wall support",
			],
			areas: [
				"Retaining Walls",
				"Deep Excavations",
				"Slope Stability",
				"Dam Projects",
				"Highway Cuts",
				"Underground Works",
			],
			startingPrice: "Custom Quote",
		},
		{
			id: "sheet-piling",
			icon: Layers,
			title: "Sheet Piling",
			subtitle: "Water & Earth Retention",
			description:
				"Steel sheet piling for temporary and permanent water retention, cofferdam construction, and earth retention in waterfront and high water table projects.",
			image: "/images/image1.jpeg",
			features: [
				"Cofferdam construction",
				"Waterfront retention",
				"Temporary excavation support",
				"Seepage control in dams",
				"Quick installation",
				"Reusable systems",
			],
			areas: [
				"Waterfront",
				"River Projects",
				"Dam Seepage",
				"Cofferdams",
				"Excavation",
				"Flood Control",
			],
			startingPrice: "Custom Quote",
		},
		{
			id: "micro-piling",
			icon: Wrench,
			title: "Micro Piling & Vibrofloatation",
			subtitle: "Specialized Ground Solutions",
			description:
				"Micro piling for restricted access and underpinning applications, combined with vibrofloatation ground improvement for densifying loose granular soils.",
			image: "/images/image14.jpeg",
			features: [
				"Restricted access solutions",
				"Underpinning existing structures",
				"Low headroom capability",
				"Ground improvement",
				"Soil densification",
				"Bearing capacity enhancement",
			],
			areas: [
				"Underpinning",
				"Heritage Structures",
				"Low Headroom",
				"Ground Improvement",
				"Industrial Sites",
				"Foundation Repair",
			],
			startingPrice: "Custom Quote",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".services-hero-content > *",
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.15,
					ease: "power3.out",
					delay: 0.3,
				},
			);
			gsap.fromTo(
				".service-detail-card",
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.2,
					ease: "power3.out",
					scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
				},
			);
		}, pageRef);
		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={pageRef}
			style={{ backgroundColor: currentTheme.colors.lightBg }}>
			<section
				className="relative pt-32 pb-20 overflow-hidden"
				style={{
					background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
				}}>
				<div
					className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
					style={{ backgroundColor: currentTheme.colors.secondary }}
				/>
				<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
					<div className="services-hero-content max-w-3xl">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							Our Services
						</span>
						<h1
							className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
							style={{ color: currentTheme.colors.textOnDark }}>
							Specialized Deep Foundation Services
						</h1>
						<CurvedUnderline width="200" className="mb-6" />
						<p
							className="font-body text-lg md:text-xl leading-relaxed mb-8"
							style={{ color: `${currentTheme.colors.textOnDark}cc` }}>
							From diaphragm walls to deep excavation works, we deliver
							specialized geotechnical engineering services. Every
							project receives our engineering precision and safety-first
							approach.
						</p>
						<div className="flex flex-wrap gap-4">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold transition-all duration-300 hover:scale-105"
								style={{
									backgroundColor: currentTheme.colors.secondary,
									color: currentTheme.colors.ctaText,
								}}>
								Get Free Consultation <ArrowRight size={20} />
							</Link>
							<a
								href="tel:+918080850001"
								className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold transition-all duration-300"
								style={{
									backgroundColor: "transparent",
									color: currentTheme.colors.textOnDark,
									border: `2px solid ${currentTheme.colors.textOnDark}50`,
								}}>
								Call +91 8080850001
							</a>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 lg:py-28">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="services-grid space-y-20">
						{services.map((service, index) => (
							<div
								key={service.id}
								id={service.id}
								className={`service-detail-card grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
								<div
									className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
									<div className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
										<Image
											src={service.image}
											alt={service.title}
											fill
											className="object-cover"
										/>
										<div
											className="absolute inset-0"
											style={{
												background: `linear-gradient(135deg, ${currentTheme.colors.primary}30 0%, transparent 60%)`,
											}}
										/>
									</div>
									<div
										className="absolute -bottom-6 -right-6 p-6 rounded-2xl shadow-xl"
										style={{
											backgroundColor: currentTheme.colors.secondary,
										}}>
										<span
											className="block font-body text-xs uppercase tracking-wider mb-1"
											style={{
												color: `${currentTheme.colors.ctaText}99`,
											}}>
											Starting From
										</span>
										<span
											className="block font-heading text-2xl font-bold"
											style={{ color: currentTheme.colors.ctaText }}>
											{service.startingPrice}
										</span>
									</div>
								</div>
								<div
									className={
										index % 2 === 1
											? "lg:col-start-1 lg:row-start-1"
											: ""
									}>
									<div
										className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
										style={{
											backgroundColor: `${currentTheme.colors.secondary}20`,
										}}>
										<service.icon
											size={32}
											style={{
												color: currentTheme.colors.secondary,
											}}
										/>
									</div>
									<span
										className="font-body text-sm font-semibold tracking-wider uppercase"
										style={{ color: currentTheme.colors.secondary }}>
										{service.subtitle}
									</span>
									<h2
										className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-4"
										style={{ color: currentTheme.colors.heading }}>
										{service.title}
									</h2>
									<CurvedUnderline width="120" className="mb-6" />
									<p
										className="font-body text-base leading-relaxed mb-8"
										style={{ color: currentTheme.colors.body }}>
										{service.description}
									</p>
									<div className="grid sm:grid-cols-2 gap-3 mb-8">
										{service.features.map((feature, i) => (
											<div
												key={i}
												className="flex items-start gap-3">
												<div
													className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
													style={{
														backgroundColor: `${currentTheme.colors.success}20`,
													}}>
													<Check
														size={12}
														style={{
															color: currentTheme.colors.success,
														}}
													/>
												</div>
												<span
													className="font-body text-sm"
													style={{
														color: currentTheme.colors.body,
													}}>
													{feature}
												</span>
											</div>
										))}
									</div>
									<div className="flex flex-wrap gap-2 mb-8">
										{service.areas.map((area, i) => (
											<span
												key={i}
												className="px-4 py-1.5 rounded-full font-body text-xs font-medium"
												style={{
													backgroundColor:
														currentTheme.colors.cardBg,
													color: currentTheme.colors.body,
													border: `1px solid ${currentTheme.colors.border}`,
												}}>
												{area}
											</span>
										))}
									</div>
									<Link
										href="/contact"
										className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-semibold transition-all duration-300 hover:scale-105"
										style={{
											backgroundColor: currentTheme.colors.cta,
											color: currentTheme.colors.ctaText,
										}}>
										Request Quote for {service.title}{" "}
										<ArrowRight size={18} />
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				className="py-20 lg:py-28"
				style={{ backgroundColor: currentTheme.colors.cardBg }}>
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							Why Choose Us
						</span>
						<h2
							className="font-heading text-3xl md:text-4xl font-bold mb-4"
							style={{ color: currentTheme.colors.heading }}>
							The VIEPL Advantage
						</h2>
						<CurvedUnderline width="160" className="mx-auto" />
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{
								icon: Star,
								title: "International Machinery",
								desc: "Equipment fleet unmatched in India for D-Wall",
							},
							{
								icon: Check,
								title: "Safety Certified",
								desc: "Zero incident goal across all operations",
							},
							{
								icon: HardHat,
								title: "Expert Engineers",
								desc: "Highly skilled technical team in piling & D-Wall",
							},
							{
								icon: Layers,
								title: "On-Time Delivery",
								desc: "Completion of projects within timeline",
							},
						].map((item, index) => (
							<div
								key={index}
								className="text-center p-8 rounded-2xl transition-all duration-300 hover:scale-105"
								style={{
									backgroundColor: currentTheme.colors.lightBg,
									border: `1px solid ${currentTheme.colors.border}`,
								}}>
								<div
									className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
									style={{
										backgroundColor: `${currentTheme.colors.secondary}20`,
									}}>
									<item.icon
										size={28}
										style={{ color: currentTheme.colors.secondary }}
									/>
								</div>
								<h3
									className="font-heading text-xl font-semibold mb-2"
									style={{ color: currentTheme.colors.heading }}>
									{item.title}
								</h3>
								<p
									className="font-body text-sm"
									style={{ color: currentTheme.colors.muted }}>
									{item.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section
				className="py-20 lg:py-28"
				style={{
					background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
				}}>
				<div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
						style={{ color: currentTheme.colors.textOnDark }}>
						Ready to Start Your Foundation?
					</h2>
					<p
						className="font-body text-lg mb-10"
						style={{ color: `${currentTheme.colors.textOnDark}cc` }}>
						Contact us for specialized deep foundation and underground
						construction solutions across Delhi NCR.
					</p>
					<Link
						href="/contact"
						className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-body font-bold text-lg transition-all duration-300 hover:scale-105"
						style={{
							backgroundColor: currentTheme.colors.secondary,
							color: currentTheme.colors.ctaText,
						}}>
						Get Your Free Consultation <ArrowRight size={24} />
					</Link>
				</div>
			</section>
		</div>
	);
}
