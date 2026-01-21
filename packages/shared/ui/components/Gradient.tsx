import { cn } from "@shared/client-utils/cn";

const Gradient = ({ deg, className }: { deg: number; className?: string }) => {
	return (
		<div
			className={cn(
				"absolute z-10 pointer-events-none h-full",
				deg === 180
					? "top-0 left-0 right-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%)]"
					: "bottom-0  left-0 right-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%)]",
				className
			)}
		/>
	);
};

export default Gradient;
