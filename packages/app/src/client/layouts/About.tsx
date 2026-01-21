"use client";

import React from "react";

import Hero from "../components/_cmsBlocks/Hero";

function About({ data }) {
	const { aboutEntries } = data;

	return (
		<main className="dark:text-white dark:bg-zinc-800">
			<Hero
				text={aboutEntries[0]?.headline?.split("\n")?.map((word) => (
					<span>
						{word} <br />
					</span>
				))}
				image={aboutEntries[0].hero?.find((asset) => !asset.embeddedAsset)}
				video={
					aboutEntries[0].hero?.find((asset) => !!asset.embeddedAsset)
						?.embeddedAsset
				}
			/>
		</main>
	);
}

export default About;
