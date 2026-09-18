"use client";

import * as React from "react";

import { cn } from "@/user-interface/client-utils/cn";

import { BRICK_VISUALS, DEFAULT_CONFIG, KEY_BINDINGS } from "./config";
import { DEFAULT_LEVELS } from "./levels";
import type {
	Brick,
	BrickBreakerConfig,
	BrickBreakerProps,
	BrickType,
	CanvasDimensions,
	GameSnapshot,
} from "./types";
import {
	BrickBreakerDefaultUI,
	BrickBreakerUIProvider,
} from "./ui";
import { useBrickBreaker } from "./use-brick-breaker";
import { mergeConfig, resolveCssColor } from "./utils";

// Credit: https://hub.joyco.studio/components/brick-breaker

function roundRectPath(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number,
): void {
	const r = Math.min(radius, width / 2, height / 2);
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.lineTo(x + width - r, y);
	ctx.quadraticCurveTo(x + width, y, x + width, y + r);
	ctx.lineTo(x + width, y + height - r);
	ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
	ctx.lineTo(x + r, y + height);
	ctx.quadraticCurveTo(x, y + height, x, y + height - r);
	ctx.lineTo(x, y + r);
	ctx.quadraticCurveTo(x, y, x + r, y);
	ctx.closePath();
}

function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	width: number,
	height: number,
	radius: number,
): void {
	roundRectPath(ctx, x, y, width, height, radius);
	ctx.fill();
}

function getBrickGrid(bricks: Brick[]) {
	let rows = 0;
	let cols = 0;
	for (const brick of bricks) {
		rows = Math.max(rows, brick.row + 1);
		cols = Math.max(cols, brick.col + 1);
	}
	return { rows, cols };
}

function drawBrick(
	ctx: CanvasRenderingContext2D,
	brick: Brick,
	baseColor: string,
	borderRadius: number,
	image: HTMLImageElement | null,
	grid: { rows: number; cols: number },
): void {
	const { x, y, width, height } = brick.bounds;
	const visual = BRICK_VISUALS[brick.type];
	let alpha = visual.opacity;

	if (brick.maxHealth > 1 && brick.health < brick.maxHealth) {
		const healthRatio = brick.health / brick.maxHealth;
		alpha *= 0.5 + healthRatio * 0.5;
	}

	ctx.save();
	ctx.globalAlpha = alpha;
	roundRectPath(ctx, x, y, width, height, borderRadius);
	ctx.clip();

	if (image && grid.cols > 0 && grid.rows > 0) {
		const sx = (brick.col / grid.cols) * image.width;
		const sy = (brick.row / grid.rows) * image.height;
		const sw = image.width / grid.cols;
		const sh = image.height / grid.rows;
		ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
		ctx.globalAlpha = alpha * 0.12;
		ctx.fillStyle = baseColor;
		ctx.fillRect(x, y, width, height);
	} else {
		ctx.fillStyle = baseColor;
		ctx.fillRect(x, y, width, height);
	}

	ctx.restore();
	ctx.globalAlpha = 1;
}

