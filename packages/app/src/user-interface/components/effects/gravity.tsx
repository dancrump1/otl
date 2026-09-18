"use client";

import {
	createContext,
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	type ReactNode,
} from "react";

import Matter, {
	Bodies,
	Engine,
	Events,
	Mouse,
	MouseConstraint,
	Query,
	Render,
	Runner,
	World,
} from "matter-js";

import { cn } from "@/user-interface/client-utils/cn";
import { calculatePosition } from "./calculatePosition";

// Credit: https://www.fancycomponents.dev/docs/components/physics/gravity

type GravityProps = {
	children: ReactNode;
	debug?: boolean;
	gravity?: { x: number; y: number };
	grabCursor?: boolean;
	addTopWall?: boolean;
	autoStart?: boolean;
	className?: string;
};

type PhysicsBody = {
	element: HTMLElement;
	body: Matter.Body;
	props: MatterBodyProps;
};

type MatterBodyProps = {
	children: ReactNode;
	matterBodyOptions?: Matter.IBodyDefinition;
	isDraggable?: boolean;
	bodyType?: "rectangle" | "circle";
	x?: number | string;
	y?: number | string;
	angle?: number;
	className?: string;
};

export type GravityRef = {
	start: () => void;
	stop: () => void;
};

const GravityContext = createContext<{
	registerElement: (
		id: string,
		element: HTMLElement,
		props: MatterBodyProps,
	) => void;
	unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
	children,
	className,
	matterBodyOptions = {
		friction: 0.1,
		restitution: 0.4,
		density: 0.001,
		isStatic: false,
	},
	bodyType = "rectangle",
	isDraggable = true,
	x = 0,
	y = 0,
	angle = 0,
}: MatterBodyProps) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(Math.random().toString(36).substring(7));
	const context = useContext(GravityContext);

	useEffect(() => {
		if (!elementRef.current || !context) return;
		context.registerElement(idRef.current, elementRef.current, {
			children,
			matterBodyOptions,
			bodyType,
			isDraggable,
			x,
			y,
			angle,
		});

		return () => context.unregisterElement(idRef.current);
	}, [context, matterBodyOptions, bodyType, isDraggable, x, y, angle]);

	return (
		<div
			ref={elementRef}
			className={cn(
				"absolute",
				className,
				isDraggable && "pointer-events-none",
			)}
		>
			{children}
		</div>
	);
};

