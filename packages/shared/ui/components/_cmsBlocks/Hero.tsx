import Link from "next/link";

import { cn } from "@shared/client-utils/cn";
import { QuickNav } from "@shared/gql/entrytype.gql";
import { EmbeddedAssetInterface, ImagesAsset } from "@shared/gql/fields.gql";
import Texture from "@shared/public/hero-pattern.svg";

import Gradient from "../Gradient";
import ImageComponent from "../Image";
import Action from "./Action";

function extractString(str: string) {
	// Find the last occurrence of '/'
	const lastSlashIndex = str.lastIndexOf("/");

	// Find the first occurrence of '?' after the last '/'
	const questionMarkIndex = str.indexOf("?", lastSlashIndex);

	// Extract the part after the last '/' and before the first '?'
	if (questionMarkIndex !== -1) {
		return str.substring(lastSlashIndex + 1, questionMarkIndex);
	} else {
		// If there's no '?' in the string, return the part after the last '/'
		return str.substring(lastSlashIndex + 1);
	}
}

const Hero = ({
	image,
	video,
	quickNav,
	text,
	className,
}: {
	image?: ImagesAsset;
	video?: EmbeddedAssetInterface;
	quickNav?: QuickNav[];
	text?: string;
	className?: string;
}) => {
	const videoId = video ? extractString(video.iframeSrc) : null;
	return (
		<section className={cn("h-[80vh] relative", className)}>
			<div className="relative overflow-hidden h-full">
				<div className="video-docker h-full w-full">
					<Gradient deg={180} />
					{/* Additional gradient for interior pages  */}
					{text && <Gradient deg={0} className="h-[25%]" />}
					{image?.url && (
						<ImageComponent
							image={image}
							priority
							loading="eager"
							className="mix-blend-multiply"
						/>
					)}
					{/* TODO: video size and margin may need to be adjusted depending on the video aspect ratio  */}
					{!!video?.iframeSrc && (
						<div
							id="video"
							className="h-[100%] xl:h-[130%] w-[300%] sm:w-[200%] lg:w-[150%] xl:w-[100%] -ml-[50%] lg:-ml-[25%] xl:ml-0 xl:-mt-[5%]"
						>
							<iframe
								src={
									video.iframeSrc +
									`playlist=${videoId}&loop=1&playsinline=1&autoplay=1&mute=1&controls=0&enablejsapi=0&iv_load_policy=3`
								}
								width={1920}
								height={1080}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								allowFullScreen
								className="pointer-events-none w-full h-full object-cover"
							/>
						</div>
					)}
				</div>
				<div className="hidden cont-page z-20 md:flex absolute inset-0 items-center justify-evenly">
					{quickNav?.map((nav) => {
						return (
							<Action
								className="flex items-center group flex-col font-secondary text-secondary text-center hover:italic gap-3 text-4xl lg:text-5xl no-underline px-4"
								button={nav.quickItem}
							>
								{nav.title} <br />
								<Texture className="group-hover:fill-tertiary" />
							</Action>
						);
					})}
				</div>
				{text && (
					<h1 className="absolute bottom-8 md:bottom-10 left-4 md:left-16 m-0 font-secondary text-secondary text-left z-20">
						{text}
					</h1>
				)}
			</div>
		</section>
	);
};

export default Hero;
