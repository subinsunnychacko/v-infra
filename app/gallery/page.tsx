"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ChevronLeft, ChevronRight, Expand, Filter } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "@/components/CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
	id: number;
	src: string;
	title: string;
	category: string;
	description: string;
	location: string;
	year: string;
}

export default function GalleryPage() {
	const { currentTheme } = useTheme();
	const pageRef = useRef<HTMLDivElement>(null);
	const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
	const [filter, setFilter] = useState("all");

	const categories = [
		{ id: "all", label: "All Projects" },
		{ id: "diaphragm-wall", label: "Diaphragm Wall" },
		{ id: "metro", label: "Metro & DMRC" },
		{ id: "commercial", label: "Commercial" },
		{ id: "infrastructure", label: "Infrastructure" },
	];

	const galleryItems: GalleryItem[] = [
		{
			id: 1,
			src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200",
			title: "NCC Nauroji Nagar WTC",
			category: "commercial",
			description: "Diaphragm wall construction for World Trade Centre.",
			location: "Nauroji Nagar, Delhi",
			year: "2023",
		},
		{
			id: 2,
			src: "/images/image2.jpeg",
			title: "DLF City Centre Phase 1",
			category: "commercial",
			description: "Deep basement construction for DLF commercial complex.",
			location: "Delhi",
			year: "2023",
		},
		{
			id: 3,
			src: "/images/image4.jpeg",
			title: "L&T Chatarpur Metro DMRC",
			category: "metro",
			description: "Top-down construction for Delhi Metro station.",
			location: "Chatarpur, Delhi",
			year: "2022",
		},
		{
			id: 4,
			src: "/images/image7.jpeg",
			title: "L&T Chatarpur Mandir DMRC",
			category: "metro",
			description: "Diaphragm wall for metro station near Chatarpur Mandir.",
			location: "Chatarpur, Delhi",
			year: "2022",
		},
		{
			id: 5,
			src: "/images/image9.jpeg",
			title: "Max Hospital Saket",
			category: "commercial",
			description: "Specialized deep foundation for healthcare facility.",
			location: "Saket, Delhi",
			year: "2023",
		},
		{
			id: 6,
			src: "/images/image10.jpeg",
			title: "Noida Authority Underpass",
			category: "infrastructure",
			description: "D-Wall and shoring for underpass at City Centre.",
			location: "Sector 94, Noida",
			year: "2024",
		},
		{
			id: 7,
			src: "/images/image11.jpeg",
			title: "HCC Krishna Park DMRC",
			category: "metro",
			description: "Metro station foundation and earth retention system.",
			location: "Krishna Park, Delhi",
			year: "2021",
		},
		{
			id: 8,
			src: "/images/image12.jpeg",
			title: "M3M Noida Sector 72",
			category: "commercial",
			description: "Deep basement with soil anchoring for M3M complex.",
			location: "Sector 72, Noida",
			year: "2024",
		},
		{
			id: 9,
			src: "/images/image13.jpeg",
			title: "Elan Sector 106 Gurgaon",
			category: "commercial",
			description: "Large-scale diaphragm wall for mixed-use development.",
			location: "Sector 106, Gurgaon",
			year: "2024",
		},
		{
			id: 10,
			src: "/images/image14.jpeg",
			title: "Pakhowal Underpass Ludhiana",
			category: "infrastructure",
			description: "Diaphragm wall for urban underpass construction.",
			location: "Ludhiana, Punjab",
			year: "2023",
		},
		{
			id: 11,
			src: "/images/image15.jpeg",
			title: "BHEL Shalimar Sector 16",
			category: "commercial",
			description: "Foundation work for BHEL commercial project.",
			location: "Sector 16, Noida",
			year: "2022",
		},
		{
			id: 12,
			src: "/images/image3.jpeg",
			title: "Hines Gurgaon Udyog Vihar",
			category: "commercial",
			description:
				"Deep foundation for international commercial development.",
			location: "Udyog Vihar, Gurgaon",
			year: "2023",
		},
	];

	const filteredItems =
		filter === "all"
			? galleryItems
			: galleryItems.filter((item) => item.category === filter);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".gallery-hero-content > *",
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
		}, pageRef);

		return () => ctx.revert();
	}, []);

	useEffect(() => {
		gsap.fromTo(
			".gallery-item",
			{ opacity: 0, scale: 0.9, y: 30 },
			{
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: "power3.out",
			},
		);
	}, [filter]);

	const openLightbox = (item: GalleryItem) => {
		setSelectedImage(item);
		document.body.style.overflow = "hidden";
	};

	const closeLightbox = () => {
		setSelectedImage(null);
		document.body.style.overflow = "auto";
	};

	const navigateImage = (direction: "prev" | "next") => {
		if (!selectedImage) return;
		const currentIndex = filteredItems.findIndex(
			(item) => item.id === selectedImage.id,
		);
		let newIndex;
		if (direction === "prev") {
			newIndex =
				currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
		} else {
			newIndex =
				currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
		}
		setSelectedImage(filteredItems[newIndex]);
	};

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
					<div className="gallery-hero-content max-w-3xl">
						<span
							className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
							style={{ color: currentTheme.colors.secondary }}>
							Our Portfolio
						</span>
						<h1
							className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
							style={{ color: currentTheme.colors.textOnDark }}>
							Project Gallery
						</h1>
						<CurvedUnderline width="180" className="mb-6" />
						<p
							className="font-body text-lg md:text-xl leading-relaxed"
							style={{ color: `${currentTheme.colors.textOnDark}cc` }}>
							Explore our portfolio of completed projects across Delhi
							NCR. Each project showcases our commitment to engineering
							precision and deep foundation expertise.
						</p>
					</div>
				</div>
			</section>

			{/* Gallery Section */}
			<section className="py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-6 lg:px-8">
					{/* Filters */}
					<div className="flex flex-wrap items-center justify-center gap-3 mb-12">
						<Filter
							size={20}
							style={{ color: currentTheme.colors.muted }}
						/>
						{categories.map((category) => (
							<button
								key={category.id}
								onClick={() => setFilter(category.id)}
								className="px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300"
								style={{
									backgroundColor:
										filter === category.id
											? currentTheme.colors.secondary
											: "transparent",
									color:
										filter === category.id
											? currentTheme.colors.ctaText
											: currentTheme.colors.body,
									border: `2px solid ${filter === category.id ? currentTheme.colors.secondary : currentTheme.colors.border}`,
								}}>
								{category.label}
							</button>
						))}
					</div>

					{/* Results Count */}
					<p
						className="text-center font-body text-sm mb-8"
						style={{ color: currentTheme.colors.muted }}>
						Showing {filteredItems.length}{" "}
						{filteredItems.length === 1 ? "project" : "projects"}
					</p>

					{/* Gallery Grid - Masonry Style */}
					<div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
						{filteredItems.map((item, index) => (
							<div
								key={item.id}
								className="gallery-item group relative break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
								onClick={() => openLightbox(item)}>
								<div
									className={`relative ${
										index % 5 === 0 || index % 5 === 3
											? "aspect-[3/4]"
											: "aspect-[4/3]"
									}`}>
									<img
										src={item.src}
										alt={item.title}
										// fill
										className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
									/>
									{/* Overlay */}
									<div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
										style={{
											background: `linear-gradient(0deg, ${currentTheme.colors.primary}ee 0%, ${currentTheme.colors.primary}80 50%, transparent 100%)`,
										}}>
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<div className="flex items-center gap-2 mb-2">
												<span
													className="px-3 py-1 rounded-full text-xs font-medium capitalize"
													style={{
														backgroundColor: `${currentTheme.colors.secondary}30`,
														color: currentTheme.colors.secondary,
													}}>
													{item.category}
												</span>
												<span
													className="text-xs"
													style={{
														color: `${currentTheme.colors.textOnDark}99`,
													}}>
													{item.year}
												</span>
											</div>
											<h3 className="font-heading text-lg font-semibold text-white mb-1">
												{item.title}
											</h3>
											<p className="font-body text-sm text-white/80 line-clamp-2">
												{item.description}
											</p>
											<p
												className="font-body text-xs mt-2"
												style={{
													color: currentTheme.colors.secondary,
												}}>
												📍 {item.location}
											</p>
										</div>
										{/* Expand Icon */}
										<div
											className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
											style={{
												backgroundColor:
													currentTheme.colors.secondary,
											}}>
											<Expand
												size={18}
												style={{
													color: currentTheme.colors.ctaText,
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Lightbox */}
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
					onClick={closeLightbox}>
					{/* Close Button */}
					<button
						className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
						onClick={closeLightbox}>
						<X size={24} className="text-white" />
					</button>

					{/* Navigation */}
					<button
						className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: currentTheme.colors.secondary }}
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("prev");
						}}>
						<ChevronLeft
							size={28}
							style={{ color: currentTheme.colors.ctaText }}
						/>
					</button>
					<button
						className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: currentTheme.colors.secondary }}
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("next");
						}}>
						<ChevronRight
							size={28}
							style={{ color: currentTheme.colors.ctaText }}
						/>
					</button>

					{/* Image */}
					<div
						className="relative max-w-6xl max-h-[85vh] w-full"
						onClick={(e) => e.stopPropagation()}>
						<img
							src={selectedImage.src}
							alt={selectedImage.title}
							width={1400}
							height={900}
							className="object-contain w-full h-full rounded-lg"
						/>
						<div
							className="absolute bottom-0 left-0 right-0 p-8 rounded-b-lg"
							style={{
								background: `linear-gradient(0deg, ${currentTheme.colors.primary}f0 0%, transparent 100%)`,
							}}>
							<div className="flex items-center gap-3 mb-3">
								<span
									className="px-4 py-1.5 rounded-full text-sm font-medium capitalize"
									style={{
										backgroundColor: `${currentTheme.colors.secondary}30`,
										color: currentTheme.colors.secondary,
									}}>
									{selectedImage.category}
								</span>
								<span className="text-white/70 text-sm">
									{selectedImage.year}
								</span>
								<span className="text-white/70 text-sm">
									📍 {selectedImage.location}
								</span>
							</div>
							<h3 className="font-heading text-2xl font-semibold text-white mb-2">
								{selectedImage.title}
							</h3>
							<p className="font-body text-base text-white/80 max-w-2xl">
								{selectedImage.description}
							</p>
						</div>
					</div>

					{/* Counter */}
					<div
						className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full"
						style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
						<span className="text-white font-body text-sm">
							{filteredItems.findIndex(
								(item) => item.id === selectedImage.id,
							) + 1}{" "}
							/ {filteredItems.length}
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
