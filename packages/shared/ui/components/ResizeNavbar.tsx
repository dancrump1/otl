"use client";

import React, { useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { cn } from "@shared/client-utils/cn";
import { useShowSpecial } from "@shared/client-utils/useShowSpecial";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";

interface NavbarProps {
	children: React.ReactNode;
	className?: string;
}

interface NavBodyProps {
	children: React.ReactNode;
	className?: string;
	visible?: boolean;
}

interface NavMenuProps {
	children: React.ReactNode;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({
		target: ref,
		offset: ["start start", "end start"],
	});
	const [visible, setVisible] = useState<boolean>(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest > 100) {
			setVisible(true);
		} else {
			setVisible(false);
		}
	});

	const { showSpecialAlert } = useShowSpecial();

	const pathname = usePathname();
	const isHomePage = pathname === "/";

	return (
		<motion.div
			ref={ref}
			className={cn(
				"fixed inset-x-0 z-40 w-full transition-[top]",
				showSpecialAlert && isHomePage
					? "top-[30px] md:top-[42px]"
					: "top-0",
				className
			)}
		>
			{React.Children.map(children, (child) =>
				React.isValidElement(child)
					? React.cloneElement(
							child as React.ReactElement<{ visible?: boolean }>,
							{ visible }
					  )
					: child
			)}
		</motion.div>
	);
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
	return (
		<motion.div
			className={cn(
				"relative z-40 mx-auto w-full items-center justify-between self-start bg-transparent px-5 py-2 flex",
				visible && "bg-background-secondary border-b-4 border-tertiary",
				className
			)}
		>
			{children}
		</motion.div>
	);
};

export const NavMenu = ({
	children,
	className,
	isOpen,
	onClose,
}: NavMenuProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className={cn(
						"absolute inset-x-0 top-[76px] md:top-[90px] z-50 flex w-full flex-col items-start justify-start bg-background-secondary px-4 py-6",
						className
					)}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export const NavToggle = ({
	isOpen,
	onClick,
}: {
	isOpen: boolean;
	onClick: () => void;
}) => {
	return isOpen ? (
		<IconX className="stroke-white cursor-pointer" onClick={onClick} />
	) : (
		<IconMenu2 className="stroke-white cursor-pointer" onClick={onClick} />
	);
};
