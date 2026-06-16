import { API_URL }
    from "../config";

export async function login(
    email: string,
    password: string
) {

    const response =
        await fetch(
            `${API_URL}/users/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.error
        );
    }

    return data;
}