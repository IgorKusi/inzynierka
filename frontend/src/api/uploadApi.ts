const API_URL = "http://localhost:3000";

export async function uploadImage(
    file: File
): Promise<string>
{
    const formData =
        new FormData();

    formData.append(
        "image",
        file
    );

    const response =
        await fetch(
            `${API_URL}/upload`,
            {
                method: "POST",
                body: formData
            }
        );

    if (!response.ok)
    {
        throw new Error(
            "Upload failed"
        );
    }

    const data =
        await response.json();

    return data.filePath;
}