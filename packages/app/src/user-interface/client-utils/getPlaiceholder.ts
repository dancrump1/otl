import { getPlaiceholder } from "plaiceholder";

export const updateImage = async (image) => {
	// If image is a video embed, skip creating bitmap
	if (!!image?.embeddedAsset?.title) { return image }

	try {
		const buffer = await fetch(image.url).then(async (res) =>
			Buffer.from(await res.arrayBuffer())
		);

		const { base64 } = await getPlaiceholder(buffer);

		return {
			...image,
			blurValue: base64,
		};
	} catch (err) {
		console.warn(`Failed to generate blur for ${image?.url}:`, err);
		return {
			blurValue: false,
		};
	}
};

export async function updateAllImages(
	dto: any,
	updateImage: (imageObj: any) => any
): Promise<any> {
	if (Array.isArray(dto)) {
		return await dto.map(
			async (item) => await updateAllImages(item, await updateImage)
		);
	} else if (typeof dto === "object" && dto !== null) {
		const newObj: any = {};

		for (const key in dto) {
			const value = dto[key];

			// Case 1: Detect array of image objects (CraftCMS-style)
			if (Array.isArray(value) && value.every(isCraftImageObject)) {
				newObj[key] = await value.map(
					async (image) => await updateImage(image)
				); // mung each image
			}

			// Case 2: Single image object
			else if (isCraftImageObject(value)) {
				newObj[key] = await updateImage(value); // mung single image
			}

			// Case 3: Recurse deeper into nested objects
			else {
				newObj[key] = await updateAllImages(value, await updateImage);
			}
		}

		return await newObj;
	} else {
		return await dto;
	}
}

function isCraftImageObject(obj: any): boolean {
	if (typeof obj !== "object" || obj === null) return false;

	const requiredKeys = ["url", "uid", "mimeType"];
	return requiredKeys.every((key) => key in obj);
}

export async function resolveAllPromisesDeep(obj: any): Promise<any> {
	if (obj instanceof Promise) {
		return resolveAllPromisesDeep(await obj); // resolve top-level promises
	}

	if (Array.isArray(obj)) {
		return Promise.all(obj.map(resolveAllPromisesDeep));
	}

	if (obj && typeof obj === "object") {
		const entries = await Promise.all(
			Object.entries(obj).map(async ([key, value]) => {
				const resolvedValue = await resolveAllPromisesDeep(value);
				return [key, resolvedValue];
			})
		);
		return Object.fromEntries(entries);
	}

	// Primitives
	return obj;
}
