"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import CurvedUnderline from "./CurvedUnderline";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
	id: number;
	src: string;
	title: string;
	category: string;
	description: string;
}

const Gallery = () => {
	const { currentTheme } = useTheme();
	const sectionRef = useRef<HTMLElement>(null);
	const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
	const [filter, setFilter] = useState("all");

	const categories = [
		"all",
		"diaphragm-wall",
		"metro",
		"commercial",
		"infrastructure",
	];

	const galleryItems: GalleryItem[] = [
		{
			id: 1,
			src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800",
			title: "NCC Nauroji Nagar WTC",
			category: "commercial",
			description:
				"Diaphragm wall construction for the World Trade Centre project at Nauroji Nagar",
		},
		{
			id: 2,
			src: "/images/image14.jpeg",
			title: "DLF City Centre Phase 1",
			category: "commercial",
			description:
				"Deep foundation and basement construction for DLF commercial complex",
		},
		{
			id: 3,
			src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800",
			title: "L&T Chatarpur Metro DMRC",
			category: "metro",
			description:
				"Top-down construction and diaphragm wall for Delhi Metro station",
		},
		{
			id: 4,
			src: "/images/image13.jpeg",
			title: "Max Hospital Saket",
			category: "commercial",
			description:
				"Specialized foundation work for healthcare infrastructure",
		},
		{
			id: 5,
			src: "/images/image10.jpeg",
			title: "Noida Authority Underpass",
			category: "infrastructure",
			description:
				"Diaphragm wall and shoring for underpass construction at City Centre",
		},
		{
			id: 6,
			src: "/images/image2.jpeg",
			title: "M3M Noida Sector 72",
			category: "commercial",
			description: "Deep basement construction with soil anchoring system",
		},
		{
			id: 7,
			src: "/images/image11.jpeg",
			title: "HCC Krishna Park DMRC",
			category: "metro",
			description:
				"Metro station deep foundation and earth retention system",
		},
		{
			id: 8,
			src: "/images/image9.jpeg",
			title: "Elan Sector 106 Gurgaon",
			category: "commercial",
			description:
				"Large-scale diaphragm wall for mixed-use commercial development",
		},
	];

	const filteredItems =
		filter === "all"
			? galleryItems
			: galleryItems.filter((item) => item.category === filter);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				".gallery-header",
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: { trigger: ".gallery-header", start: "top 85%" },
				},
			);
			gsap.fromTo(
				".gallery-filters",
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power3.out",
					scrollTrigger: { trigger: ".gallery-filters", start: "top 90%" },
				},
			);
		}, sectionRef);
		return () => ctx.revert();
	}, []);

	useEffect(() => {
		gsap.fromTo(
			".gallery-item",
			{ opacity: 0, scale: 0.9 },
			{
				opacity: 1,
				scale: 1,
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
		<section
			ref={sectionRef}
			className="py-24 lg:py-32 relative overflow-hidden"
			style={{ backgroundColor: currentTheme.colors.cardBg }}>
			<div className="max-w-7xl mx-auto px-6 lg:px-8">
				<div className="gallery-header text-center mb-12">
					<span
						className="inline-block font-body text-sm font-semibold tracking-wider uppercase mb-4"
						style={{ color: currentTheme.colors.secondary }}>
						Our Portfolio
					</span>
					<h2
						className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
						style={{ color: currentTheme.colors.heading }}>
						Recent Projects
					</h2>
					<CurvedUnderline width="160" className="mx-auto mb-6" />
					<p
						className="font-body text-lg max-w-2xl mx-auto"
						style={{ color: currentTheme.colors.body }}>
						Browse through our portfolio of completed projects showcasing
						precision engineering across the Delhi NCR region.
					</p>
				</div>
				<div className="gallery-filters flex flex-wrap justify-center gap-3 mb-12">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setFilter(category)}
							className="px-6 py-2.5 rounded-full font-body text-sm font-medium transition-all duration-300 capitalize"
							style={{
								backgroundColor:
									filter === category
										? currentTheme.colors.secondary
										: "transparent",
								color:
									filter === category
										? currentTheme.colors.ctaText
										: currentTheme.colors.body,
								border: `2px solid ${filter === category ? currentTheme.colors.secondary : currentTheme.colors.border}`,
							}}>
							{category}
						</button>
					))}
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
					{filteredItems.map((item, index) => (
						<div
							key={item.id}
							className={`gallery-item group relative rounded-2xl overflow-hidden cursor-pointer ${index === 0 || index === 3 ? "sm:col-span-2 sm:row-span-2" : ""}`}
							style={{
								aspectRatio: index === 0 || index === 3 ? "1" : "4/3",
							}}
							onClick={() => openLightbox(item)}>
							<Image
								src={item.src}
								alt={item.title}
								fill
								className="object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div
								className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6"
								style={{
									background: `linear-gradient(0deg, ${currentTheme.colors.primary}ee 0%, ${currentTheme.colors.primary}80 50%, transparent 100%)`,
								}}>
								<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
									<span
										className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 capitalize"
										style={{
											backgroundColor: `${currentTheme.colors.secondary}30`,
											color: currentTheme.colors.secondary,
										}}>
										{item.category}
									</span>
									<h3 className="font-heading text-lg font-semibold text-white mb-1">
										{item.title}
									</h3>
									<p className="font-body text-sm text-white/80">
										{item.description}
									</p>
								</div>
								<div
									className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
									style={{
										backgroundColor: currentTheme.colors.secondary,
									}}>
									<Expand
										size={18}
										style={{ color: currentTheme.colors.ctaText }}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="text-center mt-12">
					<Link
						href="/gallery"
						className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-body font-semibold text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
						style={{
							backgroundColor: currentTheme.colors.cta,
							color: currentTheme.colors.ctaText,
						}}>
						View All Projects <ArrowRight size={20} />
					</Link>
				</div>
			</div>
			{selectedImage && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
					onClick={closeLightbox}>
					<button
						className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
						onClick={closeLightbox}>
						<X size={24} className="text-white" />
					</button>
					<button
						className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: currentTheme.colors.secondary }}
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("prev");
						}}>
						<ChevronLeft
							size={24}
							style={{ color: currentTheme.colors.ctaText }}
						/>
					</button>
					<button
						className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
						style={{ backgroundColor: currentTheme.colors.secondary }}
						onClick={(e) => {
							e.stopPropagation();
							navigateImage("next");
						}}>
						<ChevronRight
							size={24}
							style={{ color: currentTheme.colors.ctaText }}
						/>
					</button>
					<div
						className="relative max-w-5xl max-h-[80vh] w-full"
						onClick={(e) => e.stopPropagation()}>
						<Image
							src={selectedImage.src}
							alt={selectedImage.title}
							width={1200}
							height={800}
							className="object-contain w-full h-full rounded-lg"
						/>
						<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
							<span
								className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 capitalize"
								style={{
									backgroundColor: `${currentTheme.colors.secondary}30`,
									color: currentTheme.colors.secondary,
								}}>
								{selectedImage.category}
							</span>
							<h3 className="font-heading text-xl font-semibold text-white mb-1">
								{selectedImage.title}
							</h3>
							<p className="font-body text-sm text-white/80">
								{selectedImage.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default Gallery;
