import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Advertisement } from "../types/Advertisement.ts";

import { API_URL }
    from "../config";

type AdvertisementStats = {

    advertisementId: number;

    launchCount: number;

    totalCoupons: number;

    usedCoupons: number;

    unusedCoupons: number;

    conversionRate: number;
};

export default function AdvertiserPage() {

    const navigate =
        useNavigate();

    const [advertisements,
        setAdvertisements] =
        useState<Advertisement[]>([]);

    const [stats,
        setStats] =
        useState<
            Record<number,
                AdvertisementStats>
        >({});

    const [brandName, setBrandName] =
        useState("");

    const [logoFile, setLogoFile] =
        useState<File | null>(null);

    const [bannerFile, setBannerFile] =
        useState<File | null>(null);

    const loadStats =
        async (
            advertisementId: number
        ) => {

            try {

                const response =
                    await fetch(
                        `${API_URL}/advertisements/${advertisementId}/stats`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                setStats(
                    previous => ({
                        ...previous,

                        [advertisementId]:
                        data
                    })
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const token =
        localStorage.getItem(
            "token"
        );

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
                `${API_URL}/upload`,
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
                !brandName ||
                !logoFile ||
                !bannerFile
            ) {

                alert(
                    "Uzupełnij wszystkie pola"
                );

                return;
            }

            try {

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
                        `${API_URL}/advertisements`,
                        {
                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${token}`
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

                if (!response.ok) {

                    throw new Error(
                        "Create failed"
                    );
                }

                setBrandName("");

                setLogoFile(null);

                setBannerFile(null);

                loadAdvertisements();

            } catch (error) {

                console.error(
                    error
                );
            }
        };


    const downloadQr =
        (
            qrCode: string,
            brandName: string
        ) => {

            const link =
                document.createElement(
                    "a"
                );

            link.href =
                qrCode;

            link.download =
                `${brandName}-qr.png`;

            link.click();
        };

    const loadAdvertisements =
        async () => {

            try {

                const response =
                    await fetch(
                        `${API_URL}/advertisements/my`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const data =
                    await response.json();

                const advertisementsWithQr =
                    await Promise.all(

                        data.map(
                            async (
                                advertisement: Advertisement
                            ) => {

                                try {

                                    const qrResponse =
                                        await fetch(
                                            `${API_URL}/advertisements/${advertisement.id}/qr`
                                        );

                                    const qrData =
                                        await qrResponse.json();

                                    return {

                                        ...advertisement,

                                        qrCode:
                                        qrData.qrCode
                                    };

                                } catch {

                                    return advertisement;
                                }
                            }
                        )
                    );

                setAdvertisements(
                    advertisementsWithQr
                );

                for (
                    const advertisement
                    of advertisementsWithQr
                    ) {

                    loadStats(
                        advertisement.id
                    );
                }

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    useEffect(() => {

        loadAdvertisements();

    }, []);

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        navigate(
            "/"
        );
    };

    const deleteAdvertisement =
        async (
            id: number
        ) => {

            try {

                await fetch(
                    `${API_URL}/advertisements/${id}`,
                    {
                        method:
                            "DELETE",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

                loadAdvertisements();

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Advertiser Dashboard
            </h1>

            <button
                onClick={logout}
            >
                Logout
            </button>

            <hr />

            <h2>
                Create Advertisement
            </h2>

            <div>

                <input
                    type="text"
                    placeholder="Brand Name"
                    value={brandName}
                    onChange={(e) =>
                        setBrandName(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <div>

                <label>
                    Logo:
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

            <br />

            <div>

                <label>
                    Banner:
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

            <br />

            <button
                onClick={
                    createAdvertisement
                }
            >
                Create Advertisement
            </button>

            <hr />

            <hr />

            <h2>
                Moje reklamy
            </h2>

            {
                advertisements.length === 0 &&
                (
                    <p>
                        Brak reklam.
                    </p>
                )
            }

            {
                advertisements.map(
                    advertisement => (

                        <div
                            key={
                                advertisement.id
                            }
                            style={{
                                border:
                                    "1px solid white",

                                padding:
                                    "20px",

                                marginBottom:
                                    "20px"
                            }}
                        >

                            <h3>
                                {
                                    advertisement.brandName
                                }
                            </h3>

                            <p>
                                ID:
                                {" "}
                                {
                                    advertisement.id
                                }
                            </p>

                            <img
                                src={
                                    API_URL +
                                    advertisement.logoPath
                                }
                                alt="Logo"
                                width="120"
                            />

                            <br />
                            <br />

                            <img
                                src={
                                    API_URL +
                                    advertisement.bannerPath
                                }
                                alt="Banner"
                                width="300"
                            />

                            <p>

                                QR:

                                {" "}

                                {
                                    advertisement.qrCodeUrl
                                }

                            </p>
                            {
                                advertisement.qrCode && (

                                    <img
                                        src={
                                            advertisement.qrCode
                                        }
                                        alt="QR Code"
                                        style={{
                                            width: "200px"
                                        }}
                                    />
                                )
                            }

                            <hr />

                            <h4>
                                Statistics
                            </h4>

                            <p>
                                Launches:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.launchCount ?? 0
                                }
                            </p>

                            <p>
                                Generated coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.totalCoupons ?? 0
                                }
                            </p>

                            <p>
                                Used coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.usedCoupons ?? 0
                                }
                            </p>

                            <p>
                                Unused coupons:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.unusedCoupons ?? 0
                                }
                            </p>

                            <p>
                                Conversion:
                                {" "}
                                {
                                    stats[
                                        advertisement.id
                                        ]?.conversionRate ?? 0
                                }
                                %
                            </p>

                            <button
                                onClick={() =>
                                    navigator
                                        .clipboard
                                        .writeText(
                                            advertisement.qrCodeUrl ??
                                            ""
                                        )
                                }
                            >
                                Copy QR Link
                            </button>
                            <button
                                onClick={() =>
                                    downloadQr(
                                        advertisement.qrCode!,
                                        advertisement.brandName
                                    )
                                }
                            >
                                Download QR
                            </button>

                            {" "}

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