"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Menu, X, Palette, ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { themeList, ThemeName } from "@/utils/themes";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isThemeOpen, setIsThemeOpen] = useState(false);
	const { themeName, setTheme, currentTheme } = useTheme();
	const pathname = usePathname();
	const navRef = useRef<HTMLElement>(null);
	const themeDropdownRef = useRef<HTMLDivElement>(null);

	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/services", label: "Services" },
		{ href: "/gallery", label: "Project Gallery" },
		{ href: "/about", label: "About" },
		{ href: "/contact", label: "Contact" },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				themeDropdownRef.current &&
				!themeDropdownRef.current.contains(event.target as Node)
			) {
				setIsThemeOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (navRef.current) {
			gsap.fromTo(
				navRef.current,
				{ y: -100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 },
			);
		}
	}, []);

	const handleThemeChange = (name: ThemeName) => {
		setTheme(name);
		setIsThemeOpen(false);

		gsap.fromTo(
			"body",
			{ opacity: 0.8 },
			{ opacity: 1, duration: 0.3, ease: "power2.out" },
		);
	};

	const themeColors: Record<
		ThemeName,
		{ primary: string; secondary: string }
	> = {
		"navy-gold": { primary: "#1A2E4C", secondary: "#C9A227" },
		"forest-copper": { primary: "#2D4A3E", secondary: "#B87333" },
		"charcoal-blush": { primary: "#2E2E2E", secondary: "#C4A484" },
		"teal-coral": { primary: "#0D5C63", secondary: "#E07A5F" },
	};

	return (
		<nav
			ref={navRef}
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
				isScrolled
					? "bg-light-bg/95 backdrop-blur-md shadow-lg py-3"
					: "bg-transparent py-5"
			}`}
			style={{
				borderBottom: isScrolled
					? `1px solid ${currentTheme.colors.border}`
					: "none",
			}}>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/" className="group flex items-center gap-3">
						<div
							className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
							style={{ backgroundColor: currentTheme.colors.primary }}>
							<span className="text-xl font-heading font-bold text-white">
								V
							</span>
						</div>
						<div className="hidden sm:block">
							<span
								className="font-heading text-xl font-semibold"
								style={{ color: currentTheme.colors.heading }}>
								V Infra
							</span>
							<span
								className="block text-xs tracking-wider uppercase"
								style={{ color: currentTheme.colors.muted }}>
								The Underground Force
							</span>
						</div>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-8">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="relative font-body text-sm font-medium transition-colors duration-300 group py-2"
								style={{
									color:
										pathname === link.href
											? currentTheme.colors.secondary
											: currentTheme.colors.body,
								}}>
								{link.label}
								<span
									className="absolute bottom-0 left-0 h-0.5 transition-all duration-300 rounded-full"
									style={{
										backgroundColor: currentTheme.colors.secondary,
										width: pathname === link.href ? "100%" : "0%",
									}}
								/>
								<span
									className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
									style={{
										backgroundColor: currentTheme.colors.secondary,
									}}
								/>
							</Link>
						))}
					</div>

					{/* Right Side - Theme Switcher & CTA */}
					<div className="flex items-center gap-4">
						{/* CTA Button */}
						<Link
							href="/contact"
							className="hidden md:inline-flex items-center px-6 py-2.5 rounded-lg font-body font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
							style={{
								backgroundColor: currentTheme.colors.cta,
								color: currentTheme.colors.ctaText,
							}}>
							Get Quote
						</Link>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="lg:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-card-bg"
							style={{ color: currentTheme.colors.body }}>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden absolute top-full left-0 right-0 transition-all duration-500 overflow-hidden ${
					isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
				}`}
				style={{
					backgroundColor: currentTheme.colors.lightBg,
					borderBottom: isOpen
						? `1px solid ${currentTheme.colors.border}`
						: "none",
				}}>
				<div className="px-6 py-6 space-y-4">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className="block py-3 font-body font-medium text-lg transition-colors duration-300"
							style={{
								color:
									pathname === link.href
										? currentTheme.colors.secondary
										: currentTheme.colors.body,
							}}>
							{link.label}
						</Link>
					))}
					<Link
						href="/contact"
						onClick={() => setIsOpen(false)}
						className="block w-full text-center px-6 py-3 rounded-lg font-body font-semibold transition-all duration-300"
						style={{
							backgroundColor: currentTheme.colors.cta,
							color: currentTheme.colors.ctaText,
						}}>
						Get Free Quote
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
