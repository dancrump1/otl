"use client";

import React from "react";

import { HomePageTypes } from "@/gql/entrytype.gql";

function Home({ data }: { data: HomePageTypes }) {
	return (
		<main className="dark:text-white dark:bg-zinc-800">
			<div>Home coming soon</div>
		</main>
	);
}

export default Home;
