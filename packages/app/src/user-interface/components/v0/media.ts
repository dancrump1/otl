export const TITLE_GIF = "/effects/neon.gif";

export const GAME_STILLS = [
	{
		src: "/effects/arcade.jpg",
		label: "Arcade cabinets at night",
		caption: "Arcade nights",
	},
	{
		src: "/effects/controller.jpg",
		label: "PlayStation 5 and DualSense",
		caption: "Couch co-op",
	},
	{
		src: "/effects/setup.jpg",
		label: "Headset and a late-night session",
		caption: "After work raids",
	},
	{
		src: "/effects/retro.jpg",
		label: "Game Boy and retro hardware",
		caption: "Kat Naps",
	},
	{
		src: "/effects/keyboard.jpg",
		label: "RGB keyboard in the dark",
		caption: "Side quests",
	},
	{
		src: "/effects/living-room.jpg",
		label: "Living room console setup",
		caption: "No lobby required",
	},
	{
		src: "/effects/handheld.jpg",
		label: "Two controllers on the couch",
		caption: "Pass the controller",
	},
	{
		src: "/effects/neon-city.jpg",
		label: "Controller pointed at a campaign",
		caption: "Story mode",
	},
] as const;

export const TRAIL_IMAGES = GAME_STILLS.map((still) => still.src);
