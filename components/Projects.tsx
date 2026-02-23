"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Building2,
	TrainFront,
	HeartPulse,
	Landmark,
	Construction,
	Layers,
	MapPin,
	ArrowRight,
	ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

interface ProjectGroup {
	client: string;
	icon: React.ElementType;
	accent: string;
	projects: string[];
}

const Projects = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);
	const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
	const [hoveredProject, setHoveredProject] = useState<number | null>(null);

	const projectGroups: ProjectGroup[] = [
		{
			client: "DLF",
			icon: Building2,
			accent: "#1a73e8",
			projects: ["City Centre Phase 1", "Motinagar, Delhi"],
		},
		{
			client: "L&T",
			icon: Construction,
			accent: "#e65100",
			projects: [
				"CCS CPWD",
				"Chatarpur Metro DMRC",
				"Chatarpur Mandir DMRC",
				"Realty Noida",
			],
		},
		{
			client: "Max Hospital",
			icon: HeartPulse,
			accent: "#00897b",
			projects: ["Saket", "Patparganj", "Sector 56, Gurgaon", "Mohali"],
		},
		{
			client: "NBCC",
			icon: Landmark,
			accent: "#5c6bc0",
			projects: [
				"GLC Project, Sarojini Nagar",
				"VCL Sarojini Nagar",
				"NKG Netaji Nagar",
			],
		},
		{
			client: "Deepak Builders",
			icon: Layers,
			accent: "#ef6c00",
			projects: [
				"Ayush Hospital",
				"Pakhowal Underpass, Ludhiana",
				"PGI Chandigarh",
				"Atul Kataria Chowk Underpass",
			],
		},
		{
			client: "DMRC / Metro",
			icon: TrainFront,
			accent: "#d32f2f",
			projects: ["HCC Project Krishna Park"],
		},
	];

	const marqueeProjects = [
		"NCC Nauroji Nagar WTC",
		"BHEL Shalimar Sector 16",
		"Hines Gurgaon Udyog Vihar",
		"GSBA Chanakyapuri CPWD",
		"Ghazipur Chilla DDA Project",
		"Cadence NSEZ Noida",
		"Pavitra Sector 62 Noida",
		"Mahagun Sector 128 Noida",
		"M3M Noida Sector 72",
		"Elan Sector 106 Gurgaon",
		"CTC Project Motinagar",
		"Paras Sector 133 Noida",
		"Okaya Project Sector 128",
		"Noida Authority Underpass",
		"BHEL Shalimar Sector 16",
	];

	const totalProjects =
		projectGroups.reduce((sum, g) => sum + g.projects.length, 0) +
		marqueeProjects.length;

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".projects-header",
				{ opacity: 0, y: 50 },
				{
					opacity: 1,
					y: 0,
					duration: 0.9,
					ease: "power3.out",
					scrollTrigger: { trigger: ".projects-header", start: "top 85%" },
				},
			);

			gsap.fromTo(
				".project-counter",
				{ opacity: 0, scale: 0.8 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					ease: "back.out(1.7)",
					scrollTrigger: { trigger: ".project-counter", start: "top 85%" },
				},
			);

			gsap.fromTo(
				".project-group-card",
				{ opacity: 0, y: 60, rotateX: 8 },
				{
					opacity: 1,
					y: 0,
					rotateX: 0,
					duration: 0.7,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
				},
			);

			gsap.fromTo(
				".marquee-section",
				{ opacity: 0 },
				{
					opacity: 1,
					duration: 1,
					ease: "power2.out",
					scrollTrigger: { trigger: ".marquee-section", start: "top 90%" },
				},
			);
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	const toggleGroup = (index: number) => {
		setExpandedGroup(expandedGroup === index ? null : index);
	};

	return (
		<section
			ref={sectionRef}
			className="py-24 lg:py-32 relative overflow-hidden"
			style={{ backgroundColor: currentTheme.colors.lightBg }}>
			{/* Background Decorations */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div
					className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07]"
					style={{ backgroundColor: currentTheme.colors.secondary }}
				/>
				<div
					className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]"
					style={{ backgroundColor: currentTheme.colors.primary }}
				/>
				{/* Subtle grid pattern */}
				<div
					className="absolute inset-0 opacity-[0.03]"
					style={{
						backgroundImage: `linear-gradient(${currentTheme.colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${currentTheme.colors.primary} 1px, transparent 1px)`,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			<div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
				{/* Header */}
				<div className="projects-header text-center mb-8">
					<span
						className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
						style={{ color: currentTheme.colors.secondary }}>
						Our Track Record
					</span>
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
						style={{ color: currentTheme.colors.heading }}>
						Prestigious Projects
					</h2>
					<CurvedUnderline width="180" className="mx-auto mb-6" />
					<p
						className="font-body text-lg max-w-2xl mx-auto"
						style={{ color: currentTheme.colors.body }}>
						Landmark projects executed across North India in collaboration
						with the country&apos;s leading developers and infrastructure
						companies.
					</p>
				</div>

				{/* Counter Badge */}
				<div className="project-counter flex justify-center mb-14">
					<div
						className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl"
						style={{
							backgroundColor: currentTheme.colors.cardBg,
							border: `1px solid ${currentTheme.colors.border}`,
							boxShadow: `0 4px 24px ${currentTheme.colors.primary}10`,
						}}>
						<div className="text-center">
							<span
								className="block font-heading text-3xl font-bold"
								style={{ color: currentTheme.colors.secondary }}>
								{totalProjects}+
							</span>
							<span
								className="font-body text-xs uppercase tracking-wider"
								style={{ color: currentTheme.colors.muted }}>
								Projects
							</span>
						</div>
						<div
							className="w-px h-10"
							style={{ backgroundColor: currentTheme.colors.border }}
						/>
						<div className="text-center">
							<span
								className="block font-heading text-3xl font-bold"
								style={{ color: currentTheme.colors.secondary }}>
								{projectGroups.length + 10}+
							</span>
							<span
								className="font-body text-xs uppercase tracking-wider"
								style={{ color: currentTheme.colors.muted }}>
								Clients
							</span>
						</div>
						<div
							className="w-px h-10"
							style={{ backgroundColor: currentTheme.colors.border }}
						/>
						<div className="text-center">
							<span
								className="block font-heading text-3xl font-bold"
								style={{ color: currentTheme.colors.secondary }}>
								10+
							</span>
							<span
								className="font-body text-xs uppercase tracking-wider"
								style={{ color: currentTheme.colors.muted }}>
								Cities
							</span>
						</div>
					</div>
				</div>

				{/* Major Clients Grid */}
				<div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
					{projectGroups.map((group, index) => {
						const isExpanded = expandedGroup === index;
						const isHovered = hoveredProject === index;
						const Icon = group.icon;

						return (
							<div
								key={index}
								className="project-group-card relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
								style={{
									backgroundColor: currentTheme.colors.cardBg,
									border: `1px solid ${isHovered ? currentTheme.colors.secondary : currentTheme.colors.border}`,
									boxShadow: isHovered
										? `0 12px 40px ${currentTheme.colors.secondary}15`
										: `0 2px 12px ${currentTheme.colors.primary}08`,
									transform: isHovered
										? "translateY(-4px)"
										: "translateY(0)",
								}}
								onMouseEnter={() => setHoveredProject(index)}
								onMouseLeave={() => setHoveredProject(null)}
								onClick={() => toggleGroup(index)}>
								{/* Top Accent Bar */}
								<div
									className="h-1 w-full transition-all duration-500"
									style={{
										background: isHovered
											? `linear-gradient(90deg, ${group.accent}, ${currentTheme.colors.secondary})`
											: `linear-gradient(90deg, ${group.accent}60, ${currentTheme.colors.secondary}40)`,
									}}
								/>

								{/* Card Content */}
								<div className="p-6">
									{/* Header Row */}
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-4">
											<div
												className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
												style={{
													backgroundColor: `${group.accent}15`,
													transform: isHovered
														? "scale(1.1)"
														: "scale(1)",
												}}>
												<Icon
													size={24}
													style={{ color: group.accent }}
												/>
											</div>
											<div>
												<h3
													className="font-heading text-lg font-bold"
													style={{
														color: currentTheme.colors.heading,
													}}>
													{group.client}
												</h3>
												<span
													className="font-body text-xs"
													style={{
														color: currentTheme.colors.muted,
													}}>
													{group.projects.length} project
													{group.projects.length > 1 ? "s" : ""}
												</span>
											</div>
										</div>

										<div
											className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
											style={{
												backgroundColor: `${currentTheme.colors.secondary}10`,
												transform: isExpanded
													? "rotate(180deg)"
													: "rotate(0deg)",
											}}>
											<ChevronDown
												size={16}
												style={{
													color: currentTheme.colors.secondary,
												}}
											/>
										</div>
									</div>

									{/* Project Preview (always visible) */}
									<div className="flex flex-wrap gap-2 mb-2">
										{group.projects.slice(0, 2).map((project, i) => (
											<span
												key={i}
												className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs"
												style={{
													backgroundColor: `${currentTheme.colors.secondary}08`,
													color: currentTheme.colors.body,
													border: `1px solid ${currentTheme.colors.border}`,
												}}>
												<MapPin
													size={10}
													style={{
														color: currentTheme.colors.secondary,
													}}
												/>
												{project}
											</span>
										))}
										{group.projects.length > 2 && !isExpanded && (
											<span
												className="inline-flex items-center px-3 py-1.5 rounded-lg font-body text-xs font-medium"
												style={{
													backgroundColor: `${currentTheme.colors.secondary}12`,
													color: currentTheme.colors.secondary,
												}}>
												+{group.projects.length - 2} more
											</span>
										)}
									</div>

									{/* Expanded Projects */}
									<div
										className="overflow-hidden transition-all duration-500 ease-out"
										style={{
											maxHeight: isExpanded
												? `${group.projects.length * 44}px`
												: "0px",
											opacity: isExpanded ? 1 : 0,
										}}>
										<div
											className="pt-3 mt-3 space-y-2"
											style={{
												borderTop: `1px dashed ${currentTheme.colors.border}`,
											}}>
											{group.projects.slice(2).map((project, i) => (
												<div
													key={i}
													className="flex items-center gap-2.5 py-1.5">
													<div
														className="w-1.5 h-1.5 rounded-full flex-shrink-0"
														style={{
															backgroundColor:
																currentTheme.colors.secondary,
														}}
													/>
													<span
														className="font-body text-sm"
														style={{
															color: currentTheme.colors.body,
														}}>
														{project}
													</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Marquee - Other Notable Projects */}
				<div className="marquee-section relative">
					<div className="text-center mb-8">
						<span
							className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full"
							style={{
								backgroundColor: `${currentTheme.colors.secondary}10`,
								color: currentTheme.colors.secondary,
								border: `1px solid ${currentTheme.colors.secondary}20`,
							}}>
							And Many More
						</span>
					</div>

					{/* Marquee Container */}
					<div className="relative overflow-hidden py-4">
						{/* Fade edges */}
						<div
							className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
							style={{
								background: `linear-gradient(90deg, ${currentTheme.colors.lightBg} 0%, transparent 100%)`,
							}}
						/>
						<div
							className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
							style={{
								background: `linear-gradient(270deg, ${currentTheme.colors.lightBg} 0%, transparent 100%)`,
							}}
						/>

						{/* Row 1 - scrolls left */}
						<div className="flex gap-4 mb-4 animate-marquee-left">
							{[...marqueeProjects, ...marqueeProjects].map(
								(project, i) => (
									<div
										key={`r1-${i}`}
										className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm whitespace-nowrap transition-colors duration-300"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											color: currentTheme.colors.body,
											border: `1px solid ${currentTheme.colors.border}`,
										}}>
										<MapPin
											size={14}
											style={{
												color: currentTheme.colors.secondary,
											}}
										/>
										{project}
									</div>
								),
							)}
						</div>

						{/* Row 2 - scrolls right */}
						<div className="flex gap-4 animate-marquee-right">
							{[
								...marqueeProjects.slice().reverse(),
								...marqueeProjects.slice().reverse(),
							].map((project, i) => (
								<div
									key={`r2-${i}`}
									className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm whitespace-nowrap transition-colors duration-300"
									style={{
										backgroundColor: currentTheme.colors.cardBg,
										color: currentTheme.colors.body,
										border: `1px solid ${currentTheme.colors.border}`,
									}}>
									<MapPin
										size={14}
										style={{ color: currentTheme.colors.secondary }}
									/>
									{project}
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Bottom CTA */}
				<div className="text-center mt-14">
					<Link
						href="/about"
						className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
						style={{
							backgroundColor: currentTheme.colors.cta,
							color: currentTheme.colors.ctaText,
						}}>
						View All Projects
						<ArrowRight size={20} />
					</Link>
				</div>
			</div>

			{/* Marquee Animations */}
			<style jsx global>{`
				@keyframes marquee-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
				@keyframes marquee-right {
					0% {
						transform: translateX(-50%);
					}
					100% {
						transform: translateX(0);
					}
				}
				.animate-marquee-left {
					animation: marquee-left 40s linear infinite;
				}
				.animate-marquee-right {
					animation: marquee-right 45s linear infinite;
				}
				.animate-marquee-left:hover,
				.animate-marquee-right:hover {
					animation-play-state: paused;
				}
			`}</style>
		</section>
	);
};

export default Projects;
