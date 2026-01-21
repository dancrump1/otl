import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

export const specialsKey = "show-special";

// Define the context value type
interface ShowSpecialContextType {
	showSpecialAlert: boolean;
	setShowSpecialAlert: Dispatch<SetStateAction<boolean>>;
	showSpecial: boolean;
	setShowSpecial: Dispatch<SetStateAction<boolean>>;
	handleSaveData: () => void;
}

// Create context with default undefined
const ShowSpecialContext = createContext<ShowSpecialContextType | null>(null);

// Define provider props
interface ShowSpecialProviderProps {
	children: ReactNode;
}

// Provider component
export const ShowSpecialProvider = ({ children }: ShowSpecialProviderProps) => {
	const [showSpecialAlert, setShowSpecialAlert] = useState(false);
	// Default to not showing special to prevent flicker
	const [showSpecial, setShowSpecial] = useState(false);

	useEffect(() => {
		// Check if window is defined before accessing sessionStorage
		if (typeof window !== "undefined") {
			const storedData = sessionStorage.getItem(specialsKey);

			if (!storedData || (storedData && !JSON.parse(storedData))) {
				sessionStorage.setItem(specialsKey, JSON.stringify(true));

				setTimeout(() => {
					setShowSpecial(true);
				}, 500);
			} else {
				sessionStorage.setItem(specialsKey, JSON.stringify(false));
				setShowSpecial(false);
			}
		}
	}, []);

	const handleSaveData = () => {
		if (typeof window !== "undefined") {
			sessionStorage.setItem(specialsKey, JSON.stringify(false));
			setShowSpecial(false);
			setShowSpecialAlert(true);
		}
	};

	return (
		<ShowSpecialContext.Provider
			value={{
				showSpecialAlert,
				setShowSpecialAlert,
				setShowSpecial,
				showSpecial,
				handleSaveData,
			}}
		>
			{children}
		</ShowSpecialContext.Provider>
	);
};

// Custom hook to use the context
export function useShowSpecial() {
	const context = useContext(ShowSpecialContext);
	if (!context) {
		throw new Error(
			"useShowSpecialAlert must be used within a ShowSpecialProvider"
		);
	}
	return context;
}
