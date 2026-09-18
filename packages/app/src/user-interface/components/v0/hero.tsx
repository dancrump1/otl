"use client";

import dynamic from "next/dynamic";

import type { Level } from "@/user-interface/components/effects/brick-breaker";

const BrickBreaker = dynamic(
	() =>
		import("@/user-interface/components/effects/brick-breaker").then(
			(mod) => mod.BrickBreaker,
		),
	{ ssr: false },
);

const N = { type: "normal" as const };

const HERO_LEVELS: Level[] = [
	{
		id: 1,
		name: "The Lobby",
		bricks: Array.from({ length: 12 }, () =>
			Array.from({ length: 12 }, () => N),
		),
	},
];

const HERO_GAME_CONFIG = {
	colors: {
		background: "transparent",
		paddle: "hsl(40 95% 55%)",
		ball: "hsl(40 95% 55%)",
		ballTrail: "hsl(40 95% 55% / 0.4)",
		text: "hsl(0 0% 98%)",
		textMuted: "hsl(220 10% 60%)",
		bricks: {
			normal: "hsl(40 95% 55% / 0.55)",
			strong: "hsl(215 80% 55% / 0.65)",
			metal: "hsl(0 0% 98% / 0.4)",
			indestructible: "hsl(220 10% 60% / 0.3)",
		},
	},
	layout: {
		topPadding: 0.12,
		sidePadding: 0.06,
		brickFieldFit: "contain" as const,
		brickFieldAspect: 2503 / 2526,
		brickGap: 3,
		brickBorderRadius: 4,
	},
	storage: {
		persistHighScore: true,
		storageKey: "otl-brick-breaker",
	},
};

export function Hero() {
	return (
		<section className="relative min-h-[90vh] overflow-hidden pt-16">
			<h1 className="sr-only">Outside The Lobby</h1>
			<BrickBreaker
				className="absolute inset-0 h-full w-full cursor-crosshair"
				autoFocus={false}
				showFocusRing={false}
				config={HERO_GAME_CONFIG}
				levels={HERO_LEVELS}
				imageSrc="/OTL-logo.jpeg"
			/>
		</section>
	);
}
