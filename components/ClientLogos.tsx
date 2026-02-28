"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface LogoItem {
	id: number;
	src: string;
	alt: string;
}

const ClientLogos = () => {
	const { currentTheme } = useTheme();
	const [rows, setRows] = useState<LogoItem[][]>([]);

	useEffect(() => {
		const fetchLogos = async () => {
			try {
				const res = await fetch("/api/client-logos");
				const data = await res.json();
				const logos: LogoItem[] = (data.logos || []).map(
					(src: string, i: number) => ({
						id: i + 1,
						src,
						alt: `Client ${i + 1}`,
					}),
				);

				if (logos.length === 0) return;

				// Split into 3 roughly equal rows
				const perRow = Math.ceil(logos.length / 3);
				const r1 = logos.slice(0, perRow);
				const r2 = logos.slice(perRow, perRow * 2);
				const r3 = logos.slice(perRow * 2);

				setRows([r1, r2, r3].filter((r) => r.length > 0));
			} catch {
				// Silently fail — no logos shown
			}
		};

		fetchLogos();
	}, []);

	const LogoCard = ({ logo }: { logo: LogoItem }) => (
		<div
			className="flex-shrink-0 w-[180px] h-[100px] md:w-[220px] md:h-[120px] rounded-2xl flex items-center justify-center p-5 transition-all duration-300 hover:scale-105 hover:shadow-lg"
			style={{
				backgroundColor: currentTheme.colors.lightBg,
				border: `1px solid ${currentTheme.colors.border}`,
				boxShadow: `0 2px 12px ${currentTheme.colors.primary}06`,
			}}>
			<div className="relative w-full h-full">
				<Image
					src={logo.src}
					alt={logo.alt}
					fill
					className="object-contain"
					sizes="220px"
				/>
			</div>
		</div>
	);

	const MarqueeRow = ({
		logos,
		direction = "left",
		speed = 35,
	}: {
		logos: LogoItem[];
		direction?: "left" | "right";
		speed?: number;
	}) => {
		const tripled = [...logos, ...logos, ...logos];
		const animClass =
			direction === "left"
				? "animate-client-scroll-left"
				: "animate-client-scroll-right";

		return (
			<div className="relative overflow-hidden py-2">
				<div
					className={`flex gap-5 ${animClass}`}
					style={{ animationDuration: `${speed}s` }}>
					{tripled.map((logo, i) => (
						<LogoCard key={`${direction}-${logo.id}-${i}`} logo={logo} />
					))}
				</div>
			</div>
		);
	};

	if (rows.length === 0) return null;

	const directions: Array<"left" | "right"> = ["left", "right", "left"];
	const speeds = [40, 35, 45];

	return (
		<div className="relative w-full overflow-hidden">
			{/* Fade edges */}
			<div
				className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
				// style={{
				// 	background: `linear-gradient(90deg, ${currentTheme.colors.lightBg} 0%, transparent 100%)`,
				// }}
			/>
			<div
			// className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
			// style={{
			// 	background: `linear-gradient(270deg, ${currentTheme.colors.lightBg} 0%, transparent 100%)`,
			// }}
			/>

			<div className="space-y-5">
				{rows.map((row, i) => (
					<MarqueeRow
						key={i}
						logos={row}
						direction={directions[i] || "left"}
						speed={speeds[i] || 40}
					/>
				))}
			</div>

			<style jsx global>{`
				@keyframes client-scroll-left {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-33.33%);
					}
				}
				@keyframes client-scroll-right {
					0% {
						transform: translateX(-33.33%);
					}
					100% {
						transform: translateX(0);
					}
				}
				.animate-client-scroll-left {
					animation: client-scroll-left 40s linear infinite;
				}
				.animate-client-scroll-right {
					animation: client-scroll-right 35s linear infinite;
				}
				.animate-client-scroll-left:hover,
				.animate-client-scroll-right:hover {
					animation-play-state: paused;
				}
			`}</style>
		</div>
	);
};

export default ClientLogos;
