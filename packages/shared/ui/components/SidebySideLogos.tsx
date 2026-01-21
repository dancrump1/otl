"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@shared/client-utils/cn";
import { siteNameInn } from "@shared/gql/entrytype.gql";
import { ImagesAsset } from "@shared/gql/fields.gql";

export default function SidebySideLogos({
	img1,
	img2,
	href1 = "/",
	href2 = "/",
	site1,
	site2,
	currentSite,
	className,
}: {
	img1: ImagesAsset;
	img2: ImagesAsset;
	href1?: string;
	href2?: string;
	site1: string;
	site2: string;
	currentSite: string;
	className: string;
}) {
	return (
		<div className={cn(className, "flex items-center")}>
			<div
				className={
					currentSite === site1
						? "order-1 relative z-20 px-2 py-1 w-fit h-[60px] max-w-[120px] md:h-[75px] md:max-w-[150px] overflow-hidden"
						: "order-3 opacity-50 hover:opacity-100 relative z-20 px-2 py-1 w-fit h-[60px] max-w-[120px] md:h-[75px] md:max-w-[150px] overflow-hidden"
				}
			>
				<Link
					href={href1}
					referrerPolicy="no-referrer"
					target={currentSite === site1 ? "_self" : "_blank"}
				>
					<Image
						priority
						loading="eager"
						placeholder={img1.blurValue ? "blur" : "empty"}
						blurDataURL={img1.blurValue}
						src={img1?.url}
						alt={img1?.alt || img1?.title || "logo"}
						width={img1?.width}
						height={img1?.height}
						className={
							currentSite === siteNameInn
								? "object-right object-contain max-h-none h-full w-full" //need this because NEI logo is not as wide as Tucks logo
								: "object-left object-contain max-h-none h-full w-full"
						}
					/>
				</Link>
			</div>
			<hr className="h-10 border-l-2 border-white opacity-30 order-2" />
			<div
				className={
					currentSite === site2
						? "order-1 relative z-20 px-2 py-1 w-fit h-[60px] max-w-[120px] md:h-[75px] md:max-w-[150px] overflow-hidden"
						: "order-3 opacity-50 hover:opacity-100 relative z-20 px-2 py-1 w-fit h-[60px] max-w-[120px] md:h-[75px] md:max-w-[150px] overflow-hidden"
				}
			>
				<Link
					href={href2}
					referrerPolicy="no-referrer"
					target={currentSite === site2 ? "_self" : "_blank"}
				>
					<Image
						priority
						loading="eager"
						placeholder={img2.blurValue ? "blur" : "empty"}
						blurDataURL={img2.blurValue}
						src={img2?.url}
						alt={img2?.alt || img2?.title || "logo"}
						width={img2?.width}
						height={img2?.height}
						className={
							currentSite === siteNameInn
								? "object-right object-contain max-w-none max-h-none h-full w-full" //need this because NEI logo is not as wide as Tucks logo
								: "object-left object-contain max-w-none max-h-none h-full w-full"
						}
					/>
				</Link>
			</div>
		</div>
	);
}