const Gravity = forwardRef<GravityRef, GravityProps>(
	(
		{
			children,
			debug = false,
			gravity = { x: 0, y: 1 },
			grabCursor = true,
			addTopWall = true,
			autoStart = true,
			className,
		},
		ref,
	) => {
		const canvas = useRef<HTMLDivElement>(null);
		const engine = useRef(Engine.create());
		const render = useRef<Render>();
		const runner = useRef<Runner>();
		const bodiesMap = useRef(new Map<string, PhysicsBody>());
		const frameId = useRef<number>();
		const mouseConstraint = useRef<Matter.MouseConstraint>();
		const mouseDown = useRef(false);
		const isRunning = useRef(false);

		const registerElement = useCallback(
			(id: string, element: HTMLElement, props: MatterBodyProps) => {
				if (!canvas.current) return;
				const width = element.offsetWidth;
				const height = element.offsetHeight;
				const canvasRect = canvas.current.getBoundingClientRect();
				const angle = ((props.angle || 0) * Math.PI) / 180;
				const x = calculatePosition(props.x, canvasRect.width, width);
				const y = calculatePosition(props.y, canvasRect.height, height);

				const renderStyle = {
					fillStyle: debug ? "#888888" : "#00000000",
					strokeStyle: debug ? "#333333" : "#00000000",
					lineWidth: debug ? 3 : 0,
				};

				const bodyOptions: Matter.IChamferableBodyDefinition = {
					friction: props.matterBodyOptions?.friction,
					restitution: props.matterBodyOptions?.restitution,
					density: props.matterBodyOptions?.density,
					isStatic: props.matterBodyOptions?.isStatic,
					angle,
					render: renderStyle,
				};

				const body =
					props.bodyType === "circle"
						? Bodies.circle(
								x,
								y,
								Math.max(width, height) / 2,
								bodyOptions,
							)
						: Bodies.rectangle(x, y, width, height, bodyOptions);

				World.add(engine.current.world, [body]);
				bodiesMap.current.set(id, { element, body, props });
			},
			[debug],
		);

		const unregisterElement = useCallback((id: string) => {
			const body = bodiesMap.current.get(id);
			if (body) {
				World.remove(engine.current.world, body.body);
				bodiesMap.current.delete(id);
			}
		}, []);

		const updateElements = useCallback(() => {
			bodiesMap.current.forEach(({ element, body }) => {
				const { x, y } = body.position;
				const rotation = (body.angle * 180) / Math.PI;
				element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
			});
			frameId.current = requestAnimationFrame(updateElements);
		}, []);

		const startEngine = useCallback(() => {
			if (runner.current) {
				runner.current.enabled = true;
				Runner.run(runner.current, engine.current);
			}
			if (render.current) {
				Render.run(render.current);
			}
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}
			frameId.current = requestAnimationFrame(updateElements);
			isRunning.current = true;
		}, [updateElements]);

		const stopEngine = useCallback(() => {
			if (!isRunning.current) return;
			if (runner.current) {
				Runner.stop(runner.current);
			}
			if (render.current) {
				Render.stop(render.current);
			}
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}
			isRunning.current = false;
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				start: startEngine,
				stop: stopEngine,
			}),
			[startEngine, stopEngine],
		);

		const startEngineRef = useRef(startEngine);
		startEngineRef.current = startEngine;

		useEffect(() => {
			if (!canvas.current) return;
			const container = canvas.current;
			const height = container.offsetHeight;
			const width = container.offsetWidth;

			engine.current.gravity.x = gravity.x;
			engine.current.gravity.y = gravity.y;

			render.current = Render.create({
				element: container,
				engine: engine.current,
				options: {
					width,
					height,
					wireframes: false,
					background: "#00000000",
				},
			});

			render.current.canvas.style.position = "absolute";
			render.current.canvas.style.inset = "0";
			render.current.canvas.style.pointerEvents = "auto";

			const mouse = Mouse.create(render.current.canvas);
			const wheelHandler = (
				mouse as unknown as { mousewheel?: EventListener }
			).mousewheel;
			if (wheelHandler) {
				mouse.element.removeEventListener("mousewheel", wheelHandler);
				mouse.element.removeEventListener("DOMMouseScroll", wheelHandler);
				mouse.element.removeEventListener("wheel", wheelHandler);
			}

			mouseConstraint.current = MouseConstraint.create(engine.current, {
				mouse,
				constraint: {
					stiffness: 0.2,
					render: { visible: debug },
				},
			});

			const walls = [
				Bodies.rectangle(width / 2, height + 10, width, 20, {
					isStatic: true,
					friction: 1,
					render: { visible: debug },
				}),
				Bodies.rectangle(width + 10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: { visible: debug },
				}),
				Bodies.rectangle(-10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: { visible: debug },
				}),
			];

			if (addTopWall) {
				walls.push(
					Bodies.rectangle(width / 2, -10, width, 20, {
						isStatic: true,
						friction: 1,
						render: { visible: debug },
					}),
				);
			}

			const touchingMouse = () =>
				Query.point(
					engine.current.world.bodies,
					mouseConstraint.current?.mouse.position || { x: 0, y: 0 },
				).length > 0;

			const onBeforeUpdate = () => {
				if (!grabCursor) return;
				if (!mouseDown.current && !touchingMouse()) {
					container.style.cursor = "default";
				} else if (touchingMouse()) {
					container.style.cursor = mouseDown.current ? "grabbing" : "grab";
				}
			};

			const onMouseDown = () => {
				mouseDown.current = true;
			};
			const onMouseUp = () => {
				mouseDown.current = false;
			};

			if (grabCursor) {
				Events.on(engine.current, "beforeUpdate", onBeforeUpdate);
				container.addEventListener("mousedown", onMouseDown);
				container.addEventListener("mouseup", onMouseUp);
			}

			World.add(engine.current.world, [mouseConstraint.current, ...walls]);
			render.current.mouse = mouse;
			runner.current = Runner.create();
			runner.current.enabled = false;

			if (autoStart) {
				startEngineRef.current();
			}

			return () => {
				if (frameId.current) {
					cancelAnimationFrame(frameId.current);
				}
				if (grabCursor) {
					Events.off(engine.current, "beforeUpdate", onBeforeUpdate);
					container.removeEventListener("mousedown", onMouseDown);
					container.removeEventListener("mouseup", onMouseUp);
				}
				if (mouseConstraint.current) {
					World.remove(engine.current.world, mouseConstraint.current);
				}
				if (render.current) {
					Mouse.clearSourceEvents(render.current.mouse);
					Render.stop(render.current);
					render.current.canvas.remove();
				}
				if (runner.current) {
					Runner.stop(runner.current);
				}
				World.clear(engine.current.world, false);
				bodiesMap.current.clear();
				isRunning.current = false;
			};
		}, [
			addTopWall,
			autoStart,
			debug,
			grabCursor,
			gravity.x,
			gravity.y,
		]);

		return (
			<GravityContext.Provider value={{ registerElement, unregisterElement }}>
				<div
					ref={canvas}
					className={cn("absolute left-0 top-0 h-full w-full", className)}
				>
					{children}
				</div>
			</GravityContext.Provider>
		);
	},
);

Gravity.displayName = "Gravity";

export default Gravity;
