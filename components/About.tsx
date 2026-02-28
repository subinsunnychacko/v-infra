"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Award, Users, Clock, Shield, ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);

	const features = [
		"International Standard Machinery",
		"300mm to 1500mm Wall Thickness",
		"Zero Incident Safety Goal",
		"On-Time Project Delivery",
		"Up to 50m Depth Capability",
		"Free Site Assessment",
	];

	const stats = [
		{ icon: Award, value: "16+", label: "Clients" },
		{ icon: Users, value: "33+", label: "Major Projects" },
		{ icon: Clock, value: "1500mm", label: "Max Wall Width" },
		{ icon: Shield, value: "50m", label: "Max Depth" },
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".about-image",
				{ clipPath: "inset(0 100% 0 0)" },
				{
					clipPath: "inset(0 0% 0 0)",
					duration: 1.2,
					ease: "power3.out",
					scrollTrigger: { trigger: ".about-image", start: "top 80%" },
				},
			);
			gsap.fromTo(
				".about-content > *",
				{ opacity: 0, x: 40 },
				{
					opacity: 1,
					x: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: ".about-content", start: "top 80%" },
				},
			);
			gsap.fromTo(
				".about-stat",
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
				},
			);
			gsap.to(".experience-badge", {
				y: -10,
				duration: 2,
				repeat: -1,
				yoyo: true,
				ease: "power1.inOut",
			});
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className="py-24 lg:py-32 relative overflow-hidden"
			style={{ backgroundColor: currentTheme.colors.lightBg }}>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div className="relative">
						<div className="about-image relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
							<Image
								src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800"
								alt="Professional construction team"
								fill
								className="object-cover"
							/>
							<div
								className="absolute inset-0"
								style={{
									background: `linear-gradient(45deg, ${currentTheme.colors.primary}30 0%, transparent 60%)`,
								}}
							/>
						</div>
						{/* <div className="experience-badge absolute -right-6 top-12 p-6 rounded-2xl shadow-xl" style={{ backgroundColor: currentTheme.colors.secondary }}>
              <div className="text-center">
                <span className="block font-heading text-4xl font-bold" style={{ color: currentTheme.colors.ctaText }}>10+</span>
                <span className="block font-body text-sm font-medium" style={{ color: `${currentTheme.colors.ctaText}cc` }}>Years of<br />Excellence</span>
              </div>
            </div> */}
						{/* <div className="absolute -left-4 bottom-20 p-4 rounded-2xl shadow-xl backdrop-blur-sm" style={{ backgroundColor: `${currentTheme.colors.lightBg}f0`, border: `1px solid ${currentTheme.colors.border}` }}>
              <div className="grid grid-cols-3 gap-2">
                {[currentTheme.colors.primary, currentTheme.colors.secondary, currentTheme.colors.accent1, currentTheme.colors.accent2, currentTheme.colors.accent3, '#FFFFFF'].map((color, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg shadow-sm border border-gray-100" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className="font-body text-xs mt-2 text-center" style={{ color: currentTheme.colors.muted }}>Premium Materials</p>
            </div> */}
					</div>
					<div className="about-content">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							About Us
						</span>
						<h2
							className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
							style={{ color: currentTheme.colors.heading }}>
							The Underground Force
						</h2>
						<CurvedUnderline width="160" className="mb-6" />
						<p
							className="font-body text-lg leading-relaxed mb-6"
							style={{ color: currentTheme.colors.body }}>
							V Infra Engineers has been providing specialized
							engineering services in collaboration with SM Infra
							Equipments and Heritage Infraspace India Ltd. (HIIL) for
							diaphragm wall construction projects in the Delhi NCR
							region.
						</p>
						<p
							className="font-body text-base leading-relaxed mb-8"
							style={{ color: currentTheme.colors.body }}>
							V Infra Engineers delivers comprehensive design expertise,
							project management, and on-site technical leadership,
							ensuring superior quality and strict adherence to industry
							standards.
						</p>
						<div className="grid grid-cols-2 gap-3 mb-8">
							{features.map((feature, index) => (
								<div key={index} className="flex items-center gap-3">
									<div
										className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
										style={{
											backgroundColor: `${currentTheme.colors.secondary}20`,
										}}>
										<Check
											size={14}
											style={{
												color: currentTheme.colors.secondary,
											}}
										/>
									</div>
									<span
										className="font-body text-sm"
										style={{ color: currentTheme.colors.body }}>
										{feature}
									</span>
								</div>
							))}
						</div>
						<Link
							href="/about"
							className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
							style={{
								backgroundColor: currentTheme.colors.cta,
								color: currentTheme.colors.ctaText,
							}}>
							Learn More About Us <ArrowRight size={20} />
						</Link>
					</div>
				</div>
				<div
					className="about-stats grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 p-8 rounded-3xl"
					style={{
						backgroundColor: currentTheme.colors.cardBg,
						border: `1px solid ${currentTheme.colors.border}`,
					}}>
					{stats.map((stat, index) => (
						<div key={index} className="about-stat text-center p-4">
							<div
								className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
								style={{
									backgroundColor: `${currentTheme.colors.secondary}15`,
								}}>
								<stat.icon
									size={28}
									style={{ color: currentTheme.colors.secondary }}
								/>
							</div>
							<div
								className="font-heading text-3xl font-bold mb-1"
								style={{ color: currentTheme.colors.heading }}>
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
		</section>
	);
};

export default About;
