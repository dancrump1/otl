"use client";

import React, { useEffect, useRef, useState } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

import { useFancyMotion } from "@/user-interface/hooks/useFancyMotion";
import { cn } from "@/user-interface/client-utils/cn";

// Credit: components.drivedev.net/type/cursor-follow

function useCursorPosition() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return position;
}

interface CursorFollowProps {
	children: React.ReactNode;
	className?: string;
}

const CIRCLE_SIZE = 16;

export default function CursorFollow({
	children,
	className = "",
}: CursorFollowProps) {
	const enabled = useFancyMotion();
	const { x: mouseX, y: mouseY } = useCursorPosition();
	const [cursorText, setCursorText] = useState<string | null>(null);
	const [pendingText, setPendingText] = useState<string | null>(null);
	const [textWidth, setTextWidth] = useState(0);
	const measureRef = useRef<HTMLSpanElement>(null);
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const springX = useSpring(x, { stiffness: 350, damping: 40 });
	const springY = useSpring(y, { stiffness: 350, damping: 40 });

	const bubbleWidth = cursorText ? Math.max(textWidth + 32, 40) : CIRCLE_SIZE;
	const bubbleHeight = cursorText ? 40 : CIRCLE_SIZE;

	useEffect(() => {
		x.set(mouseX - bubbleWidth / 2);
		y.set(mouseY - bubbleHeight / 2);
	}, [mouseX, mouseY, bubbleWidth, bubbleHeight, x, y]);

	useEffect(() => {
		if (pendingText && measureRef.current) {
			setTextWidth(measureRef.current.offsetWidth);
			setCursorText(pendingText);
			setPendingText(null);
		}
		if (!pendingText && !cursorText) {
			setTextWidth(0);
		}
	}, [pendingText, cursorText]);

	if (!enabled) {
		return <div className={className}>{children}</div>;
	}

	const handleMouseOver = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;
		const text =
			target.getAttribute("data-cursor-text") ??
			target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
		if (text) {
			setPendingText(text);
		}
	};

	const handleMouseOut = (event: React.MouseEvent) => {
		const next = event.relatedTarget as HTMLElement | null;
		if (next?.closest("[data-cursor-text]")) {
			return;
		}
		setCursorText(null);
		setPendingText(null);
	};

	return (
		<div
			className={cn(
				"relative h-full w-full",
				cursorText && "[&_[data-cursor-text]]:cursor-none",
				className,
			)}
			onMouseOver={handleMouseOver}
			onMouseOut={handleMouseOut}
		>
			{children}
			{(pendingText || cursorText) && (
				<span
					ref={measureRef}
					className="pointer-events-none invisible absolute whitespace-nowrap px-4 text-xs font-medium"
				>
					{pendingText || cursorText}
				</span>
			)}
			{cursorText && (
				<motion.div
					initial={{ opacity: 0, scale: 0.7 }}
					animate={{
						opacity: 1,
						scale: 1,
						top: -30,
						transition: { duration: 0.32, ease: "easeInOut" },
					}}
					className="pointer-events-none fixed z-50"
					style={{
						left: 0,
						top: 0,
						x: springX,
						y: springY,
					}}
				>
					<motion.div
						layout
						transition={{ duration: 0.32, ease: "easeInOut" }}
						animate={{
							width: bubbleWidth,
							height: 40,
							borderRadius: 20,
							background: "hsl(var(--primary))",
							color: "hsl(var(--primary-foreground))",
							paddingLeft: 16,
							paddingRight: 16,
							minWidth: 40,
							minHeight: 32,
							scale: 1.1,
						}}
						className="relative z-[1] flex items-center justify-center text-xs font-medium shadow-lg"
					>
						<motion.span
							initial={{ opacity: 0, filter: "blur(8px)" }}
							animate={{ opacity: 1, filter: "blur(0px)" }}
							transition={{ duration: 0.28, delay: 0.1, ease: "easeInOut" }}
							className="w-full text-center"
							style={{ whiteSpace: "nowrap" }}
						>
							{cursorText}
						</motion.span>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}
