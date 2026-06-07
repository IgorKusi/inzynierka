import { useEffect, useState } from "react";
import type { Advertisement } from "../types/Advertisement";
const SERVER_URL =
    "http://localhost:3000";

function AdvertiserPortal() {

    const [brandName, setBrandName] =
        useState("");

    const [logoFile, setLogoFile] =
        useState<File | null>(null);

    const [bannerFile, setBannerFile] =
        useState<File | null>(null);

    const [qrCode, setQrCode] =
        useState("");

    const [advertisements, setAdvertisements] =
        useState<Advertisement[]>([]);

    const uploadImage = async (
        file: File
    ) => {

        const formData =
            new FormData();

        formData.append(
            "image",
            file
        );

        const response =
            await fetch(
                "http://localhost:3000/upload",
                {
                    method: "POST",
                    body: formData
                }
            );

        return response.json();
    };

    const loadAdvertisements =
        async () => {

            const response =
                await fetch(
                    "http://localhost:3000/advertisements"
                );

            const data =
                await response.json();

            setAdvertisements(data);
        };

    const createAdvertisement =
        async () => {

            if (
                !logoFile ||
                !bannerFile
            ) {
                return;
            }

            const logo =
                await uploadImage(
                    logoFile
                );

            const banner =
                await uploadImage(
                    bannerFile
                );

            const response =
                await fetch(
                    "http://localhost:3000/advertisements",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            brandName,
                            logoPath:
                            logo.filePath,
                            bannerPath:
                            banner.filePath
                        })
                    }
                );

            const data =
                await response.json();

            setQrCode(
                data.qrCode
            );
            loadAdvertisements();
        };
    useEffect(() => {

        loadAdvertisements();

    }, []);
    const deleteAdvertisement =
        async (id: number) => {

            await fetch(
                `http://localhost:3000/advertisements/${id}`,
                {
                    method: "DELETE"
                }
            );

            loadAdvertisements();
        };

    return (

        <div>

            <h1>
                AdGame Admin
            </h1>

            <div>

                <label>
                    Brand name
                </label>

                <input
                    value={brandName}
                    onChange={(e) =>
                        setBrandName(
                            e.target.value
                        )
                    }
                />

            </div>

            <div>

                <label>
                    Logo
                </label>

                <input
                    type="file"
                    onChange={(e) =>
                        setLogoFile(
                            e.target.files?.[0]
                            ?? null
                        )
                    }
                />

            </div>

            <div>

                <label>
                    Banner
                </label>

                <input
                    type="file"
                    onChange={(e) =>
                        setBannerFile(
                            e.target.files?.[0]
                            ?? null
                        )
                    }
                />

            </div>

            <button
                onClick={
                    createAdvertisement
                }
            >
                Create Advertisement
            </button>

            {
                qrCode &&
                (
                    <>
                        <h2>
                            QR Code
                        </h2>

                        <img
                            src={qrCode}
                            alt="QR"
                        />
                    </>
                )
            }

            <hr />

            <h2>Advertisements</h2>

            {
                advertisements.map(
                    advertisement => (

                        <div
                            key={advertisement.id}
                            style={{
                                border: "1px solid white",
                                margin: "10px",
                                padding: "20px"
                            }}
                        >
                            <h3>
                                {advertisement.brandName}
                            </h3>

                            <p>
                                ID:
                                {" "}
                                {advertisement.id}
                            </p>

                            <div>

                                <p>
                                    Logo
                                </p>

                                <img
                                    src={
                                        SERVER_URL +
                                        advertisement.logoPath
                                    }
                                    alt="Logo"
                                    style={{
                                        width: "150px"
                                    }}
                                />

                            </div>

                            <div>

                                <p>
                                    Banner
                                </p>

                                <img
                                    src={
                                        SERVER_URL +
                                        advertisement.bannerPath
                                    }
                                    alt="Banner"
                                    style={{
                                        width: "300px"
                                    }}
                                />

                            </div>

                            <p>
                                QR:
                                {" "}
                                {advertisement.qrCodeUrl}
                            </p>

                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        advertisement.qrCodeUrl ??
                                        ""
                                    )
                                }
                            >
                                Copy QR Link
                            </button>
                            <button
                                onClick={() =>
                                    deleteAdvertisement(
                                        advertisement.id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>
                    )
                )
            }
        </div>
    );
}

export default AdvertiserPortal;