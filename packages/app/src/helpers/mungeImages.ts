import { getPlaiceholder } from "plaiceholder";

// https://plaiceholder.co/docs/usage#base64 REMOTE IMAGE OPTION
const mungeImages = async (data) => {
    let mungedData;

    try {
        mungedData = {
            ...data,
            experiencesEntries: await Promise.all(
                data.experiencesEntries.map(async (entry) => {
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