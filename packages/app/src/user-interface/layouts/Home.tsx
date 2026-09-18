"use client";

import type { Episode } from "@/user-interface/components/v0/episodes-data";
import type { BoxiesEdition } from "@/user-interface/components/v0/boxies-data";

import { Navigation } from "../components/v0/navigation";
import { Hero } from "../components/v0/hero";
import { Hosts } from "../components/v0/Hosts";
import { BoxiesPodium } from "../components/v0/BoxiesPodium";
import { EpisodeGallery } from "../components/v0/EpisodeGallery";
import { Episodes } from "../components/v0/episodes";
import { Footer } from "../components/v0/footer";

function Home({
	episodes,
	boxies,
}: {
	episodes: Episode[];
	boxies: BoxiesEdition | null;
}) {
	return (
		<main className="min-h-screen bg-background dark:bg-zinc-950">
			<Navigation />
			<Hero />
			<Episodes episodes={episodes} />
			<EpisodeGallery episodes={episodes} />
			{boxies && <BoxiesPodium boxies={boxies} episodes={episodes} />}
			<section className="px-6 py-32 md:py-40">
				<div className="mx-auto max-w-3xl text-center">
					<p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
						The show
					</p>
					<h2 className="mb-4 font-[family-name:var(--font-heading)] text-3xl font-bold text-foreground md:text-4xl">
						New episodes every 2 weeks
					</h2>
					<p className="text-pretty text-muted-foreground">
						Each week, we dive into one video game that everyone&apos;s talking
						about, or no one&apos;s talking about, but whatever the case may be,
						is worth knowing about, no matter your skill level. They said every
						2 weeks, and then lied again and again... Also Kat Naps.
						They&apos;re not episodes... but they are....
					</p>
				</div>
			</section>
			<Hosts />
			<Footer />
		</main>
	);
}

export default Home;
