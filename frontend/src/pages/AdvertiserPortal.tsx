import { useState } from "react";

function AdvertiserPortal() {

    const [brandName, setBrandName] =
        useState("");

    const [logoFile, setLogoFile] =
        useState<File | null>(null);

    const [bannerFile, setBannerFile] =
        useState<File | null>(null);

    const [qrCode, setQrCode] =
        useState("");

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

        </div>
    );
}

export default AdvertiserPortal;