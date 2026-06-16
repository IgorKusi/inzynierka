import { API_URL }
    from "../config";

export async function getAdvertisement(
    id: number
) {
    const response =
        await fetch(
            `${API_URL}/advertisements/game/${id}`
        );

    if (!response.ok) {
        throw new Error(
            "Failed to load advertisement"
        );
    }

    return await response.json();
}