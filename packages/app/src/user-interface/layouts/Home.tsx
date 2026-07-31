"use client";

import React from "react";

import type { Episode } from "@/user-interface/components/v0/episodes-data";

import { Navigation } from "../components/v0/navigation";
import { Hero } from "../components/v0/hero";
import { Episodes } from "../components/v0/episodes";
import { Footer } from "../components/v0/footer";

function Home({
	episodes,
}: {
	episodes: Episode[];
}) {
	return (
		<main className="min-h-screen bg-background dark:bg-zinc-950">

			<Navigation />
			<Hero />
			<Episodes episodes={episodes} />
			<Footer />
		</main>
	);
}

export default Home;
