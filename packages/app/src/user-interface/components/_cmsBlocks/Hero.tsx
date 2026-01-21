import { ImagesAsset } from "@/gql/fields.gql";

import ImageComponent from "../ImageComponent";

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
	text,
	image,
	video,
}: {
	text: string;
	image?: ImagesAsset;
	video?: any;
}) => {
	const videoId = video ? extractString(video.iframeSrc) : null;
	return (
		<section className="hero h-[40vh] landscape:h-[75vh] bg-gray-200">
			<div className="relative overflow-hidden h-full">
				<div className="video-docker h-full w-full">
					{image?.url && (
						<ImageComponent
							image={image}
							key={image.uid}
							className="h-full w-full object-cover"
							src={image.url}
							title={image.alt}
							alt={image.alt}
							width={image.width || 1920}
							height={image.height || 1080}
							priority
							loading="eager"
							style={
								image.focalPoint
									? {
											objectPosition: `${
												image.focalPoint[0] * 100
											}% ${image.focalPoint[1] * 100}%`,
									  }
									: {}
							}
						/>
					)}
					{!!video?.iframeSrc && (
						<div id="video" className="hidden lg:block">
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
				<div className="video-content space-y-2 z-10 max-w-[350px] md:max-w-[575px] lg:max-w-[750px] xl:max-w-[950px] absolute left-4 bottom-4">
					<h1 className="mr-20 text-balance">{text}</h1>
				</div>
			</div>
		</section>
	);
};

export default Hero;
