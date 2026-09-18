"use client";

import Gravity, { MatterBody } from "@/user-interface/components/effects/gravity";
import { usePrefersReducedMotion } from "@/user-interface/hooks/useFancyMotion";

const CHIP_PHYSICS = {
	friction: 0.4,
	restitution: 0.35,
	density: 0.001,
};

const CHIPS = [
	{ label: "Kat Naps", x: "18%", y: "8%", className: "bg-primary text-primary-foreground", angle: -8 },
	{ label: "Boxies", x: "62%", y: "12%", className: "bg-accent text-accent-foreground", angle: 12 },
	{ label: "Casual", x: "40%", y: "6%", className: "bg-card text-foreground border border-border", angle: 4 },
	{ label: "Couch co-op", x: "78%", y: "18%", className: "bg-primary/20 text-primary border border-primary/40", angle: -14 },
	{ label: "Boss fights", x: "12%", y: "22%", className: "bg-destructive/20 text-destructive border border-destructive/40", angle: 10 },
	{ label: "Side quests", x: "52%", y: "20%", className: "bg-secondary text-secondary-foreground", angle: -6 },
	{ label: "Easy mode", x: "28%", y: "14%", className: "bg-accent/20 text-accent border border-accent/40", angle: 8 },
	{ label: "New Game+", x: "70%", y: "8%", className: "bg-card text-foreground border border-primary/30", angle: -3 },
	{ label: "No lobby", x: "86%", y: "28%", className: "bg-primary text-primary-foreground", angle: 16 },
	{ label: "Indie picks", x: "8%", y: "36%", className: "bg-secondary text-secondary-foreground", angle: -11 },
	{ label: "Rage quit", x: "46%", y: "30%", className: "bg-destructive text-destructive-foreground", angle: 7 },
	{ label: "Story mode", x: "32%", y: "28%", className: "bg-card text-foreground border border-border", angle: -9 },
] as const;

export function GravityPit() {
	const reduced = usePrefersReducedMotion();

	if (reduced) {
		return (
			<section className="border-y border-border/50 px-6 py-20">
				<div className="mx-auto max-w-4xl text-center">
					<p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
						Topics we will not drop
					</p>
					<h2 className="mb-8 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground">
						Games we will not shut up about
					</h2>
					<div className="flex flex-wrap justify-center gap-3">
						{CHIPS.map((chip) => (
							<span
								key={chip.label}
								className={`rounded-full px-5 py-2 text-sm font-semibold ${chip.className}`}
							>
								{chip.label}
							</span>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="relative h-[70vh] min-h-[520px] overflow-hidden border-y border-border/50">
			<div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-12 text-center">
				<p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
					Grab a topic. Throw it around.
				</p>
				<h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
					Games we will not shut up about
				</h2>
			</div>
			<Gravity gravity={{ x: 0, y: 1 }} className="bg-background">
				{CHIPS.map((chip) => (
					<MatterBody
						key={chip.label}
						x={chip.x}
						y={chip.y}
						angle={chip.angle}
						matterBodyOptions={CHIP_PHYSICS}
					>
						<div
							className={`rounded-full px-6 py-3 text-lg font-bold shadow-lg md:text-xl ${chip.className}`}
						>
							{chip.label}
						</div>
					</MatterBody>
				))}
			</Gravity>
		</section>
	);
}
