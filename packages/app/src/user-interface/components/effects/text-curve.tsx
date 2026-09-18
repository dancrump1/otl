"use client";

import {
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
	type FC,
	type PointerEvent,
} from "react";

import { cn } from "@/user-interface/client-utils/cn";

// Credit: https://reactbits.dev/text-animations/curved-loop

interface TextCurveProps {
	marqueeText?: string;
	speed?: number;
	className?: string;
	curveAmount?: number;
	direction?: "left" | "right";
	interactive?: boolean;
}

const TextCurve: FC<TextCurveProps> = ({
	marqueeText = "",
	speed = 2,
	className,
	curveAmount = 120,
	direction = "left",
	interactive = true,
}) => {
	const text = useMemo(() => {
		const hasTrailing = /\s|\u00A0$/.test(marqueeText);
		return (
			(hasTrailing ? marqueeText.replace(/\s+$/, "") : marqueeText) + "\u00A0"
		);
	}, [marqueeText]);

	const measureRef = useRef<SVGTextElement>(null);
	const textPathRef = useRef<SVGTextPathElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const [spacing, setSpacing] = useState(0);
	const uid = useId();
	const pathId = `curve-${uid.replace(/:/g, "")}`;
	const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;
	const dragRef = useRef(false);
	const lastXRef = useRef(0);
	const dirRef = useRef<"left" | "right">(direction);
	const velRef = useRef(0);
	const [dragging, setDragging] = useState(false);

	const textLength = spacing;
	const totalText = textLength
		? Array(Math.ceil(1800 / textLength) + 2)
				.fill(text)
				.join("")
		: text;
	const ready = spacing > 0;

	useEffect(() => {
		if (measureRef.current) {
			setSpacing(measureRef.current.getComputedTextLength());
		}
	}, [text, className]);

	useEffect(() => {
		if (!spacing || !textPathRef.current) {
			return;
		}
		textPathRef.current.setAttribute("startOffset", `${-spacing}px`);
	}, [spacing]);

	useEffect(() => {
		if (!spacing || !ready) {
			return;
		}
		let frame = 0;
		const step = () => {
			if (!dragRef.current && textPathRef.current) {
				const delta = dirRef.current === "right" ? speed : -speed;
				const currentOffset = parseFloat(
					textPathRef.current.getAttribute("startOffset") || "0",
				);
				let newOffset = currentOffset + delta;
				if (newOffset <= -spacing) newOffset += spacing;
				if (newOffset > 0) newOffset -= spacing;
				textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
			}
			frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	}, [spacing, speed, ready]);

	const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
		if (!interactive) return;
		dragRef.current = true;
		setDragging(true);
		lastXRef.current = event.clientX;
		velRef.current = 0;
		(event.target as HTMLElement).setPointerCapture(event.pointerId);
	};

	const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!interactive || !dragRef.current || !textPathRef.current) return;
		const dx = event.clientX - lastXRef.current;
		lastXRef.current = event.clientX;
		velRef.current = dx;
		const currentOffset = parseFloat(
			textPathRef.current.getAttribute("startOffset") || "0",
		);
		let newOffset = currentOffset + dx;
		if (newOffset <= -spacing) newOffset += spacing;
		if (newOffset > 0) newOffset -= spacing;
		textPathRef.current.setAttribute("startOffset", `${newOffset}px`);
	};

	const endDrag = () => {
		if (!interactive) return;
		dragRef.current = false;
		setDragging(false);
		dirRef.current = velRef.current > 0 ? "right" : "left";
	};

	return (
		<div
			className="flex w-full items-center justify-center overflow-hidden py-4"
			style={{
				visibility: ready ? "visible" : "hidden",
				cursor: interactive ? (dragging ? "grabbing" : "grab") : "auto",
			}}
			onPointerDown={onPointerDown}
			onPointerMove={onPointerMove}
			onPointerUp={endDrag}
			onPointerLeave={endDrag}
		>
			<svg
				className="block aspect-[100/18] w-full select-none overflow-visible text-[2.4rem] font-bold uppercase leading-none tracking-[4px] md:text-[4.5rem]"
				viewBox="0 0 1440 160"
			>
				<text
					ref={measureRef}
					xmlSpace="preserve"
					style={{
						visibility: "hidden",
						opacity: 0,
						pointerEvents: "none",
					}}
				>
					{text}
				</text>
				<defs>
					<path
						ref={pathRef}
						id={pathId}
						d={pathD}
						fill="none"
						stroke="transparent"
					/>
				</defs>
				{ready && (
					<text xmlSpace="preserve" className={cn("fill-primary", className)}>
						<textPath
							ref={textPathRef}
							href={`#${pathId}`}
							xmlSpace="preserve"
						>
							{totalText}
						</textPath>
					</text>
				)}
			</svg>
		</div>
	);
};

export default TextCurve;
