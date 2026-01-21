"use client";

import React, { useState } from "react";

import Link from "next/link";

import {
	ContentPagesEntry,
	HomePageTypes,
	siteNameInn,
	siteNameTucks,
} from "@shared/gql/entrytype.gql";
import { Button, ImagesAsset } from "@shared/gql/fields.gql";
import {
	ContactGlobalSet,
	FooterGlobalSet,
	NavigationInterface,
} from "@shared/gql/globals.gql";
import HeadContent from "@shared/ui/components/HeadContent";
import SidebySideLogos from "@shared/ui/components/SidebySideLogos";

import Action from "../components/_cmsBlocks/Action";
import { Footer } from "../components/Footer";
import {
	Navbar,
	NavBody,
	NavMenu,
	NavToggle,
} from "../components/ResizeNavbar";

export default function Layout({
	children,
	pageProps,
	site,
}: {
	children: React.ReactNode;
	pageProps: {
		data?: { entry: HomePageTypes | ContentPagesEntry };
		navigation?: NavigationInterface;
		footernav?: NavigationInterface;
		tucksLogo?: ImagesAsset[];
		neinnLogo?: ImagesAsset[];
		tucksURL: string;
		neiURL: string;
		buyButton?: Button[];
		contact?: ContactGlobalSet;
		footer?: FooterGlobalSet;
		page?: string;
	};
	site: string;
}) {
	let seo;

	if (pageProps?.data?.entry?.seo) {
		seo = pageProps.data.entry.seo;
	}

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return (
		<>
			{!!pageProps.data?.entry && (
				<HeadContent
					{...seo}
					title={seo?.title ?? ""}
					page={pageProps.data.entry}
					site={site}
				/>
			)}
			<Navbar
				className={isMobileMenuOpen ? "bg-background-secondary" : undefined}
			>
				<NavBody>
					<div className="max-w-7xl flex items-center w-full justify-between mx-auto">
						<div
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="flex cursor-pointer text-white gap-1 order-2 md:order-1"
						>
							<NavToggle
								isOpen={isMobileMenuOpen}
								onClick={() => null}
							/>
							<span className="hidden md:inline text-inherit leading-tight">
								Menu
							</span>
						</div>
						{!!pageProps.tucksLogo?.length &&
							!!pageProps.neinnLogo?.length && (
								<SidebySideLogos
									img1={pageProps.tucksLogo[0]}
									img2={pageProps.neinnLogo[0]}
									href1={pageProps.tucksURL}
									href2={pageProps.neiURL}
									site1={siteNameTucks}
									site2={siteNameInn}
									currentSite={site}
									className="justify-start md:justify-center order-1 md:order-2"
								></SidebySideLogos>
							)}

						<div className="hidden md:block md:order-3">
							{!!pageProps.buyButton?.length && (
								<Action
									className="button secondary"
									button={pageProps.buyButton?.[0]}
								/>
							)}
						</div>
					</div>
					<NavMenu
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
					>
						{pageProps.navigation?.navigationNodes?.map((item, idx) => (
							<Action
								button={item}
								key={`mobile-link-${idx}`}
								onClick={() => setIsMobileMenuOpen(false)}
								className="relative border-t-[1px] border-tertiary w-full lg:text-center py-6 md:py-8 text-4xl text-secondary font-secondary hover:text-tertiary hover:italic no-underline"
							>
								{item.title}
							</Action>
						))}
						{!!pageProps.buyButton?.length && (
							<div className="md:hidden">
								<Action
									className="button secondary w-full"
									button={pageProps.buyButton?.[0]}
									onClick={() => setIsMobileMenuOpen(false)}
								/>
							</div>
						)}
					</NavMenu>
				</NavBody>
			</Navbar>
			{children}
			{pageProps.footer && pageProps.footernav && pageProps.contact && (
				<Footer
					footer={pageProps.footer}
					footernav={pageProps.footernav}
					contact={pageProps.contact}
					tucksLogo={pageProps.tucksLogo}
					neinnLogo={pageProps.neinnLogo}
					site={site}
					tucksUrl={pageProps.tucksURL}
					neinnUrl={pageProps.neiURL}
				/>
			)}
		</>
	);
}
