"use client";

import * as React from "react";

import { cn } from "@/user-interface/client-utils/cn";

import type { GameSnapshot } from "./types";

type BrickBreakerUIContextValue = {
	snapshot: GameSnapshot;
	startGame: () => void;
	pauseGame: () => void;
	resumeGame: () => void;
	resetGame: () => void;
	nextLevel: () => void;
};

const BrickBreakerUIContext =
	React.createContext<BrickBreakerUIContextValue | null>(null);

export function useBrickBreakerUI() {
	const context = React.useContext(BrickBreakerUIContext);
	if (!context) {
		throw new Error("useBrickBreakerUI must be used within BrickBreakerUIProvider");
	}
	return context;
}

export function BrickBreakerUIProvider({
	value,
	children,
}: {
	value: BrickBreakerUIContextValue;
	children: React.ReactNode;
}) {
	return (
		<BrickBreakerUIContext.Provider value={value}>
			{children}
		</BrickBreakerUIContext.Provider>
	);
}

export function BrickBreakerCanvas({
	className,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return <div className={className} />;
}
BrickBreakerCanvas.displayName = "BrickBreakerCanvas";

export function BrickBreakerOverlay({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <div className={cn("pointer-events-none absolute inset-0", className)}>{children}</div>;
}
BrickBreakerOverlay.displayName = "BrickBreakerOverlay";

export function BrickBreakerScore({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return <span className={className}>{snapshot.score}</span>;
}

export function BrickBreakerHighScore({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return <span className={className}>{snapshot.highScore}</span>;
}

export function BrickBreakerLevel({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return <span className={className}>{snapshot.level}</span>;
}

export function BrickBreakerLives({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return <span className={className}>{snapshot.lives}</span>;
}

export function BrickBreakerHUD({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return (
		<div
			className={cn(
				"pointer-events-none absolute right-4 top-20 z-20 font-mono text-xs text-primary/80",
				className,
			)}
		>
			<div>Score {snapshot.score}</div>
			<div>Lives {snapshot.lives}</div>
		</div>
	);
}

export function BrickBreakerTitle({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <p className={className}>{children}</p>;
}

export function BrickBreakerMessage({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <p className={className}>{children}</p>;
}

export function BrickBreakerHint({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <p className={className}>{children}</p>;
}

export function BrickBreakerScoreDisplay({ className }: { className?: string }) {
	const { snapshot } = useBrickBreakerUI();
	return <p className={className}>{snapshot.score}</p>;
}

export function BrickBreakerActionButton({
	children,
	className,
	onClick,
}: {
	children?: React.ReactNode;
	className?: string;
	onClick?: () => void;
}) {
	return (
		<button type="button" className={className} onClick={onClick}>
			{children}
		</button>
	);
}

export function BrickBreakerDefaultUI() {
	const { snapshot, startGame, resumeGame, nextLevel, resetGame } =
		useBrickBreakerUI();

	const message =
		snapshot.state === "idle"
			? "Click or tap to serve"
			: snapshot.state === "paused"
				? "Paused"
				: snapshot.state === "levelComplete"
					? `Level ${snapshot.level} clear`
					: snapshot.state === "won"
						? `You won · ${snapshot.score}`
						: snapshot.state === "lost"
							? `Game over · ${snapshot.score}`
							: snapshot.state === "playing" && !snapshot.ball.isLaunched
								? "Click to launch"
								: null;

	return (
		<>
			<BrickBreakerHUD />
			{message && (
				<p className="pointer-events-none absolute inset-x-0 bottom-8 z-20 text-center text-[11px] uppercase tracking-[0.25em] text-primary/70">
					{message}
					{snapshot.state === "levelComplete" ||
					snapshot.state === "won" ||
					snapshot.state === "lost"
						? " · click to continue"
						: ""}
				</p>
			)}
			{/* Keep actions available through canvas clicks; these buttons are backups. */}
			<div className="sr-only">
				<button type="button" onClick={startGame}>
					Start
				</button>
				<button type="button" onClick={resumeGame}>
					Resume
				</button>
				<button type="button" onClick={nextLevel}>
					Next level
				</button>
				<button type="button" onClick={resetGame}>
					Reset
				</button>
			</div>
		</>
	);
}
