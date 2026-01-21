"use client";

import type { HTMLAttributes } from "react";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";

export interface CloseIconHandle {
	startAnimation: () => void;
	stopAnimation: () => void;
}

interface CloseIconProps extends HTMLAttributes<HTMLDivElement> {
	size?: number;
}

const pathVariants: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
	},
	animate: {
		opacity: [0, 1],
		pathLength: [0, 1],
	},
};
const pathVariants1: Variants = {
	normal: {
		opacity: 1,
		pathLength: 1,
	},
	animate: {
		opacity: [0.5, 1],
		pathLength: [0, 1],
	},
};

const CloseIcon = forwardRef<CloseIconHandle, CloseIconProps>(
	({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
		const controls = useAnimation();
		const isControlledRef = useRef(false);

		useImperativeHandle(ref, () => {
			isControlledRef.current = true;

			return {
				startAnimation: () => controls.start("animate"),
				stopAnimation: () => controls.start("normal"),
			};
		});

		useEffect(() => {
			if (!isControlledRef.current) {
				setTimeout(() => {
					controls.start("animate");
				}, 300);
			}
		}, []);

		return (
			<div
				// onMouseEnter={handleMouseEnter}
				// onMouseLeave={handleMouseLeave}
				{...props}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<motion.path
						variants={pathVariants1}
						animate={controls}
						d="M18 6 6 18"
					/>
					<motion.path
						transition={{ delay: 0.2 }}
						variants={pathVariants}
						animate={controls}
						d="m6 6 12 12"
					/>
				</svg>
			</div>
		);
	}
);

CloseIcon.displayName = "CloseIcon";

export { CloseIcon };
