"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Phone,
	Mail,
	MapPin,
	Facebook,
	Instagram,
	Twitter,
	Linkedin,
	ArrowUp,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
	const { currentTheme } = useTheme();
	const footerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!footerRef.current) return;

		const elements = footerRef.current.querySelectorAll(".footer-animate");

		// Set initial state
		gsap.set(elements, { opacity: 0, y: 30 });

		const trigger = ScrollTrigger.create({
			trigger: footerRef.current,
			start: "top 95%",
			once: true,
			onEnter: () => {
				gsap.to(elements, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: "power3.out",
				});
			},
		});

		// Fallback: if footer is already in view on mount, animate immediately
		const rect = footerRef.current.getBoundingClientRect();
		if (rect.top < window.innerHeight) {
			gsap.to(elements, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				stagger: 0.1,
				ease: "power3.out",
			});
		}

		return () => {
			trigger.kill();
		};
	}, []);

	const scrollToTop = () => {
		gsap.to(window, {
			duration: 1,
			scrollTo: { y: 0 },
			ease: "power3.inOut",
		});
	};

	const quickLinks = [
		{ href: "/", label: "Home" },
		{ href: "/services", label: "Services" },
		{ href: "/gallery", label: "Gallery" },
		{ href: "/about", label: "About Us" },
		{ href: "/contact", label: "Contact" },
	];

	const services = [
		"Diaphragm Wall",
		"Top-Down Construction",
		"Shoring & Piling",
		"Soil Anchoring",
		"Sheet Piling",
		"Micro Piling",
	];

	const socialLinks = [
		{ icon: Facebook, href: "#", label: "Facebook" },
		{ icon: Instagram, href: "#", label: "Instagram" },
		{ icon: Twitter, href: "#", label: "Twitter" },
		{ icon: Linkedin, href: "#", label: "LinkedIn" },
	];

	return (
		<footer
			ref={footerRef}
			className="relative pt-20 pb-8"
			style={{ backgroundColor: currentTheme.colors.darkBg }}>
			{/* Decorative Top Border */}
			<div
				className="absolute top-0 left-0 right-0 h-1"
				style={{
					background: `linear-gradient(90deg, ${currentTheme.colors.secondary}, ${currentTheme.colors.accent1}, ${currentTheme.colors.accent2}, ${currentTheme.colors.secondary})`,
				}}
			/>

			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
					{/* Brand Column */}
					<div className="footer-animate">
						<Link
							href="/"
							className="inline-flex items-center gap-3 mb-6">
							<div
								className="w-14 h-14 rounded-xl flex items-center justify-center"
								style={{
									backgroundColor: currentTheme.colors.secondary,
								}}>
								<span
									className="text-2xl font-heading font-bold"
									style={{ color: currentTheme.colors.ctaText }}>
									P
								</span>
							</div>
							<div>
								<span className="font-heading text-2xl font-semibold text-white">
									V Infra Engineers
								</span>
								<span
									className="block text-xs tracking-wider uppercase"
									style={{ color: currentTheme.colors.accent2 }}>
									The Underground Force
								</span>
							</div>
						</Link>
						<p
							className="font-body text-sm leading-relaxed mb-6"
							style={{ color: "rgba(255,255,255,0.7)" }}>
							Market leader for underground and deep foundations in Delhi
							NCR. Engineering excellence, state-of-the-art equipment,
							and operational expertise since 2014.
						</p>
						<div className="flex gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
									style={{
										backgroundColor: "rgba(255,255,255,0.1)",
										color: "rgba(255,255,255,0.7)",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor =
											currentTheme.colors.secondary;
										e.currentTarget.style.color =
											currentTheme.colors.ctaText;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor =
											"rgba(255,255,255,0.1)";
										e.currentTarget.style.color =
											"rgba(255,255,255,0.7)";
									}}>
									<social.icon size={18} />
								</a>
							))}
						</div>
					</div>

					{/* Quick Links */}
					<div className="footer-animate">
						<h4 className="font-heading text-lg font-semibold mb-6 text-white relative inline-block">
							Quick Links
							<span
								className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
								style={{
									backgroundColor: currentTheme.colors.secondary,
								}}
							/>
						</h4>
						<ul className="space-y-3">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="font-body text-sm transition-all duration-300 hover:pl-2"
										style={{ color: "rgba(255,255,255,0.7)" }}
										onMouseEnter={(e) => {
											e.currentTarget.style.color =
												currentTheme.colors.secondary;
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.color =
												"rgba(255,255,255,0.7)";
										}}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div className="footer-animate">
						<h4 className="font-heading text-lg font-semibold mb-6 text-white relative inline-block">
							Our Services
							<span
								className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
								style={{
									backgroundColor: currentTheme.colors.secondary,
								}}
							/>
						</h4>
						<ul className="space-y-3">
							{services.map((service) => (
								<li key={service}>
									<span
										className="font-body text-sm"
										style={{ color: "rgba(255,255,255,0.7)" }}>
										{service}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div className="footer-animate">
						<h4 className="font-heading text-lg font-semibold mb-6 text-white relative inline-block">
							Contact Us
							<span
								className="absolute -bottom-2 left-0 w-12 h-0.5 rounded-full"
								style={{
									backgroundColor: currentTheme.colors.secondary,
								}}
							/>
						</h4>
						<ul className="space-y-4">
							<li className="flex items-start gap-3">
								<MapPin
									size={20}
									className="flex-shrink-0 mt-0.5"
									style={{ color: currentTheme.colors.secondary }}
								/>
								<span
									className="font-body text-sm"
									style={{ color: "rgba(255,255,255,0.7)" }}>
									G28, Sector 3<br />
									Noida 201301, UP
								</span>
							</li>
							<li className="flex items-center gap-3">
								<Phone
									size={20}
									className="flex-shrink-0"
									style={{ color: currentTheme.colors.secondary }}
								/>
								<a
									href="tel:+918080850001"
									className="font-body text-sm transition-colors duration-300"
									style={{ color: "rgba(255,255,255,0.7)" }}
									onMouseEnter={(e) => {
										e.currentTarget.style.color =
											currentTheme.colors.secondary;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.color =
											"rgba(255,255,255,0.7)";
									}}>
									+91 8080850001
								</a>
							</li>
							<li className="flex items-center gap-3">
								<Mail
									size={20}
									className="flex-shrink-0"
									style={{ color: currentTheme.colors.secondary }}
								/>
								<a
									href="mailto:info@vinfraengineers.com"
									className="font-body text-sm transition-colors duration-300"
									style={{ color: "rgba(255,255,255,0.7)" }}
									onMouseEnter={(e) => {
										e.currentTarget.style.color =
											currentTheme.colors.secondary;
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.color =
											"rgba(255,255,255,0.7)";
									}}>
									info@vinfraengineers.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div
					className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
					style={{ borderColor: "rgba(255,255,255,0.1)" }}>
					<p
						className="font-body text-sm text-center md:text-left"
						style={{ color: "rgba(255,255,255,0.5)" }}>
						© {new Date().getFullYear()} V Infra Engineers. All rights
						reserved.
					</p>
					<div className="flex items-center gap-6">
						<a
							href="#"
							className="font-body text-sm transition-colors duration-300"
							style={{ color: "rgba(255,255,255,0.5)" }}
							onMouseEnter={(e) => {
								e.currentTarget.style.color =
									currentTheme.colors.secondary;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = "rgba(255,255,255,0.5)";
							}}>
							Privacy Policy
						</a>
						<a
							href="#"
							className="font-body text-sm transition-colors duration-300"
							style={{ color: "rgba(255,255,255,0.5)" }}
							onMouseEnter={(e) => {
								e.currentTarget.style.color =
									currentTheme.colors.secondary;
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = "rgba(255,255,255,0.5)";
							}}>
							Terms of Service
						</a>
					</div>
				</div>
			</div>

			{/* Scroll to Top Button */}
			<button
				onClick={scrollToTop}
				className="absolute bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
				style={{
					backgroundColor: currentTheme.colors.secondary,
					color: currentTheme.colors.ctaText,
				}}>
				<ArrowUp size={20} />
			</button>
		</footer>
	);
};

export default Footer;
