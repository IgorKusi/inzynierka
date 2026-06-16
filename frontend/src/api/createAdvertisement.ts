import { API_URL }
    from "../config";

export async function createAdvertisement(
    brandName: string,
    logoPath: string,
    bannerPath: string
)
{
    const response =
        await fetch(
            `${API_URL}/advertisements`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    brandName,
                    logoPath,
                    bannerPath
                })
            }
        );

    if (!response.ok)
    {
        throw new Error(
            "Failed to create advertisement"
        );
    }

    return await response.json();
}