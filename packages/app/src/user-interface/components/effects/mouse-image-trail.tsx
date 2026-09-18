"use client";

import React, { useRef, type MouseEventHandler, type ReactNode } from "react";

import { useAnimate } from "framer-motion";

import { useFancyMotion } from "@/user-interface/hooks/useFancyMotion";
import { cn } from "@/user-interface/client-utils/cn";

// Credit: https://www.hover.dev/components/other#mouse-image-trail

export function MouseImageTrail({
	children,
	images,
	renderImageBuffer = 60,
	rotationRange = 25,
	className,
}: {
	children: ReactNode;
	images: string[];
	renderImageBuffer?: number;
	rotationRange?: number;
	className?: string;
}) {
	const enabled = useFancyMotion();
	const [scope, animate] = useAnimate();
	const lastRenderPosition = useRef({ x: 0, y: 0 });
	const imageRenderCount = useRef(0);

	if (!enabled || images.length === 0) {
		return <div className={className}>{children}</div>;
	}

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
		const container = scope.current;
		if (!container) {
			return;
		}

		const rect = container.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const distance = Math.hypot(
			x - lastRenderPosition.current.x,
			y - lastRenderPosition.current.y,
		);

		if (distance >= renderImageBuffer) {
			lastRenderPosition.current = { x, y };
			renderNextImage();
		}
	};

	const renderNextImage = () => {
		const imageIndex = imageRenderCount.current % images.length;
		const selector = `[data-mouse-move-index="${imageIndex}"]`;
		const el = scope.current?.querySelector(selector) as HTMLElement | null;
		if (!el) {
			return;
		}

		el.style.top = `${lastRenderPosition.current.y}px`;
		el.style.left = `${lastRenderPosition.current.x}px`;
		el.style.zIndex = "1";

		const rotation = Math.random() * rotationRange;

		void animate(
			el,
			{
				opacity: [0, 1],
				transform: [
					`translate(-50%, -25%) scale(0.5) ${
						imageIndex % 2
							? `rotate(${rotation}deg)`
							: `rotate(-${rotation}deg)`
					}`,
					`translate(-50%, -50%) scale(1) ${
						imageIndex % 2
							? `rotate(-${rotation}deg)`
							: `rotate(${rotation}deg)`
					}`,
				],
			},
			{ type: "spring", damping: 15, stiffness: 200 },
		);

		void animate(
			el,
			{ opacity: [1, 0] },
			{ ease: "linear", duration: 0.5, delay: 1.6 },
		);

		imageRenderCount.current += 1;
	};

	return (
		<div
			ref={scope}
			className={cn("relative overflow-hidden", className)}
			onMouseMove={handleMouseMove}
		>
			{children}
			{images.map((img, index) => (
				<img
					className="pointer-events-none absolute left-0 top-0 z-[1] h-36 w-auto rounded-xl border-2 border-primary/40 object-cover opacity-0 shadow-2xl md:h-48"
					src={img}
					alt=""
					key={`${img}-${index}`}
					data-mouse-move-index={index}
				/>
			))}
		</div>
	);
}
