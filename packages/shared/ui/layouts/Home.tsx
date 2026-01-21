"use client";

import React from "react";

import { useShowSpecial } from "@shared/client-utils/useShowSpecial";
import { HomePageTypes } from "@shared/gql/entrytype.gql";
import Break from "@shared/public/pattern.svg";
import ContentBlocks from "@shared/ui/components/_cmsBlocks/ContentBlocks";
import Hero from "@shared/ui/components/_cmsBlocks/Hero";

import { CloseIcon } from "../components/CloseIcon";
import SpringModal from "../components/SpringModal";

function Home({ data }: { data: HomePageTypes }) {
	const {
		showSpecial,
		setShowSpecial,
		handleSaveData,
		showSpecialAlert,
		setShowSpecialAlert,
	} = useShowSpecial();

	return (
		<main className="text-primary bg-background-primary pb-2">
			{!!data.special?.length && showSpecialAlert && (
				<div className="fixed cursor-pointer text-secondary bg-primary top-0 w-full text-center z-50 py-1">
					<button
						aria-label="Specials banner and popup controller"
						onClick={() => {
							setShowSpecial(true);
							setShowSpecialAlert(false);
						}}
						className="w-full h-full text-center"
					>
						{data.special[0].title}
					</button>
					<button
						className="absolute top-[8px] md:top-[11px] right-6 cursor-pointer"
						aria-label="Close specials banner"
						onClick={(e) => {
							e.stopPropagation();
							setShowSpecialAlert(false);
						}}
					>
						<CloseIcon size={20} />
					</button>
				</div>
			)}
			<Hero
				image={data.hero?.find((asset) => !asset.embeddedAsset)}
				video={
					data.hero?.find((asset) => !!asset.embeddedAsset)?.embeddedAsset
				}
				quickNav={data.quickNav}
			/>
			{!!data.special?.length && (
				<SpringModal
					content={data.special[0]}
					isOpen={showSpecial}
					setIsOpen={handleSaveData}
				/>
			)}
			<section>
				<h1 className="cont-page pt-16 pb-8 md:px-10 text-balance">
					{data.headline}
				</h1>
				<div className="cont-page subhead pb-4">{data.subhead}</div>
				<Break className="my-6 mx-auto" />
			</section>
			<ContentBlocks data={data} />
		</main>
	);
}

export default Home;
