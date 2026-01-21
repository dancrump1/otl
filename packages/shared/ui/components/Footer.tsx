"use client";

import Link from "next/link";

import { siteNameInn, siteNameTucks } from "@shared/gql/entrytype.gql";
import { ImagesAsset } from "@shared/gql/fields.gql";
import {
	ContactGlobalSet,
	FooterGlobalSet,
	NavigationInterface,
} from "@shared/gql/globals.gql";
import { format } from "date-fns";

import Action from "./_cmsBlocks/Action";
import Gradient from "./Gradient";
import ImageComponent from "./Image";
import SidebySideLogos from "./SidebySideLogos";

export const Footer = ({
	footer,
	footernav,
	contact,
	tucksLogo,
	neinnLogo,
	site,
	tucksUrl,
	neinnUrl,
}: {
	footer: FooterGlobalSet;
	footernav: NavigationInterface;
	contact: ContactGlobalSet;
	tucksLogo?: ImagesAsset[];
	neinnLogo?: ImagesAsset[];
	site: string;
	tucksUrl: string;
	neinnUrl: string;
}) => {
	return (
		<footer className="relative overflow-hidden">
			<Gradient deg={0} className="h-full" />
			<div className="absolute block z-0 w-full h-full overflow-hidden mix-blend-multiply">
				{!!footer?.images?.length && (
					<ImageComponent
						image={footer.images[0]}
						priority
						loading="eager"
						class="h-full w-auto max-w-none ml-[-10%] md:w-full md:h-auto md:ml-0 lg:mt-[-25%]"
					/>
				)}
			</div>
			<div className="relative z-20 flex flex-col gap-10 lg:gap-[150px] cont-page py-[5%]">
				{!!tucksLogo?.length && !!neinnLogo?.length && (
					<SidebySideLogos
						img1={tucksLogo[0]}
						img2={neinnLogo[0]}
						href1={tucksUrl}
						href2={neinnUrl}
						site1={siteNameTucks}
						site2={siteNameInn}
						currentSite={site}
						className="justify-start mt-10 md:mt-0"
					></SidebySideLogos>
				)}
				<div className="flex flex-col flex-wrap md:flex-row gap-10 justify-between">
					<div className="content-end">
						{!!footer?.button?.length && (
							<Action
								button={footer.button[0]}
								className="button secondary"
							/>
						)}
					</div>
					<div>
						<nav className="mb-10">
							{footernav?.navigationNodes?.map((item, idx) => (
								<Link
									key={`mobile-link-${idx}`}
									href={item.nodeUri || ""}
									className=""
								>
									{item.title}
								</Link>
							))}
						</nav>
						{/* Contact  */}
						<div>
							<h4>Contact Us</h4>
							{!!contact?.address?.length && (
								<p className="footer-text">
									{contact?.address[0]?.addressLine1}{" "}
									{contact?.address[0]?.addressLine2}{" "}
									{contact?.address[0]?.locality},{" "}
									{contact?.address[0]?.administrativeArea}{" "}
									{contact?.address[0]?.postalCode}
								</p>
							)}
							{contact?.phone && (
								<p className="footer-text">
									<Link href={`tel:${contact.phone.formatForCountry}`}>
										{contact.phone.number}
									</Link>
								</p>
							)}
							{contact?.email && (
								<p className="footer-text">
									<Link href={`mailto:${contact.email}`}>
										{contact.email}
									</Link>
								</p>
							)}
						</div>
					</div>
					{/* Hours  */}
					<div>
						<h4>Front Desk Hours</h4>
						<p className="footer-text">
							Monday:{" "}
							{footer?.dailyHours[1]?.open &&
							footer?.dailyHours[1]?.close
								? `${format(
										footer.dailyHours[1]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[1]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Tuesday:{" "}
							{footer?.dailyHours[2]?.open &&
							footer?.dailyHours[2]?.close
								? `${format(
										footer.dailyHours[2]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[2]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Wednesday:{" "}
							{footer?.dailyHours[3]?.open &&
							footer?.dailyHours[3]?.close
								? `${format(
										footer.dailyHours[3]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[3]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Thursday:{" "}
							{footer?.dailyHours[4]?.open &&
							footer?.dailyHours[4]?.close
								? `${format(
										footer.dailyHours[4]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[4]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Friday:{" "}
							{footer?.dailyHours[5]?.open &&
							footer?.dailyHours[5]?.close
								? `${format(
										footer.dailyHours[5]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[5]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Saturday:{" "}
							{footer?.dailyHours[6]?.open &&
							footer?.dailyHours[6]?.close
								? `${format(
										footer.dailyHours[6]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[6]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						<p className="footer-text">
							Sunday:{" "}
							{footer?.dailyHours[0]?.open &&
							footer?.dailyHours[0]?.close
								? `${format(
										footer.dailyHours[0]?.open,
										"paaa"
								  )}–${format(footer.dailyHours[0]?.close, "paaa")}`
								: `CLOSED`}
						</p>
						{!!footer?.footerCopy && (
							<div className="mt-10">
								<p className="footer-text">{footer.footerCopy}</p>
							</div>
						)}
					</div>
					<div className="content-end">
						{/* Socials  */}
						{footer?.socialProfile?.map((link) => {
							return (
								<div
									className="social inline-block lg:block"
									key={link.linkUrl}
								>
									<a href={link.linkUrl || ""} target={link.target}>
										<ImageComponent image={link?.images[0]} />
									</a>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</footer>
	);
};
