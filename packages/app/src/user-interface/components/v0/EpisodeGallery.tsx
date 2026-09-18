"use client";

import type { Episode } from "./episodes-data";
import {
	HorizontalScrollCarousel,
	type GalleryCard,
} from "@/user-interface/components/effects/horizontal-scroll-gallery";
import { GAME_STILLS } from "./media";

function buildGalleryCards(episodes: Episode[]): GalleryCard[] {
	const fromEpisodes = episodes.slice(0, 8).map((episode, index) => ({
		id: episode.id,
		title: episode.title,
		url: episode.imageUrl || GAME_STILLS[index % GAME_STILLS.length].src,
		href: episode.spotifyUrl,
	}));

	if (fromEpisodes.length >= 4) {
		return fromEpisodes;
	}

	return GAME_STILLS.map((still, index) => ({
		id: `still-${index}`,
		title: still.caption,
		url: still.src,
	}));
}

export function EpisodeGallery({ episodes }: { episodes: Episode[] }) {
	const cards = buildGalleryCards(episodes);

	return (
		<section className="bg-background">
            <div className="mx-auto max-w-6xl px-6 pb-8 pt-24 text-center md:pt-32">
				<p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
					A little extra
				</p>
				<h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
					Scroll the backlog
				</h2>
			</div>
			<HorizontalScrollCarousel cards={cards} />
		</section>
	);
}
