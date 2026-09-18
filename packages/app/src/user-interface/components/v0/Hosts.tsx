"use client";

import { useEffect, useState } from "react";

import MediaBetweenText from "@/user-interface/components/effects/media-between-text";

const HOSTS = [
	{
		left: "Jason",
		right: "Sebo",
		src: "/effects/controller.jpg",
		alt: "Console and controller",
	},
	{
		left: "Scott",
		right: "Kalish",
		src: "/effects/setup.jpg",
		alt: "Late-night gaming setup",
	},
];

export function Hosts() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const update = () => setIsMobile(window.innerWidth < 1024);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const nameWidth = isMobile ? "56px" : "112px";
	const logoSize = isMobile ? "220px" : "360px";

	return (
		<>
			<section className="border-t border-border/50 px-6 py-32 md:py-40">
				<div className="mx-auto max-w-5xl text-center">
					<p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
						The crew
					</p>
					<h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
						Casual gamers, by casual gamers
					</h2>
					<p className="mx-auto mb-16 max-w-2xl text-muted-foreground md:mb-20">
						Hosted by Jason Sebo and Scott Kalish. Same two guys from the show,
						now with a little more spectacle.
					</p>

					<div className="flex flex-col items-center gap-12 md:gap-16">
						{HOSTS.map((host) => (
							<MediaBetweenText
								key={host.left}
								firstText={host.left}
								secondText={host.right}
								mediaUrl={host.src}
								mediaType="image"
								alt={host.alt}
								triggerType="inView"
								useInViewOptionsProp={{ once: false, amount: 0.6 }}
								mediaContainerClassName="h-[48px] w-full overflow-hidden rounded-md mx-2 sm:h-[88px] sm:mx-4"
								className="cursor-default items-center justify-center font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground sm:text-6xl"
								animationVariants={{
									initial: { width: 0 },
									animate: {
										width: nameWidth,
										transition: {
											duration: 1,
											type: "spring",
											bounce: 0,
											delay: 0.1,
										},
									},
								}}
							/>
						))}
					</div>
				</div>
			</section>

			<section className="px-6 py-32 md:py-44">
				<div className="mx-auto flex max-w-5xl justify-center">
					<MediaBetweenText
						firstText="Outside"
						secondText="The Lobby"
						mediaUrl="/OTL-logo.jpeg"
						mediaType="image"
						alt="Outside The Lobby logo, a goose and a penguin"
						triggerType="inView"
						useInViewOptionsProp={{ once: false, amount: 0.35 }}
						mediaContainerClassName="overflow-hidden rounded-2xl shadow-lg"
						mediaClassName="object-contain"
						className="flex-col items-center justify-center gap-4 font-[family-name:var(--font-heading)] text-4xl font-bold text-foreground sm:gap-6 sm:text-7xl"
						rightTextClassName="italic text-primary"
						animationVariants={{
							initial: {
								width: isMobile ? "160px" : "240px",
								height: 0,
							},
							animate: {
								width: logoSize,
								height: logoSize,
								transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
							},
						}}
					/>
				</div>
			</section>
		</>
	);
}
