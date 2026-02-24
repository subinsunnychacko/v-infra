"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
	Phone,
	Mail,
	MapPin,
	Clock,
	MessageCircle,
	Star,
	Shield,
	Award,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "@/components/CurvedUnderline";
import ContactWizard from "@/components/ContactWizard";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
	const { currentTheme } = useTheme();
	const pageRef = useRef<HTMLDivElement>(null);

	const contactInfo = [
		{
			icon: Phone,
			title: "Phone",
			details: ["+91 8080850001", "0120-4201391"],
			action: "tel:+918080850001",
			actionLabel: "Call Now",
		},
		{
			icon: Mail,
			title: "Email",
			details: ["info@vinfraengineers.com", "projects@vinfraengineers.com"],
			action: "mailto:info@vinfraengineers.com",
			actionLabel: "Send Email",
		},
		{
			icon: MapPin,
			title: "Office",
			details: ["G28, Sector 3", "Noida 201301, UP, India"],
			action: "https://maps.google.com",
			actionLabel: "Get Directions",
		},
		{
			icon: Clock,
			title: "Hours",
			details: ["Monday - Saturday: 9am - 6pm", "Sunday: Closed"],
			action: null,
			actionLabel: null,
		},
	];

	const guarantees = [
		{ icon: Star, text: "Free, No-Obligation Consultation" },
		{ icon: Clock, text: "Response Within 24 Hours" },
		{ icon: Shield, text: "International Standard Equipment" },
		{ icon: Award, text: "50+ Major Projects Completed" },
	];

	const faqs = [
		{
			question: "How long does a diaphragm wall project take?",
			answer:
				"Project duration varies based on wall depth, length, and soil conditions. A typical diaphragm wall project may take 3-6 months. We'll provide a detailed timeline with your quote.",
		},
		{
			question: "Do you offer free site assessments?",
			answer:
				"Yes! We provide free site assessments and consultations. Our engineering team will visit your site, analyze soil conditions, and provide a detailed scope and estimate.",
		},
		{
			question: "What equipment do you operate?",
			answer:
				"We operate international-standard machinery including 4 hydraulic rigs, 3 hydraulic cranes (45-80MT), 6 crawler cranes (18-35MT), 2 crawler anchor rigs, and 20 polymer tanks.",
		},
		{
			question: "What safety standards do you follow?",
			answer:
				"Our goal is zero incidents through effective safety management. All injuries and illnesses are preventable. We investigate all incidents and near misses to prevent recurrence.",
		},
		{
			question: "What depth can you achieve?",
			answer:
				"We can construct diaphragm walls with thickness of 300mm to 1500mm, up to a depth of 50 meters. Our equipment handles even the most challenging soil conditions.",
		},
	];

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Hero animation
			gsap.fromTo(
				".contact-hero-content > *",
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

			// Contact cards animation
			gsap.fromTo(
				".contact-card",
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".contact-cards",
						start: "top 85%",
					},
				},
			);

			// FAQ animation
			gsap.fromTo(
				".faq-item",
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ".faq-section",
						start: "top 80%",
					},
				},
			);
		}, pageRef);

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={pageRef}
			style={{ backgroundColor: currentTheme.colors.lightBg }}>
			{/* Hero Section */}
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
					<div className="contact-hero-content max-w-3xl">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							Contact Us
						</span>
						<h1
							className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
							style={{ color: currentTheme.colors.textOnDark }}>
							Let&apos;s Start Your Project
						</h1>
						<CurvedUnderline width="180" className="mb-6" />
						<p
							className="font-body text-lg md:text-xl leading-relaxed mb-8"
							style={{ color: `${currentTheme.colors.textOnDark}cc` }}>
							Ready to start your underground construction project? Fill
							out our quick form below and we&apos;ll get back to you
							with a detailed project assessment within 24 hours.
						</p>

						{/* Guarantees */}
						<div className="flex flex-wrap gap-4">
							{guarantees.map((item, index) => (
								<div
									key={index}
									className="flex items-center gap-2 px-4 py-2 rounded-full"
									style={{
										backgroundColor: "rgba(255,255,255,0.1)",
										backdropFilter: "blur(10px)",
									}}>
									<item.icon
										size={16}
										style={{ color: currentTheme.colors.secondary }}
									/>
									<span
										className="font-body text-sm"
										style={{ color: currentTheme.colors.textOnDark }}>
										{item.text}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="grid lg:grid-cols-3 gap-12">
						{/* Contact Form - Wizard */}
						<div className="lg:col-span-2">
							<ContactWizard />
						</div>

						{/* Contact Info Sidebar */}
						<div className="space-y-6">
							{/* Contact Cards */}
							<div className="contact-cards space-y-4">
								{contactInfo.map((item, index) => (
									<div
										key={index}
										className="contact-card p-6 rounded-2xl"
										style={{
											backgroundColor: currentTheme.colors.cardBg,
											border: `1px solid ${currentTheme.colors.border}`,
										}}>
										<div className="flex items-start gap-4">
											<div
												className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
												style={{
													backgroundColor: `${currentTheme.colors.secondary}15`,
												}}>
												<item.icon
													size={24}
													style={{
														color: currentTheme.colors.secondary,
													}}
												/>
											</div>
											<div className="flex-1">
												<h3
													className="font-heading text-lg font-semibold mb-2"
													style={{
														color: currentTheme.colors.heading,
													}}>
													{item.title}
												</h3>
												{item.details.map((detail, i) => (
													<p
														key={i}
														className="font-body text-sm"
														style={{
															color: currentTheme.colors.body,
														}}>
														{detail}
													</p>
												))}
												{item.action && (
													<a
														href={item.action}
														className="inline-block mt-3 font-body text-sm font-semibold transition-colors duration-300"
														style={{
															color: currentTheme.colors
																.secondary,
														}}>
														{item.actionLabel} →
													</a>
												)}
											</div>
										</div>
									</div>
								))}
							</div>

							{/* Live Chat Card */}
							{/* <div
                className="p-6 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.darkBg} 100%)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${currentTheme.colors.secondary}30` }}
                >
                  <MessageCircle size={28} style={{ color: currentTheme.colors.secondary }} />
                </div>
                <h3
                  className="font-heading text-xl font-semibold mb-2"
                  style={{ color: currentTheme.colors.textOnDark }}
                >
                  Need Quick Answers?
                </h3>
                <p
                  className="font-body text-sm mb-4"
                  style={{ color: `${currentTheme.colors.textOnDark}cc` }}
                >
                  Chat with our team online for immediate assistance with your questions.
                </p>
                <button
                  className="w-full py-3 rounded-xl font-body font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: currentTheme.colors.secondary,
                    color: currentTheme.colors.ctaText,
                  }}
                >
                  Start Live Chat
                </button>
              </div> */}

							{/* Map Placeholder */}
							<div
								className="relative h-64 rounded-2xl overflow-hidden"
								style={{
									border: `1px solid ${currentTheme.colors.border}`,
								}}>
								<iframe
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.7!2d77.3152!3d28.5855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sSector%203%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section
				className="faq-section py-20 lg:py-28"
				style={{ backgroundColor: currentTheme.colors.cardBg }}>
				<div className="max-w-4xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-16">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							FAQs
						</span>
						<h2
							className="font-heading text-3xl md:text-4xl font-bold mb-4"
							style={{ color: currentTheme.colors.heading }}>
							Frequently Asked Questions
						</h2>
						<CurvedUnderline width="160" className="mx-auto" />
					</div>

					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<details
								key={index}
								className="faq-item group rounded-2xl overflow-hidden"
								style={{
									backgroundColor: currentTheme.colors.lightBg,
									border: `1px solid ${currentTheme.colors.border}`,
								}}>
								<summary
									className="flex items-center justify-between p-6 cursor-pointer list-none"
									style={{ color: currentTheme.colors.heading }}>
									<span className="font-heading text-lg font-semibold pr-4">
										{faq.question}
									</span>
									<span
										className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-open:rotate-45"
										style={{
											backgroundColor: `${currentTheme.colors.secondary}15`,
											color: currentTheme.colors.secondary,
										}}>
										+
									</span>
								</summary>
								<div
									className="px-6 pb-6"
									style={{ color: currentTheme.colors.body }}>
									<p className="font-body text-base leading-relaxed">
										{faq.answer}
									</p>
								</div>
							</details>
						))}
					</div>
				</div>
			</section>

			{/* Trust Badges */}
			<section className="py-16">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					<div className="text-center mb-12">
						<p
							className="font-body text-sm uppercase tracking-wider"
							style={{ color: currentTheme.colors.muted }}>
							Trusted & Certified
						</p>
					</div>
					<div className="flex flex-wrap items-center justify-center gap-12">
						{[
							"ISO Certified",
							"HIIL Partnership",
							"SM Infra Alliance",
							"Safety Compliant",
							"50+ Major Projects",
						].map((badge, index) => (
							<div
								key={index}
								className="flex items-center gap-3 px-6 py-3 rounded-xl"
								style={{
									backgroundColor: currentTheme.colors.cardBg,
									border: `1px solid ${currentTheme.colors.border}`,
								}}>
								<Shield
									size={20}
									style={{ color: currentTheme.colors.secondary }}
								/>
								<span
									className="font-body text-sm font-medium"
									style={{ color: currentTheme.colors.heading }}>
									{badge}
								</span>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
