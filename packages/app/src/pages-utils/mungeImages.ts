import { ImagesAsset } from "@/gql/fields.gql";
import { getPlaiceholder } from "plaiceholder";

// TODO STARTUP: If we want to have color-map placeholders for loading images, replace experiencesEntries (from hosted-in-telluride)

// https://plaiceholder.co/docs/usage#base64 REMOTE IMAGE OPTION
const mungeImages = async (data: any) => {
    let mungedData;

    try {
        mungedData = {
            ...data,
            experiencesEntries: await Promise.all(
                data.experiencesEntries.map(async (entry: {
                    images: ImagesAsset[]
                }) => {
                    try {
                        const buffer = await fetch(entry.images[0].url).then(
                            async (res) => Buffer.from(await res.arrayBuffer())
                        );

                        const { base64 } = await getPlaiceholder(buffer);

                        return {
                            ...entry,
                            blurValue: base64,
                        };
                    } catch (err) {
                        console.warn(
                            `Failed to generate blur for ${entry.images[0]?.url}:`,
                            err
                        );
                        return {
                            ...entry,
                            blurValue: false,
                        };
                    }
                })
            ),
        };
    } catch {
        mungedData;
    }

    return mungedData;
};

export default mungeImages