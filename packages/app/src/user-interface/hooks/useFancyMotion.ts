import { useEffect, useState } from "react";

export function useFancyMotion() {
	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const finePointer = window.matchMedia("(pointer: fine)").matches;
		setEnabled(!reduce && finePointer);
	}, []);

	return enabled;
}

export function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	return reduced;
}