function renderGame(
	ctx: CanvasRenderingContext2D,
	canvas: HTMLCanvasElement,
	snapshot: GameSnapshot,
	config: BrickBreakerConfig,
	dimensions: CanvasDimensions,
	image: HTMLImageElement | null,
): void {
	const { width, height, dpr } = dimensions;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.scale(dpr, dpr);
	ctx.clearRect(0, 0, width, height);

	const bgColor = resolveCssColor(config.colors.background, canvas);
	const paddleColor = resolveCssColor(config.colors.paddle, canvas);
	const ballColor = resolveCssColor(config.colors.ball, canvas);
	const trailColor = resolveCssColor(config.colors.ballTrail, canvas);

	const brickColors: Record<BrickType, string> = {
		normal: resolveCssColor(config.colors.bricks.normal, canvas),
		strong: resolveCssColor(config.colors.bricks.strong, canvas),
		metal: resolveCssColor(config.colors.bricks.metal, canvas),
		indestructible: resolveCssColor(config.colors.bricks.indestructible, canvas),
	};

	if (bgColor && bgColor !== "transparent") {
		ctx.fillStyle = bgColor;
		ctx.fillRect(0, 0, width, height);
	}

	const grid = getBrickGrid(snapshot.bricks);

	const now = Date.now();
	for (const brick of snapshot.bricks) {
		if (brick.destroyed) {
			if (brick.destroyedAt) {
				const elapsed = now - brick.destroyedAt;
				const progress = elapsed / config.effects.destroyAnimationDuration;
				if (progress < 1) {
					ctx.globalAlpha = 1 - progress;
					drawBrick(
						ctx,
						brick,
						brickColors[brick.type],
						config.layout.brickBorderRadius,
						image,
						grid,
					);
					ctx.globalAlpha = 1;
				}
			}
			continue;
		}

		drawBrick(
			ctx,
			brick,
			brickColors[brick.type],
			config.layout.brickBorderRadius,
			image,
			grid,
		);
	}

	const drawBall = (
		x: number,
		y: number,
		radius: number,
		color: string,
		alpha = 1,
	) => {
		ctx.globalAlpha = alpha;
		ctx.fillStyle = color;

		if (config.layout.ballStyle === "custom" && config.layout.renderBall) {
			config.layout.renderBall(ctx, x, y, radius, color);
		} else if (config.layout.ballStyle === "square") {
			const size = radius * 2;
			ctx.fillRect(x - radius, y - radius, size, size);
		} else {
			ctx.beginPath();
			ctx.arc(x, y, radius, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.globalAlpha = 1;
	};

	if (config.effects.showTrail && snapshot.ball.trail.length > 0) {
		for (let i = 0; i < snapshot.ball.trail.length; i++) {
			const pos = snapshot.ball.trail[i];
			const progress = (i + 1) / snapshot.ball.trail.length;
			const opacity = progress * config.effects.trailOpacity;
			const trailRadius = snapshot.ball.radius * (0.3 + 0.7 * progress);
			drawBall(pos.x, pos.y, trailRadius, trailColor, opacity);
		}
	}

	drawBall(
		snapshot.ball.position.x,
		snapshot.ball.position.y,
		snapshot.ball.radius,
		ballColor,
	);

	ctx.fillStyle = paddleColor;
	const paddleRadius =
		config.layout.paddleBorderRadius === "auto"
			? snapshot.paddle.bounds.height / 2
			: config.layout.paddleBorderRadius;
	drawRoundedRect(
		ctx,
		snapshot.paddle.bounds.x,
		snapshot.paddle.bounds.y,
		snapshot.paddle.bounds.width,
		snapshot.paddle.bounds.height,
		paddleRadius,
	);
}

type InputMode = "none" | "keyboard" | "pointer";

export function BrickBreaker({
	config: configOverrides,
	levels: customLevels,
	startLevel = 1,
	onGameEnd,
	onScoreChange,
	onStateChange,
	onLevelChange,
	className,
	autoFocus = true,
	showFocusRing = true,
	imageSrc,
	children,
}: BrickBreakerProps & { children?: React.ReactNode }) {
	const canvasWrapperRef = React.useRef<HTMLDivElement>(null);
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const [dimensions, setDimensions] = React.useState<CanvasDimensions>({
		width: 400,
		height: 300,
		dpr: 1,
	});
	const [theme, setTheme] = React.useState("");
	const [artwork, setArtwork] = React.useState<HTMLImageElement | null>(null);
	const inputModeRef = React.useRef<InputMode>("none");

	const config = React.useMemo(
		() => mergeConfig(DEFAULT_CONFIG, configOverrides),
		[configOverrides],
	);

	React.useEffect(() => {
		if (!imageSrc) {
			setArtwork(null);
			return;
		}

		const image = new Image();
		image.onload = () => setArtwork(image);
		image.src = imageSrc;
		return () => {
			image.onload = null;
		};
	}, [imageSrc]);

	const levels = customLevels || DEFAULT_LEVELS;

	const {
		snapshot,
		startGame,
		pauseGame,
		resumeGame,
		resetGame,
		nextLevel,
		movePaddle,
		setPaddlePosition,
		launchBall,
	} = useBrickBreaker({
		config,
		levels,
		startLevel,
		canvasDimensions: dimensions,
		onGameEnd,
		onScoreChange,
		onStateChange,
		onLevelChange,
	});

	React.useEffect(() => {
		if (snapshot.state !== "playing") {
			inputModeRef.current = "none";
		}
	}, [snapshot.state]);

	React.useEffect(() => {
		const wrapper = canvasWrapperRef.current;
		if (!wrapper) return;

		const updateSize = () => {
			const rect = wrapper.getBoundingClientRect();
			const wrapperWidth = Math.max(rect.width, 1);
			const wrapperHeight = Math.max(rect.height, 1);
			const dpr = window.devicePixelRatio || 1;
			setDimensions({
				width: wrapperWidth,
				height: wrapperHeight,
				dpr,
			});
		};

		updateSize();
		const resizeObserver = new ResizeObserver(updateSize);
		resizeObserver.observe(wrapper);
		return () => resizeObserver.disconnect();
	}, []);

	React.useEffect(() => {
		const html = document.documentElement;
		setTheme(html.className);
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.attributeName === "class") {
					setTheme(html.className);
				}
			}
		});
		observer.observe(html, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		canvas.width = dimensions.width * dimensions.dpr;
		canvas.height = dimensions.height * dimensions.dpr;
		renderGame(ctx, canvas, snapshot, config, dimensions, artwork);
	}, [snapshot, config, dimensions, theme, artwork]);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!document.activeElement?.closest('[data-slot="brick-breaker-canvas"]')) {
				return;
			}

			const code = event.code;

			if (KEY_BINDINGS.LEFT.includes(code) || KEY_BINDINGS.RIGHT.includes(code)) {
				inputModeRef.current = "keyboard";
				event.preventDefault();
				movePaddle(KEY_BINDINGS.LEFT.includes(code) ? "left" : "right");
				return;
			}

			if (KEY_BINDINGS.START.includes(code)) {
				event.preventDefault();
				if (snapshot.state === "idle") {
					startGame();
				} else if (snapshot.state === "paused") {
					resumeGame();
				} else if (snapshot.state === "playing") {
					if (!snapshot.ball.isLaunched) {
						launchBall();
					} else {
						pauseGame();
					}
				} else if (snapshot.state === "levelComplete") {
					nextLevel();
				}
			}

			if (KEY_BINDINGS.PAUSE.includes(code)) {
				event.preventDefault();
				if (snapshot.state === "playing") {
					pauseGame();
				} else if (snapshot.state === "paused") {
					resumeGame();
				}
			}

			if (KEY_BINDINGS.RESTART.includes(code)) {
				if (snapshot.state === "won" || snapshot.state === "lost") {
					resetGame();
					setTimeout(startGame, 100);
				}
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			const code = event.code;
			if (KEY_BINDINGS.LEFT.includes(code) || KEY_BINDINGS.RIGHT.includes(code)) {
				if (inputModeRef.current === "keyboard") {
					movePaddle("none");
					inputModeRef.current = "none";
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [
		snapshot.state,
		snapshot.ball.isLaunched,
		startGame,
		pauseGame,
		resumeGame,
		resetGame,
		nextLevel,
		movePaddle,
		launchBall,
	]);

	React.useEffect(() => {
		const wrapper = canvasWrapperRef.current;
		if (!wrapper) return;

		const clientXToCanvasX = (clientX: number) => {
			const rect = wrapper.getBoundingClientRect();
			if (rect.width === 0) return 0;
			return ((clientX - rect.left) / rect.width) * dimensions.width;
		};

		const handlePointer = () => {
			if (snapshot.state === "idle") {
				startGame();
			} else if (snapshot.state === "paused") {
				resumeGame();
			} else if (snapshot.state === "playing" && !snapshot.ball.isLaunched) {
				launchBall();
			} else if (snapshot.state === "levelComplete") {
				nextLevel();
			} else if (snapshot.state === "won" || snapshot.state === "lost") {
				resetGame();
				setTimeout(startGame, 100);
			}
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (snapshot.state !== "playing") return;
			if (inputModeRef.current === "keyboard") return;
			inputModeRef.current = "pointer";
			setPaddlePosition(clientXToCanvasX(event.clientX));
		};

		const handleClick = () => {
			handlePointer();
		};

		const handleMouseLeave = () => {
			if (inputModeRef.current === "pointer") {
				inputModeRef.current = "none";
			}
		};

		wrapper.addEventListener("mousemove", handleMouseMove);
		wrapper.addEventListener("click", handleClick);
		wrapper.addEventListener("mouseleave", handleMouseLeave);
		return () => {
			wrapper.removeEventListener("mousemove", handleMouseMove);
			wrapper.removeEventListener("click", handleClick);
			wrapper.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [
		snapshot.state,
		snapshot.ball.isLaunched,
		dimensions,
		startGame,
		resumeGame,
		resetGame,
		nextLevel,
		setPaddlePosition,
		launchBall,
	]);

	React.useEffect(() => {
		const wrapper = canvasWrapperRef.current;
		if (!wrapper) return;

		const clientXToCanvasX = (clientX: number) => {
			const rect = wrapper.getBoundingClientRect();
			if (rect.width === 0) return 0;
			return ((clientX - rect.left) / rect.width) * dimensions.width;
		};

		const handleTouchStart = (event: TouchEvent) => {
			event.preventDefault();
			inputModeRef.current = "pointer";
			if (snapshot.state === "playing" && event.touches[0]) {
				setPaddlePosition(clientXToCanvasX(event.touches[0].clientX));
			}
			if (snapshot.state === "idle") {
				startGame();
			} else if (snapshot.state === "paused") {
				resumeGame();
			} else if (snapshot.state === "playing" && !snapshot.ball.isLaunched) {
				launchBall();
			} else if (snapshot.state === "levelComplete") {
				nextLevel();
			} else if (snapshot.state === "won" || snapshot.state === "lost") {
				resetGame();
				setTimeout(startGame, 100);
			}
		};

		const handleTouchMove = (event: TouchEvent) => {
			event.preventDefault();
			if (snapshot.state !== "playing" || !event.touches[0]) return;
			setPaddlePosition(clientXToCanvasX(event.touches[0].clientX));
		};

		const handleTouchEnd = () => {
			if (inputModeRef.current === "pointer") {
				inputModeRef.current = "none";
			}
		};

		wrapper.addEventListener("touchstart", handleTouchStart, { passive: false });
		wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
		wrapper.addEventListener("touchend", handleTouchEnd);
		wrapper.addEventListener("touchcancel", handleTouchEnd);
		return () => {
			wrapper.removeEventListener("touchstart", handleTouchStart);
			wrapper.removeEventListener("touchmove", handleTouchMove);
			wrapper.removeEventListener("touchend", handleTouchEnd);
			wrapper.removeEventListener("touchcancel", handleTouchEnd);
		};
	}, [
		snapshot.state,
		snapshot.ball.isLaunched,
		dimensions,
		startGame,
		resumeGame,
		resetGame,
		nextLevel,
		setPaddlePosition,
		launchBall,
	]);

	React.useEffect(() => {
		if (autoFocus) {
			canvasRef.current?.focus();
		}
	}, [autoFocus]);

	const uiContextValue = React.useMemo(
		() => ({
			snapshot,
			startGame,
			pauseGame,
			resumeGame,
			resetGame,
			nextLevel,
		}),
		[snapshot, startGame, pauseGame, resumeGame, resetGame, nextLevel],
	);

	const canvasElement = (
		<canvas
			ref={canvasRef}
			data-slot="brick-breaker-canvas"
			className={cn(
				"block h-full w-full outline-none",
				showFocusRing && "focus-visible:ring-[3px] focus-visible:ring-ring/50",
			)}
			style={{
				width: "100%",
				height: "100%",
				imageRendering: "crisp-edges",
			}}
			tabIndex={0}
			role="img"
			aria-label={`Brick Breaker - Level ${snapshot.level}, Score: ${snapshot.score}, Lives: ${snapshot.lives}`}
		/>
	);

	return (
		<BrickBreakerUIProvider value={uiContextValue}>
			<div
				data-slot="brick-breaker"
				data-state={snapshot.state}
				className={cn("relative h-full min-h-0 w-full", className)}
			>
				<div ref={canvasWrapperRef} className="absolute inset-0 overflow-hidden">
					{canvasElement}
					{children ?? <BrickBreakerDefaultUI />}
				</div>
				<div className="sr-only" aria-live="polite">
					{snapshot.state === "won" && `You won! Final score: ${snapshot.score}`}
					{snapshot.state === "lost" && `Game over. Score: ${snapshot.score}`}
					{snapshot.state === "levelComplete" &&
						`Level ${snapshot.level} complete! Score: ${snapshot.score}`}
				</div>
			</div>
		</BrickBreakerUIProvider>
	);
}
