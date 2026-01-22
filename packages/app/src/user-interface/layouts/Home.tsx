"use client";

import React from "react";

import { HomePageTypes } from "@/gql/entrytype.gql";

import ContentBlocks from "../components/_cmsBlocks/ContentBlocks";
import ImageComponent from "../components/ImageComponent";
import { Navigation } from "../components/v0/navigation";
import { Hero } from "../components/v0/hero";
import { Episodes } from "../components/v0/episodes";
import { Footer } from "../components/v0/footer";

function Home({ data }: { data: HomePageTypes }) {
	return (
		<main className="min-h-screen bg-background dark:bg-zinc-950">

			<Navigation />
			<Hero />
			<Episodes />
			<Footer />
		</main>
	);
}

export default Home;
