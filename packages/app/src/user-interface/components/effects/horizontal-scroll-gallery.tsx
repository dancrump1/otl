"use client";

import { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/user-interface/client-utils/cn";

// Credit: https://www.edilozi.pro/docs/components/horizontal-scroll

export type GalleryCard = {
	id: string;
	url: string;
	title: string;
	href?: string;
};

export function HorizontalScrollCarousel({
	cards,
	className,
}: {
	cards: GalleryCard[];
	className?: string;
}) {
	const targetRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
	});
	const x = useTransform(scrollYProgress, [0, 1], ["4%", "-72%"]);

	return (
		<div
			ref={targetRef}
			className={cn("relative h-[250vh]", className)}
		>
			<div className="sticky top-0 flex h-screen items-center overflow-hidden">
				<motion.div style={{ x }} className="flex gap-6 px-6">
					{cards.map((card) => (
						<Card key={card.id} card={card} />
					))}
				</motion.div>
			</div>
		</div>
	);
}

function Card({ card }: { card: GalleryCard }) {
	const inner = (
		<div
			data-cursor-text={card.title}
			className="group relative h-[420px] w-[280px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl md:h-[480px] md:w-[360px]"
		>
			<div
				style={{
					backgroundImage: `url(${card.url})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
			/>
			<div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute inset-x-0 bottom-0 z-20 p-6">
				<p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-white">
					{card.title}
				</p>
			</div>
		</div>
	);

	if (card.href) {
		return (
			<a
				href={card.href}
				target="_blank"
				rel="noopener noreferrer"
				className="block"
			>
				{inner}
			</a>
		);
	}

	return inner;
}
