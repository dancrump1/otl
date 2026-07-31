"use client";

import React from "react";

import type { Episode } from "@/user-interface/components/v0/episodes-data";
import type { BoxiesEdition } from "@/user-interface/components/v0/boxies-data";

import { Navigation } from "../components/v0/navigation";
import { Hero } from "../components/v0/hero";
import { BoxiesPodium } from "../components/v0/BoxiesPodium";
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
			{boxies && <BoxiesPodium boxies={boxies} episodes={episodes} />}
			<Episodes episodes={episodes} />
			<Footer />
		</main>
	);
}

export default Home;
